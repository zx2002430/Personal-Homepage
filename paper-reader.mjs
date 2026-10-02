import { getDocument, GlobalWorkerOptions } from "./assets/vendor/pdfjs/pdf.mjs";

GlobalWorkerOptions.workerSrc = new URL("./assets/vendor/pdfjs/pdf.worker.mjs", import.meta.url).href;

const papers = {
  "dm-nav": { file: "DM_NAV_Deployable_Meta_M.pdf", label: "DM-NAV 论文" },
  "vla-peft": { file: "AAMAS_2027.pdf", label: "VLA 参数高效微调论文" }
};
const paper = papers[document.body.dataset.paper];
const canvas = document.getElementById("paper-canvas");
const surface = document.getElementById("paper-surface");
const status = document.getElementById("reader-status");
const toolbar = document.getElementById("reader-toolbar");
const gate = document.getElementById("password-gate");
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("paper-password");
const unlockButton = document.getElementById("unlock-paper");
const passwordMessage = document.getElementById("password-message");
const downloadLink = document.getElementById("download-paper");
const previousButton = document.getElementById("previous-page");
const nextButton = document.getElementById("next-page");
const pageInput = document.getElementById("page-number");
const goButton = document.getElementById("go-to-page");
const totalPages = document.getElementById("page-total");
const zoomSelect = document.getElementById("page-zoom");

let documentPdf;
let currentPage = 1;
let rendering = false;
let queuedPage = null;
let resizeTimer;
let downloadUrl;
let unlocking = false;

function updateControls() {
  previousButton.disabled = !documentPdf || rendering || currentPage <= 1;
  nextButton.disabled = !documentPdf || rendering || currentPage >= documentPdf.numPages;
  pageInput.disabled = !documentPdf;
  goButton.disabled = !documentPdf;
  zoomSelect.disabled = !documentPdf;
  pageInput.value = currentPage;
}

function showError(error) {
  console.error("Unable to display the paper PDF:", error);
  status.textContent = "暂时无法预览论文，请使用上方的“下载 PDF”按钮查看。";
  status.dataset.error = "true";
  status.hidden = false;
  canvas.hidden = true;
}

async function renderPage(number) {
  rendering = true;
  updateControls();
  surface.setAttribute("aria-busy", "true");
  status.textContent = `正在加载第 ${number} 页...`;
  status.dataset.error = "false";
  status.hidden = false;

  try {
    const page = await documentPdf.getPage(number);
    const baseViewport = page.getViewport({ scale: 1 });
    const surfacePadding = parseFloat(getComputedStyle(surface).paddingLeft) * 2;
    const availableWidth = Math.max(240, surface.clientWidth - surfacePadding);
    const scale = zoomSelect.value === "fit"
      ? availableWidth / baseViewport.width
      : Number(zoomSelect.value) * 96 / 72;
    const viewport = page.getViewport({ scale });
    const outputScale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;

    await page.render({
      canvas,
      canvasContext: canvas.getContext("2d"),
      viewport,
      transform: outputScale === 1 ? null : [outputScale, 0, 0, outputScale, 0, 0]
    }).promise;

    canvas.setAttribute("aria-label", `${paper.label}，第 ${number} 页，共 ${documentPdf.numPages} 页`);
    canvas.hidden = false;
    status.hidden = true;
  } catch (error) {
    showError(error);
  } finally {
    rendering = false;
    surface.setAttribute("aria-busy", "false");
    if (queuedPage !== null) {
      const nextPage = queuedPage;
      queuedPage = null;
      void renderPage(nextPage);
    } else {
      updateControls();
    }
  }
}

function requestPage(number) {
  if (!documentPdf) return;
  const requestedPage = Number.isFinite(number) ? Math.round(number) : currentPage;
  currentPage = Math.min(documentPdf.numPages, Math.max(1, requestedPage));
  pageInput.value = currentPage;
  if (rendering) {
    queuedPage = currentPage;
  } else {
    void renderPage(currentPage);
  }
}

