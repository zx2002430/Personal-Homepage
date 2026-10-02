import { getDocument, GlobalWorkerOptions } from "./assets/vendor/pdfjs/pdf.mjs";

GlobalWorkerOptions.workerSrc = new URL("./assets/vendor/pdfjs/pdf.worker.mjs", import.meta.url).href;

const canvas = document.getElementById("paper-canvas");
const surface = document.getElementById("paper-surface");
const status = document.getElementById("reader-status");
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

function updateControls() {
  previousButton.disabled = !documentPdf || rendering || currentPage <= 1;
  nextButton.disabled = !documentPdf || rendering || currentPage >= documentPdf.numPages;
  pageInput.disabled = !documentPdf;
  goButton.disabled = !documentPdf;
  zoomSelect.disabled = !documentPdf;
  pageInput.value = currentPage;
}

function showError(error) {
  console.error("Unable to display the DM-NAV PDF:", error);
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

    canvas.setAttribute("aria-label", `DM-NAV 论文，第 ${number} 页，共 ${documentPdf.numPages} 页`);
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

try {
  documentPdf = await getDocument({
    url: new URL("./assets/docs/papers/DM_NAV_Deployable_Meta_M.pdf", import.meta.url).href,
    standardFontDataUrl: new URL("./assets/vendor/pdfjs/standard_fonts/", import.meta.url).href,
    wasmUrl: new URL("./assets/vendor/pdfjs/wasm/", import.meta.url).href
  }).promise;
  pageInput.max = documentPdf.numPages;
  totalPages.textContent = `/ ${documentPdf.numPages}`;
  await renderPage(1);
} catch (error) {
  surface.setAttribute("aria-busy", "false");
  showError(error);
}
