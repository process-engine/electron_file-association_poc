if (window.nodeRequire) {
  const ipcRenderer = window.nodeRequire("electron").ipcRenderer;
  const fileInfo = ipcRenderer.sendSync("get_opened_file");

  if (fileInfo !== undefined) {
    document.getElementById('filepath').innerText = fileInfo.path;
    document.getElementById('filecontent').value = fileInfo.content;
  }
}