function turnPage(offset) {
  requestPage(currentPage + offset);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function decryptPaper(password) {
  const encryptedUrl = new URL(`./assets/docs/papers/${paper.file}.enc`, import.meta.url);
  const response = await fetch(encryptedUrl, { cache: "no-store" });
  if (!response.ok) throw new Error("论文文件加载失败，请稍后重试。");
  const payload = new Uint8Array(await response.arrayBuffer());
  if (payload.length < 49 || new TextDecoder().decode(payload.subarray(0, 4)) !== "PPR1") {
    throw new Error("论文文件格式异常，请稍后重试。");
  }
  // PPR1: 16-byte salt, 12-byte IV, 16-byte authentication tag, ciphertext.
  const salt = payload.subarray(4, 20);
  const iv = payload.subarray(20, 32);
  const encrypted = new Uint8Array(payload.length - 32);
  encrypted.set(payload.subarray(48));
  encrypted.set(payload.subarray(32, 48), payload.length - 48);
  const baseKey = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]
  );
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 600000, hash: "SHA-256" },
    baseKey, { name: "AES-GCM", length: 256 }, false, ["decrypt"]
  );
  try {
    return new Uint8Array(await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encrypted));
  } catch {
    throw new Error("密码不正确，请重新输入。");
  }
}

passwordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (unlocking) return;
  if (!paper || !crypto.subtle) {
    passwordMessage.textContent = "当前浏览器无法解锁论文，请使用支持 HTTPS 的现代浏览器。";
    passwordMessage.dataset.error = "true";
    return;
  }
  unlocking = true;
  passwordInput.disabled = true;
  unlockButton.disabled = true;
  passwordMessage.textContent = "正在解锁论文...";
  passwordMessage.dataset.error = "false";
  let bytes;
  try {
    bytes = await decryptPaper(passwordInput.value);
  } catch (error) {
    passwordMessage.textContent = error.message === "Failed to fetch"
      ? "论文文件加载失败，请检查网络后重试。" : error.message;
    passwordMessage.dataset.error = "true";
    passwordInput.disabled = false;
    unlockButton.disabled = false;
    unlocking = false;
    passwordInput.focus();
    passwordInput.select();
    return;
  }

  passwordInput.value = "";
  downloadUrl = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
  downloadLink.href = downloadUrl;
  downloadLink.download = paper.file;
  downloadLink.hidden = false;
  gate.hidden = true;
  toolbar.hidden = false;
  surface.hidden = false;
  status.textContent = "正在加载论文...";
  status.hidden = false;
  surface.setAttribute("aria-busy", "true");
  try {
    documentPdf = await getDocument({
      data: bytes,
      standardFontDataUrl: new URL("./assets/vendor/pdfjs/standard_fonts/", import.meta.url).href,
      wasmUrl: new URL("./assets/vendor/pdfjs/wasm/", import.meta.url).href
    }).promise;
    pageInput.max = documentPdf.numPages;
    totalPages.textContent = `/ ${documentPdf.numPages}`;
    await renderPage(1);
    nextButton.focus();
  } catch (error) {
    surface.setAttribute("aria-busy", "false");
    showError(error);
  }
});

previousButton.addEventListener("click", () => turnPage(-1));
nextButton.addEventListener("click", () => turnPage(1));
pageInput.addEventListener("change", () => requestPage(Number(pageInput.value)));
goButton.addEventListener("click", () => requestPage(Number(pageInput.value)));
pageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    requestPage(Number(pageInput.value));
  }
});
zoomSelect.addEventListener("change", () => requestPage(currentPage));
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => requestPage(currentPage), 150);
});
document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.target.matches("input, select, textarea")) return;
  if (event.key === "ArrowLeft" && !previousButton.disabled) turnPage(-1);
  if (event.key === "ArrowRight" && !nextButton.disabled) turnPage(1);
});
window.addEventListener("beforeunload", () => {
  if (downloadUrl) URL.revokeObjectURL(downloadUrl);
});
