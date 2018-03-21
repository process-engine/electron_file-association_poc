if (window.nodeRequire) {
  const ipcRenderer = window.nodeRequire("electron").ipcRenderer;
  const fileInfo= ipcRenderer.sendSync("get_opend_file");
  document.write(JSON.stringify(fileInfo));
}
