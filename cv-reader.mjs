const files = {
  pdf: { name: "zhao-xun-academic-cv-bilingual.pdf", type: "application/pdf" },
  docx: { name: "zhao-xun-academic-cv-bilingual.docx", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
  englishPreview: { name: "zhao-xun-academic-cv-en-preview.jpg", type: "image/jpeg" },
  chinesePreview: { name: "zhao-xun-academic-cv-zh-preview.jpg", type: "image/jpeg" }
};

const gate = document.getElementById("cv-password-gate");
const content = document.getElementById("cv-content");
const form = document.getElementById("cv-password-form");
const passwordInput = document.getElementById("cv-password");
const unlockButton = document.getElementById("cv-unlock");
const message = document.getElementById("cv-password-message");
const downloadPdf = document.getElementById("cv-download-pdf");
const downloadDocx = document.getElementById("cv-download-docx");
const previewEnglish = document.getElementById("cv-preview-en");
const previewChinese = document.getElementById("cv-preview-zh");
const objectUrls = [];
let unlocking = false;

function isEnglish() {
  return document.documentElement.lang === "en";
}

function setMessage(chinese, english, isError = false) {
  message.textContent = isEnglish() ? english : chinese;
  message.dataset.error = String(isError);
}

async function decryptFile(file, password) {
  const response = await fetch(new URL(`./assets/cv/${file.name}.enc`, import.meta.url), { cache: "no-store" });
  if (!response.ok) throw new Error("file");

  const payload = new Uint8Array(await response.arrayBuffer());
  if (payload.length < 49 || new TextDecoder().decode(payload.subarray(0, 4)) !== "PPR1") {
    throw new Error("file");
  }

  // PPR1 stores a salt, IV, authentication tag, and AES-GCM ciphertext.
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
    throw new Error("password");
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (unlocking) return;
  if (!globalThis.crypto?.subtle) {
    setMessage("当前浏览器无法解锁简历，请使用支持 HTTPS 的现代浏览器。", "This browser cannot unlock the CV. Please use a modern browser over HTTPS.", true);
    return;
  }

  unlocking = true;
  passwordInput.disabled = true;
  unlockButton.disabled = true;
  setMessage("正在验证密码并加载简历…", "Checking the password and loading the CV…");

  try {
    const password = passwordInput.value;
    const entries = Object.entries(files);
    const decrypted = await Promise.all(entries.map(([, file]) => decryptFile(file, password)));
    const blobs = new Map(entries.map(([key, file], index) => [
      key,
      URL.createObjectURL(new Blob([decrypted[index]], { type: file.type }))
    ]));
    objectUrls.push(...blobs.values());

    downloadPdf.href = blobs.get("pdf");
    downloadDocx.href = blobs.get("docx");
    previewEnglish.src = blobs.get("englishPreview");
    previewChinese.src = blobs.get("chinesePreview");
    passwordInput.value = "";
    gate.hidden = true;
    content.hidden = false;
  } catch (error) {
    if (error.message === "file") {
      setMessage("简历文件加载失败，请检查网络后重试。", "The CV files could not be loaded. Check your connection and try again.", true);
    } else {
      setMessage("密码错误，请重新输入。", "Incorrect password. Please try again.", true);
    }
    passwordInput.disabled = false;
    unlockButton.disabled = false;
    unlocking = false;
    passwordInput.focus();
    passwordInput.select();
  }
});

window.addEventListener("beforeunload", () => objectUrls.forEach(URL.revokeObjectURL));
