(function () {
  const data = window.smartAgricultureData;
  if (!data) return;
  const pageShell = document.querySelector(".page-shell");
  if (!pageShell) return;
  const CONTRACTS_ACCESS_KEY = "smart-agriculture-contracts-access";
  const CONTRACTS_SECRET_KEY = "smart-agriculture-contracts-secret";
  const CONTRACTS_PASSWORD_HASH = "6f59bfab51ea742dd62688df9c7daf9565cd8bb32eaa98eca786322fb74afb82";
  const PROTECTED_DOC_PREFIX = "assets/docs/pdf/";
  const PROTECTED_DOC_OUTPUT_PREFIX = "assets/docs/protected/";
  let contractsPasswordMemory = "";
  const decryptedFileCache = new Map();
  const fileHrefMap = {
    "MAT-LIST-202604-已采购设备清单-v1.0.docx": ["assets/docs/pdf/智慧农业项目已采购清单.pdf"],
    "MAT-LIST-202604-采购清单含待采购-v1.0.docx": ["assets/docs/pdf/智慧农业项目采购清单（已采购+待采购）.pdf"],
    "MAT-PLAN-202604-智慧农业整体解决方案-v1.0.pptx": ["assets/docs/pdf/智慧农业整体解决方案.pdf"],
    "MAT-TECH-202604-传感设备供应商与技术路线讨论-v1.0.docx": ["assets/docs/pdf/智慧农业传感设备供应商与技术路线讨论稿.pdf"],
    "MAT-SURVEY-202604-农田实地考察汇报-v1.0.docx": ["assets/docs/pdf/农田实地考察汇报.pdf"],
    "智慧农业项目已采购清单.pdf": ["assets/docs/pdf/智慧农业项目已采购清单.pdf"],
    "智慧农业项目采购清单（已采购+待采购）.pdf": ["assets/docs/pdf/智慧农业项目采购清单（已采购+待采购）.pdf"],
    "智慧农业整体解决方案.pdf": ["assets/docs/pdf/智慧农业整体解决方案.pdf"],
    "智慧农业传感设备供应商与技术路线讨论稿.pdf": ["assets/docs/pdf/智慧农业传感设备供应商与技术路线讨论稿.pdf"],
    "农田实地考察汇报.pdf": ["assets/docs/pdf/农田实地考察汇报.pdf"],
    "MAT-CONTRACT-20260326-湖北大学杀虫灯采购-v1.0.pdf": ["assets/docs/pdf/260323湖北大学（杀虫灯）(1).pdf"],
    "MAT-CONTRACT-20260310-山东仁科杀虫灯补采-v1.0.pdf": ["assets/docs/pdf/山东仁科杀虫灯采购合同20260310.pdf"],
    "MAT-CONTRACT-202603-监控系统采购安装-v1.0.pdf": ["assets/docs/pdf/监控合同.pdf"],
    "MAT-CONTRACT-20260227-智能闸门系统-v1.0.pdf": ["assets/docs/pdf/闸门合同.pdf"],
    "MAT-TECH-20260412-传感器供应商对接指南-v1.0.pdf": ["assets/docs/pdf/2026-04-12-传感器供应商对接指南.pdf"]
  };

  function setHtml(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  async function sha256Hex(text) {
    const buffer = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  async function deriveContractsKey(password, salt) {
    const baseKey = await window.crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    return window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 200000,
        hash: "SHA-256"
      },
      baseKey,
      {
        name: "AES-GCM",
        length: 256
      },
      false,
      ["decrypt"]
    );
  }

  function rememberContractsPassword(password) {
    contractsPasswordMemory = password;
    window.sessionStorage.setItem(CONTRACTS_ACCESS_KEY, "granted");
    window.sessionStorage.setItem(CONTRACTS_SECRET_KEY, password);
  }

  function readContractsPassword() {
    if (contractsPasswordMemory) {
      return contractsPasswordMemory;
    }
    const stored = window.sessionStorage.getItem(CONTRACTS_SECRET_KEY) || "";
    contractsPasswordMemory = stored;
    return contractsPasswordMemory;
  }

  async function verifyContractsPassword(password) {
    const digest = await sha256Hex(password);
    return digest === CONTRACTS_PASSWORD_HASH;
  }

  function unlockContractsPage() {
    if (!pageShell.classList.contains("agri-contract-page")) {
      return;
    }
    pageShell.classList.remove("is-locked");
    pageShell.classList.add("is-unlocked");
  }

  function initializeContractsGate() {
    if (!pageShell.classList.contains("agri-contract-page")) {
      return true;
    }

    if (window.sessionStorage.getItem(CONTRACTS_ACCESS_KEY) === "granted" && readContractsPassword()) {
      unlockContractsPage();
      return true;
    }

    const form = document.getElementById("contracts-gate-form");
    const input = document.getElementById("contracts-password");
    const feedback = document.getElementById("contracts-gate-feedback");
    if (!form || !input || !feedback) {
      return false;
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) {
        feedback.textContent = "请输入访问密码。";
        return;
      }

      feedback.textContent = "正在验证密码...";
      form.querySelector('button[type="submit"]')?.setAttribute("disabled", "disabled");

      try {
        if (await verifyContractsPassword(value)) {
          feedback.textContent = "";
          rememberContractsPassword(value);
          unlockContractsPage();
          renderContractsPage();
          input.value = "";
          return;
        }
        feedback.textContent = "密码错误，请重新输入。";
      } catch (error) {
        feedback.textContent = "验证失败，请刷新页面后重试。";
      } finally {
        form.querySelector('button[type="submit"]')?.removeAttribute("disabled");
      }
    });

    input.focus();
    return false;
  }

  function transformProtectedDocPath(path) {
    const normalized = String(path || "").trim();
    if (!normalized.startsWith(PROTECTED_DOC_PREFIX)) {
      return normalized;
    }
    return normalized.replace(PROTECTED_DOC_PREFIX, PROTECTED_DOC_OUTPUT_PREFIX) + ".enc";
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderPills(items) {
    return items.map((item) => `<span class="project-meta-pill">${escapeHtml(item)}</span>`).join("");
  }

  function renderList(items) {
    return items
      .map((item) => `<li>${looksLikeFileName(item) ? renderFileAnchor(item) : escapeHtml(item)}</li>`)
      .join("");
  }

  function renderKpis(items) {
    return items
      .map(
        (item) => `
          <article class="kpi-card">
            <span class="metric-label">${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.value)}</strong>
            <p>${escapeHtml(item.note)}</p>
          </article>
        `
      )
      .join("");
  }

  function renderSummaryCard(summary) {
    return `
      <div class="project-summary-head">
        <span class="project-summary-label">${escapeHtml(summary.label)}</span>
        <strong>${escapeHtml(summary.title)}</strong>
      </div>
      <div class="project-summary-list">
        ${summary.items
          .map(
            (item) => `
              <div>
                <span>${escapeHtml(item.label)}</span>
                <strong>${escapeHtml(item.value)}</strong>
              </div>
            `
          )
          .join("")}
      </div>
      <p>${escapeHtml(summary.note)}</p>
    `;
  }

  function renderSimpleCards(items, cardClass) {
    return items
      .map(
        (item) => `
          <article class="${cardClass}">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.text)}</p>
          </article>
        `
      )
      .join("");
  }

  function renderStatusStacks(items) {
    return items
      .map(
        (item) => `
          <article class="stack-card">
            <h3>${escapeHtml(item.title)}</h3>
            <p class="agri-amount">${escapeHtml(item.amount)}</p>
            <ul class="agri-list">${renderList(item.items)}</ul>
          </article>
        `
      )
      .join("");
  }

  function renderRouteCards(items) {
    return items
      .map(
        (item) => `
          <article class="content-card agri-route-card${item.recommended ? " is-recommended" : ""}">
            <h3>${escapeHtml(item.title)}</h3>
            <p class="route-title">${escapeHtml(item.route)}</p>
            <p>${escapeHtml(item.text)}</p>
          </article>
        `
      )
      .join("");
  }

  function renderPhaseCards(items) {
    return items
      .map(
        (item) => `
          <article class="stack-card">
            <h3>${escapeHtml(item.title)}</h3>
            ${item.items ? `<ul class="agri-list">${renderList(item.items)}</ul>` : `<p>${escapeHtml(item.text)}</p>`}
          </article>
        `
      )
      .join("");
  }

  function renderAppendixLinks(items) {
    return items
      .map(
        (item) => `
          <article class="content-card">
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.text)}</p>
            <div class="hero-actions">
              <a class="button secondary" href="${escapeHtml(item.href)}">进入</a>
            </div>
          </article>
        `
      )
      .join("");
  }

  function renderActionButtons(items) {
    return items
      .map(
        (item) => `
          <a class="button ${item.primary ? "primary" : "secondary"}" href="${escapeHtml(item.href)}">
            ${escapeHtml(item.label)}
          </a>
        `
      )
      .join("");
  }

  function renderDashboardKpis(items) {
    return items
      .map(
        (item) => `
          <article class="dashboard-kpi-card">
            <span class="metric-label">${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.value)}</strong>
            <p>${escapeHtml(item.note)}</p>
          </article>
        `
      )
      .join("");
  }

  function renderProgressSection(items, notes) {
    return `
      <article class="progress-card">
        <h3>分系统进展</h3>
        <div class="progress-list">
          ${items
            .map(
              (item) => `
                <div class="progress-item">
                  <div class="progress-head">
                    <strong>${escapeHtml(item.title)}</strong>
                    <span>${escapeHtml(item.status)}</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-bar${item.pending ? " is-pending" : ""}" style="width: ${item.width}%;"></div>
                  </div>
                </div>
              `
            )
            .join("")}
        </div>
      </article>
      <article class="progress-card">
        <h3>当前口径</h3>
        <ul class="agri-list">${renderList(notes)}</ul>
      </article>
    `;
  }

  function renderTimeline(items) {
    return `
      <article class="timeline-card">
        ${items
          .map(
            (item) => `
              <div class="dashboard-step">
                <time>${escapeHtml(item.time)}</time>
                <div>
                  <h3>${escapeHtml(item.title)}</h3>
                  <p>${escapeHtml(item.text)}</p>
                </div>
              </div>
            `
          )
          .join("")}
      </article>
    `;
  }

  function renderTopology(columns) {
    const getNodeIconSvg = (title) => {
      if (title.includes("四情")) {
        return `
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="15" cy="18" r="5"></circle>
            <path d="M24 12v24"></path>
            <path d="M24 24h12"></path>
            <path d="M34 16v16"></path>
            <path d="M10 32c3-4 10-4 13 0"></path>
          </svg>
        `;
      }
      if (title.includes("灌溉")) {
        return `
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path d="M12 18h10l5 6h9"></path>
            <circle cx="11" cy="18" r="3"></circle>
            <circle cx="37" cy="24" r="3"></circle>
            <path d="M24 28c0-4 4-6 4-10 3 3 5 5 5 8a5 5 0 0 1-9 2z"></path>
          </svg>
        `;
      }
      if (title.includes("农业装备")) {
        return `
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="15" cy="31" r="5"></circle>
            <circle cx="33" cy="31" r="7"></circle>
            <path d="M10 30V20h11l4-5h5v15"></path>
            <path d="M30 18h8"></path>
          </svg>
        `;
      }
      if (title.includes("RS485")) {
        return `
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <rect x="9" y="13" width="30" height="22" rx="5"></rect>
            <path d="M16 20h16"></path>
            <path d="M16 27h9"></path>
            <circle cx="31" cy="27" r="2"></circle>
          </svg>
        `;
      }
      if (title.includes("网关")) {
        return `
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <rect x="14" y="18" width="20" height="14" rx="4"></rect>
            <path d="M19 18v-4"></path>
            <path d="M29 18v-4"></path>
            <path d="M12 18c2-4 6-6 12-6s10 2 12 6"></path>
          </svg>
        `;
      }
      if (title.includes("边缘")) {
        return `
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <rect x="10" y="12" width="28" height="24" rx="5"></rect>
            <path d="M18 20h12"></path>
            <path d="M18 26h8"></path>
            <path d="M14 36l4-4"></path>
            <path d="M34 36l-4-4"></path>
          </svg>
        `;
      }
      if (title.includes("平台")) {
        return `
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <rect x="10" y="12" width="28" height="18" rx="4"></rect>
            <path d="M18 36h12"></path>
            <path d="M24 30v6"></path>
            <path d="M16 22h16"></path>
          </svg>
        `;
      }
      if (title.includes("数字孪生")) {
        return `
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="19" cy="24" r="7"></circle>
            <circle cx="29" cy="24" r="7"></circle>
            <path d="M24 17v14"></path>
          </svg>
        `;
      }
      if (title.includes("项目管理")) {
        return `
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <rect x="11" y="10" width="26" height="28" rx="4"></rect>
            <path d="M17 18h14"></path>
            <path d="M17 24h14"></path>
            <path d="M17 30h9"></path>
          </svg>
        `;
      }
      return `
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="10"></circle>
          <path d="M24 14v20"></path>
          <path d="M14 24h20"></path>
        </svg>
      `;
    };

    const getNodeMark = (title) => {
      if (title.includes("四情")) return "四情";
      if (title.includes("灌溉")) return "灌控";
      if (title.includes("农业装备")) return "农机";
      if (title.includes("RS485")) return "总线";
      if (title.includes("网关")) return "网关";
      if (title.includes("边缘")) return "边控";
      if (title.includes("平台")) return "平台";
      if (title.includes("数字孪生")) return "孪生";
      if (title.includes("项目管理")) return "管理";
      return title.slice(0, 2);
    };

    const getLayerBrief = (title) => {
      if (title.includes("感知")) return "负责现场感知、设备执行与农业装备接入。";
      if (title.includes("传输")) return "负责数据上传、边缘联动与控制指令下发。";
      if (title.includes("平台")) return "负责看板展示、分析支撑与建设决策。";
      return "负责本层核心能力组织与系统协同。";
    };

    const getLayerBullets = (column) => {
      if (column.title.includes("感知")) {
        return [
          "核心对象：四情监测、灌溉控制、农业装备。",
          "现场目标：先把采集链路与执行链路跑通。",
          "当前重点：围绕样机验证真实部署边界。"
        ];
      }
      if (column.title.includes("传输")) {
        return [
          "核心对象：RS485 / Modbus、4G / LoRa、边缘控制。",
          "链路策略：4G 先落地，LoRa 作为后续优化路线。",
          "控制目标：面向闸门、水泵和预警策略实现联动。"
        ];
      }
      return [
        "核心对象：平台看板、数字孪生、项目管理。",
        "平台作用：把现场数据沉淀为展示、分析与预警能力。",
        "汇报价值：支撑采购进度、设备状态和后续建设判断。"
      ];
    };

    const summary = columns
      .map(
        (column, index) => `
          <span class="topology-summary-step topology-layer-${index + 1}">
            0${index + 1} ${escapeHtml(column.title)}
          </span>
        `
      )
      .join("");

    const bands = columns
      .map(
        (column, index) => `
          <section class="topology-band topology-layer-${index + 1}">
            <div class="topology-band-side">
              <span class="topology-band-index">0${index + 1}</span>
              <strong>${escapeHtml(column.title)}</strong>
            </div>
            <div class="topology-band-body">
              <div class="topology-band-flow${column.link ? "" : " topology-link-muted"}">
                ${escapeHtml(column.link || "本层核心能力")}
              </div>
              <div class="topology-node-grid">
                ${column.nodes
                  .map(
                    (node, nodeIndex) => `
                      <article class="topology-node">
                        <div class="topology-node-icon-wrap">
                          <span class="topology-node-icon" aria-hidden="true">${getNodeIconSvg(node.strong)}</span>
                          <span class="topology-node-mark">${escapeHtml(getNodeMark(node.strong))}</span>
                        </div>
                        <span class="topology-node-tag">模块 ${nodeIndex + 1}</span>
                        <strong>${escapeHtml(node.strong)}</strong>
                        <p>${escapeHtml(node.text)}</p>
                      </article>
                    `
                  )
                  .join("")}
              </div>
              <div class="topology-band-note">
                <p>${escapeHtml(getLayerBrief(column.title))}</p>
                <ul class="topology-band-list">
                  ${getLayerBullets(column).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                </ul>
              </div>
            </div>
          </section>
          ${index < columns.length - 1 ? `<div class="topology-band-connector" aria-hidden="true"><span></span></div>` : ""}
        `
      )
      .join("");

    return `
      <div class="topology-board">
        <div class="topology-board-summary">
          <div class="topology-summary-copy">
            <span class="topology-board-kicker">系统拓扑</span>
            <div>
              <strong>围绕现场感知、数据传输与平台分析构建闭环</strong>
              <p>以网页模块方式展示当前智慧农业系统的三层架构、关键模块与落地路径。</p>
            </div>
          </div>
          <div class="topology-board-steps">${summary}</div>
        </div>
        ${bands}
      </div>
    `;
  }

  function renderHighlightCards(items) {
    return items
      .map(
        (item) => `
          <article class="inventory-highlight-card${item.pending ? " is-pending" : ""}">
            <span class="inventory-card-kicker">${escapeHtml(item.kicker)}</span>
            <strong>${escapeHtml(item.value)}</strong>
            <p>${escapeHtml(item.note)}</p>
          </article>
        `
      )
      .join("");
  }

  function moneyTag(value, isTotal) {
    if (!value) return "";
    return `<span class="inventory-money${isTotal ? " is-total" : ""}">${escapeHtml(value)}</span>`;
  }

  function statusTag(value) {
    const cls =
      value === "已确认"
        ? "is-good"
        : value === "待补件"
          ? "is-warn"
          : value === "清单口径"
            ? "is-reference"
            : "is-total";
    return `<span class="inventory-badge ${cls}">${escapeHtml(value)}</span>`;
  }

  function looksLikeFileName(text) {
    return /\.(pdf|docx|doc|xlsx|xls|pptx|ppt|txt)$/i.test(String(text).trim());
  }

  function getFileExtension(fileName) {
    const match = String(fileName).trim().match(/\.([^.]+)$/);
    return match ? match[1].toLowerCase() : "";
  }

  function buildFileHrefs(fileName) {
    const name = String(fileName).trim();
    const mapped = fileHrefMap[name];
    const paths = Array.isArray(mapped) ? mapped : [mapped || name];
    return paths.map((path) => new URL(transformProtectedDocPath(path), window.location.href).href);
  }

  function buildOfficeOpenHref(fileName, webHref) {
    const ext = getFileExtension(fileName);
    const encodedHref = encodeURIComponent(webHref);
    if (ext === "doc" || ext === "docx") return `ms-word:ofe|u|${encodedHref}`;
    if (ext === "ppt" || ext === "pptx") return `ms-powerpoint:ofe|u|${encodedHref}`;
    if (ext === "xls" || ext === "xlsx") return `ms-excel:ofe|u|${encodedHref}`;
    return "";
  }

  function renderFileAnchor(fileName) {
    const name = String(fileName).trim();
    const hrefs = buildFileHrefs(name);
    const primary = hrefs[0];
    const fallback = hrefs[1] || "";
    const ext = getFileExtension(name);
    const isProtectedDoc = /\.enc($|\?)/i.test(primary);
    const officeHref = buildOfficeOpenHref(name, primary);
    const targetExt = getFileExtension(primary);
    const isBrowserViewable = isProtectedDoc || targetExt === "pdf" || targetExt === "txt" || ext === "pdf" || ext === "txt";
    const href = isProtectedDoc ? "#" : (isBrowserViewable ? primary : (officeHref || primary));
    const target = isProtectedDoc ? "" : (isBrowserViewable ? ` target="_blank" rel="noopener noreferrer"` : "");
    const cls = `file-link${isBrowserViewable ? "" : " is-office-link"}`;
    const title = isProtectedDoc ? "输入密码后查看受保护文件" : (isBrowserViewable ? "点击直接查看 PDF 预览" : "点击使用本机 Office 打开");
    const previewTag = isBrowserViewable
      ? `<span class="file-link-preview">${isProtectedDoc ? "密码查看" : "PDF预览"}</span>`
      : `<span class="file-link-preview is-office">Office打开</span>`;
    return `
      <a class="${cls}" href="${href}" data-file-primary="${primary}" data-file-fallback="${fallback}" data-file-office="${officeHref}" data-file-name="${escapeHtml(name)}" data-file-protected="${isProtectedDoc ? "true" : "false"}" title="${escapeHtml(title)}"${target}>
        <span class="file-link-name">${escapeHtml(name)}</span>
        ${previewTag}
      </a>
    `;
  }

  function renderFileCell(value) {
    const name = String(value || "").trim();
    if (!name) return "";
    return looksLikeFileName(name) ? renderFileAnchor(name) : renderFileTextWithLinks(name);
  }

  function renderFileTextWithLinks(text) {
    const parts = String(text || "").split(/([^\s<>]+?\.(?:pdf|docx|doc|xlsx|xls|pptx|ppt|txt))/gi);
    return parts
      .map((part, idx) => {
        if (idx % 2 === 1 && looksLikeFileName(part)) return renderFileAnchor(part);
        return escapeHtml(part);
      })
      .join("");
  }

  function renderFileHtmlCell(value) {
    const chunks = String(value || "")
      .split(/<br\s*\/?>/i)
      .map((part) => part.trim())
      .filter(Boolean);
    return chunks
      .map((chunk) => renderFileTextWithLinks(chunk))
      .join("<br>");
  }

  async function ensureContractsPasswordForFileAccess() {
    const current = readContractsPassword();
    if (current) {
      return current;
    }

    const input = window.prompt("请输入密码后查看受保护文件：", "");
    if (!input) {
      return "";
    }
    const value = input.trim();
    if (!value) {
      return "";
    }
    if (!(await verifyContractsPassword(value))) {
      window.alert("密码错误，无法查看该文件。");
      return "";
    }
    rememberContractsPassword(value);
    if (pageShell.classList.contains("agri-contract-page")) {
      unlockContractsPage();
      renderContractsPage();
    }
    return value;
  }

  async function openProtectedFile(anchor) {
    const encryptedHref = anchor.dataset.filePrimary || "";
    const fileName = anchor.dataset.fileName || "protected-file.pdf";
    if (!encryptedHref) {
      return;
    }

    const password = await ensureContractsPasswordForFileAccess();
    if (!password) {
      return;
    }

    const cacheKey = `${encryptedHref}::${password}`;
    if (decryptedFileCache.has(cacheKey)) {
      window.open(decryptedFileCache.get(cacheKey), "_blank", "noopener,noreferrer");
      return;
    }

    anchor.classList.add("is-loading");
    try {
      const response = await fetch(encryptedHref, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status}`);
      }
      const payload = new Uint8Array(await response.arrayBuffer());
      const header = new TextDecoder().decode(payload.slice(0, 4));
      if (header !== "SAE1") {
        throw new Error("Invalid encrypted file header");
      }

      const salt = payload.slice(4, 20);
      const nonce = payload.slice(20, 32);
      const tag = payload.slice(32, 48);
      const ciphertext = payload.slice(48);
      const encrypted = new Uint8Array(ciphertext.length + tag.length);
      encrypted.set(ciphertext, 0);
      encrypted.set(tag, ciphertext.length);

      const key = await deriveContractsKey(password, salt);
      const plainBuffer = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: nonce
        },
        key,
        encrypted
      );

      const ext = getFileExtension(fileName) || "pdf";
      const mimeMap = {
        pdf: "application/pdf",
        txt: "text/plain"
      };
      const mimeType = mimeMap[ext] || "application/octet-stream";
      const blob = new Blob([plainBuffer], { type: mimeType });
      const blobUrl = URL.createObjectURL(blob);
      decryptedFileCache.set(cacheKey, blobUrl);
      window.open(blobUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error(error);
      window.alert("受保护文件解密失败，请确认密码正确后重试。");
    } finally {
      anchor.classList.remove("is-loading");
    }
  }

  function initializeProtectedFileLinks() {
    document.addEventListener("click", (event) => {
      const anchor = event.target.closest(".file-link[data-file-protected='true']");
      if (!anchor) {
        return;
      }
      event.preventDefault();
      openProtectedFile(anchor);
    });
  }

  function renderTable(columns, rows, options) {
    const opts = options || {};
    const colgroup = opts.colgroup
      ? `<colgroup>${opts.colgroup.map((cls) => `<col class="${cls}">`).join("")}</colgroup>`
      : "";
    const thead = `<thead><tr>${columns.map((col) => `<th>${escapeHtml(col.label)}</th>`).join("")}</tr></thead>`;
    const tbody = rows
      .map((row, rowIndex) => {
        const isTotal = typeof opts.totalRowIndex === "number" && rowIndex === opts.totalRowIndex;
        const cells = columns
          .map((col, index) => {
            const value = row[index] || "";
            if (col.type === "money") return `<td>${moneyTag(value, isTotal)}</td>`;
            if (col.type === "status") return `<td>${statusTag(value)}</td>`;
            if (col.type === "html") return `<td>${value}</td>`;
            if (col.type === "file") return `<td>${renderFileCell(value)}</td>`;
            if (col.type === "file_html") return `<td>${renderFileHtmlCell(value)}</td>`;
            return `<td>${escapeHtml(value)}</td>`;
          })
          .join("");
        return `<tr${isTotal ? ' class="inventory-total-row"' : ""}>${cells}</tr>`;
      })
      .join("");
    return `
      <div class="inventory-table-wrap">
        <table class="inventory-table${opts.structured ? " inventory-table-structured" : ""}">
          ${colgroup}
          ${thead}
          <tbody>${tbody}</tbody>
        </table>
      </div>
    `;
  }

  function renderGroupedTable(columns, groups, options) {
    const opts = options || {};
    const colgroup = opts.colgroup
      ? `<colgroup>${opts.colgroup.map((cls) => `<col class="${cls}">`).join("")}</colgroup>`
      : "";
    const colCount = columns.length;
    const thead = `<thead><tr>${columns.map((col) => `<th>${escapeHtml(col.label)}</th>`).join("")}</tr></thead>`;

    const renderRow = (row, rowClass) => {
      const cells = columns
        .map((col, index) => {
          const value = row[index] || "";
          if (col.type === "money") return `<td>${moneyTag(value, rowClass === "inventory-total-row" || rowClass === "inventory-subtotal-row")}</td>`;
          if (col.type === "status") return `<td>${statusTag(value)}</td>`;
          if (col.type === "html") return `<td>${value}</td>`;
          return `<td>${escapeHtml(value)}</td>`;
        })
        .join("");
      return `<tr${rowClass ? ` class="${rowClass}"` : ""}>${cells}</tr>`;
    };

    const tbody = groups
      .map((group) => {
        const groupCls = group.cls ? ` ${group.cls}` : "";
        const rowCls = group.cls ? ` ${group.cls}-row` : "";
        const head = `
          <tr class="inventory-group-row${groupCls}">
            <td colspan="${colCount}">
              <div class="inventory-group-cell">
                <strong>
                  ${group.index ? `<span class="inventory-group-index">${escapeHtml(group.index)}</span>` : ""}
                  <span>${escapeHtml(group.title)}</span>
                </strong>
                ${group.note ? `<span>${escapeHtml(group.note)}</span>` : ""}
              </div>
            </td>
          </tr>
        `;
        const rows = group.rows.map((row) => renderRow(row, `inventory-group-body${rowCls}`)).join("");
        const subtotal = group.total ? renderRow(group.total, `inventory-subtotal-row${groupCls}`) : "";
        return `${head}${rows}${subtotal}`;
      })
      .join("");

    const grandTotal = opts.grandTotal ? renderRow(opts.grandTotal, "inventory-total-row") : "";

    return `
      <div class="inventory-table-wrap">
        <table class="inventory-table inventory-table-structured inventory-table-grouped">
          ${colgroup}
          ${thead}
          <tbody>${tbody}${grandTotal}</tbody>
        </table>
      </div>
    `;
  }

  function renderPanel(title, note, metrics, tableHtml, extraClass) {
    return `
      <div class="report-table-panel${extraClass ? ` ${extraClass}` : ""}">
        <div class="data-panel-head">
          <div>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(note)}</p>
          </div>
          <div class="data-panel-metrics">
            ${metrics.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>
        ${tableHtml}
      </div>
    `;
  }

  function renderSectionedPanel(index, title, note, metrics, tableHtml, extraClass) {
    return `
      <div class="report-table-panel report-table-panel-sectioned${extraClass ? ` ${extraClass}` : ""}">
        <div class="report-section-kicker">
          <span class="report-section-index">${escapeHtml(index)}</span>
          <div class="report-section-copy">
            <strong>${escapeHtml(title)}</strong>
            <p>${escapeHtml(note)}</p>
          </div>
          <div class="data-panel-metrics">
            ${metrics.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>
        ${tableHtml}
      </div>
    `;
  }

  function renderLegendCards(items) {
    return items
      .map(
        (item) => `
          <article class="inventory-legend-card ${item.cls}">
            <span class="inventory-legend-tag">${escapeHtml(item.tag)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.text)}</p>
          </article>
        `
      )
      .join("");
  }

  function renderMainPage() {
    const page = data.main;
    setHtml("main-hero-meta", renderPills(page.heroMeta));
    setHtml("main-hero-text", escapeHtml(page.heroText));
    setHtml("main-summary-card", renderSummaryCard(page.summary));
    setHtml("main-status-cards", renderSimpleCards(page.statusCards, "content-card inventory-stat-card"));
    setHtml("main-status-stacks", renderStatusStacks(page.statusStacks));
    setHtml("main-decision-cards", renderSimpleCards(page.decisionCards, "content-card agri-pillar"));
    setHtml("main-route-cards", renderRouteCards(page.routeCards));
    setHtml("main-next-cards", renderPhaseCards(page.nextCards));
    setHtml("main-appendix-links", renderAppendixLinks(page.appendixLinks));
    setHtml("main-contact-actions", renderActionButtons(page.contactActions));
  }

  function renderDashboardPage() {
    const page = data.dashboard;
    setHtml("dashboard-hero-meta", renderPills(page.heroMeta));
    setHtml("dashboard-hero-text", escapeHtml(page.heroText));
    setHtml("dashboard-note", `<strong>当前状态：</strong>${escapeHtml(page.note.replace(/^当前状态：/, ""))}`);
    setHtml("dashboard-summary-cards", renderSimpleCards(page.summaryCards, "stack-card"));
    setHtml("dashboard-kpis", renderDashboardKpis(page.kpis));
    setHtml("dashboard-progress-grid", renderProgressSection(page.progressItems, page.progressNotes));
    setHtml("dashboard-timeline", renderTimeline(page.timeline));
    setHtml("dashboard-topology", renderTopology(page.topology));
    setHtml("dashboard-next-grid", renderPhaseCards(page.nextCards));
    setHtml("dashboard-contact-actions", renderActionButtons(page.contactActions));
  }

  function renderInventoryPage() {
    const page = data.inventory;
    const purchasedGroups = [
      {
        index: "A1",
        cls: "inventory-group-gate",
        title: "智能闸门系统",
        note: "29 套 / 172,000 元 / 当前已采购金额占比最高。",
        rows: [["闸门整套", "29 套", "172,000 元", "《智慧农业项目已采购清单》", "整套采购，作为田间控制底座。"]]
      },
      {
        index: "A2",
        cls: "inventory-group-monitor",
        title: "监控系统",
        note: "41 摄像头 + 41 存储卡 + 30 套立杆及施工 / 合计 62,909 元。",
        rows: [
          ["摄像头", "41 个", "计入 62,909 元", "《智慧农业项目已采购清单》", "形成视频监测主体。"],
          ["存储卡", "41 张", "计入 62,909 元", "《智慧农业项目已采购清单》", "录像存储配套。"],
          ["立杆及施工", "30 套", "计入 62,909 元", "《智慧农业项目已采购清单》", "完成现场安装部署。"]]
      },
      {
        index: "A3",
        cls: "inventory-group-pest",
        title: "杀虫灯系统",
        note: "95 套口径 + 技术服务 / 合计 75,058 元。",
        rows: [
          ["批量采购 / 杀虫灯", "94 套", "73,320 元", "《智慧农业项目已采购清单》", "主要采购批次。"],
          ["补充采购 / 杀虫灯", "1 套", "计入 1,738 元", "《智慧农业项目已采购清单》", "补充设备。"],
          ["补充采购 / 技术服务", "1 项", "计入 1,738 元", "《智慧农业项目已采购清单》", "当前未拆分单价。"]]
      }
    ];

    const pendingGroups = [
      {
        index: "B1",
        cls: "inventory-group-weather",
        title: "气象站样机",
        note: "用于验证气象采集与接入链路 / 合计 2,006 元。",
        rows: page.weatherDetails.slice(0, -1),
        total: ["气象站小计", "", "", "", "2,006 元"]
      },
      {
        index: "B2",
        cls: "inventory-group-soil",
        title: "土壤墒情样机",
        note: "用于验证土壤监测与供电部署链路 / 合计 1,950 元。",
        rows: page.soilDetails.slice(0, -1),
        total: ["土壤墒情小计", "", "", "", "1,950 元"]
      },
      {
        index: "B3",
        cls: "inventory-group-water",
        title: "池塘水质样机",
        note: "优先面向池塘场景验证 / 合计 2,915 元。",
        rows: page.waterDetails.slice(0, -1),
        total: ["池塘水质小计", "", "", "", "2,915 元"]
      }
    ];

    setHtml("inventory-hero-meta", renderPills(page.heroMeta));
    setHtml("inventory-hero-kpis", renderKpis(page.heroKpis));
    setHtml("inventory-purchased-highlights", renderHighlightCards(page.purchasedHighlights));
    setHtml("inventory-purchased-summary", renderSimpleCards(page.purchasedSummary, "content-card inventory-stat-card"));
    setHtml(
      "inventory-purchased-table",
      renderPanel(
        "已采购设备主表",
        "把原来的系统汇总、杀虫灯明细和监控/闸门摘要合并到一张表里，按系统分组查看。",
        ["3 大系统", "7 条明细", "309,967 元"],
        renderGroupedTable(
          [
            { label: "设备 / 服务" },
            { label: "数量口径" },
            { label: "金额", type: "money" },
            { label: "来源依据" },
            { label: "备注" }
          ],
          purchasedGroups,
          {
            colgroup: ["col-system", "col-quantity", "col-money", "col-source", "col-note"],
            grandTotal: ["已采购合计", "29 套闸门 + 41 路监控 + 95 套口径杀虫灯", "309,967 元", "已采购清单汇总", "当前已采购口径。"]
          }
        )
      )
    );
    setHtml("inventory-pending-highlights", renderHighlightCards(page.pendingHighlights));
    setHtml(
      "inventory-pending-table",
      renderPanel(
        "待采购样机主表",
        "把样机汇总和气象、土壤、水质三张明细表合并到一张表里，按方向分组查看。",
        ["3 类样机", "20 项配置", "6,871 元"],
        renderGroupedTable(
          [
            { label: "设备名称" },
            { label: "型号" },
            { label: "数量" },
            { label: "单价" },
            { label: "小计", type: "money" }
          ],
          pendingGroups,
          {
            colgroup: ["col-name", "col-model", "col-qty", "col-unit", "col-money"],
            grandTotal: ["待采购合计", "", "", "", "6,871 元"]
          }
        ),
        "report-table-panel-pending"
      )
    );
    setHtml("inventory-legend-cards", renderLegendCards(page.legendCards));
    setHtml("inventory-notes-list", renderList(page.notes));
    setHtml("inventory-sources-list", renderList(page.sources));

    document.getElementById("inventory-pesticide-table")?.closest(".content-card, .inventory-grid-two")?.remove();
    document.getElementById("inventory-monitoring-table")?.closest(".content-card")?.remove();
    document.getElementById("inventory-weather-table")?.closest(".content-card")?.remove();
    document.getElementById("inventory-soil-table")?.closest(".content-card")?.remove();
    document.getElementById("inventory-water-table")?.closest(".content-card")?.remove();

    document.querySelectorAll(".agri-inventory-page .inventory-grid-two").forEach((grid) => {
      if (!grid.querySelector(".content-card")) grid.remove();
    });
  }

  function renderContractsPage() {
    const page = data.contracts;
    setHtml("contracts-hero-meta", renderPills(page.heroMeta));
    setHtml("contracts-hero-kpis", renderKpis(page.heroKpis));
    setHtml("contracts-highlights", renderHighlightCards(page.highlights));
    setHtml(
      "contracts-mapping-table",
      renderSectionedPanel(
        "C1",
        "合同映射总表",
        "把项目模块、金额口径、来源文件和当前状态放到同一张表里核对。",
        ["6 条口径", "316,838 元"],
        renderTable(
          [
            { label: "项目模块" },
            { label: "设备 / 系统" },
            { label: "金额口径", type: "money" },
            { label: "当前对应材料", type: "file_html" },
            { label: "状态", type: "status" },
            { label: "说明" }
          ],
          page.mappingRows,
          {
            structured: true,
            totalRowIndex: page.mappingRows.length - 1,
            colgroup: ["col-module", "col-system", "col-money", "col-source", "col-status", "col-note"]
          }
        ),
        "report-table-panel-reference"
      )
    );
    setHtml(
      "contracts-files-table",
      renderSectionedPanel(
        "C2",
        "合同 / PDF 类材料",
        "用于直接说明采购来源和签约依据，适合老师追问时快速对应。",
        [`${page.fileRows.length} 份材料`, "采购闭环"],
        renderTable(
          [
            { label: "文件名", type: "file" },
            { label: "主要对应内容" },
            { label: "当前用途" }
          ],
          page.fileRows,
          {
            structured: true,
            colgroup: ["col-file", "col-system", "col-note-wide"]
          }
        ),
        "report-table-panel-reference"
      )
    );
    setHtml("contracts-legend-cards", renderLegendCards(page.legends));
  }

  function renderResearchPage() {
    const page = data.research;
    setHtml("research-hero-meta", renderPills(page.heroMeta));
    setHtml("research-hero-kpis", renderKpis(page.heroKpis));
    setHtml("research-highlights", renderHighlightCards(page.highlights));
    setHtml(
      "research-report-table",
      renderSectionedPanel(
        "R1",
        "调研与论证材料清单",
        "按材料类型拆分预算口径、方案规划、技术路线与现场调研，支撑汇报论证与答疑。",
        [`${page.reportRows.length} 份材料`, "独立于合同对应页"],
        renderTable(
          [
            { label: "文件名", type: "file" },
            { label: "材料类型" },
            { label: "主要对应内容" },
            { label: "当前用途" }
          ],
          page.reportRows,
          {
            structured: true,
            colgroup: ["col-file", "col-module", "col-system", "col-note-wide"]
          }
        ),
        "report-table-panel-reference"
      )
    );
    setHtml("research-findings", renderSimpleCards(page.findings, "content-card inventory-stat-card"));
    setHtml("research-legend-cards", renderLegendCards(page.legends));
  }

  if (pageShell.classList.contains("agri-main-page")) {
    renderMainPage();
  }

  if (pageShell.classList.contains("agri-dashboard-page")) {
    renderDashboardPage();
  }

  if (pageShell.classList.contains("agri-inventory-page")) {
    renderInventoryPage();
  }

  initializeProtectedFileLinks();

  if (pageShell.classList.contains("agri-contract-page")) {
    if (!initializeContractsGate()) {
      return;
    }
    renderContractsPage();
  }

  if (pageShell.classList.contains("agri-research-page")) {
    renderResearchPage();
  }

})();
