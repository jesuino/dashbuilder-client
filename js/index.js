const defaultYML = `global:
  mode: dark
  settings:
    chart:
      resizable: true
datasets:
  - uuid: pop
    url: /datasets/population.json
pages:
  - components:
      - settings:
          type: BARCHART
          general:
            title: Countries Population
          chart:
            height: 350
            margin:
              left: 120
          axis:
            x:
              labels_angle: 12
          lookup:
            uuid: pop
            rowCount: 10
            group:
              - columnGroup:
                  source: Name
                functions:
                  - source: Name
                  - source: 2020 Population
                  - source: 2021 Population
      - settings:
          table:
            sort:
              enabled: true
          lookup:
            uuid: pop`;
var currentValue = "";
const editorEl = document.getElementById("editor");
const updateBtn = document.getElementById("updateBtn");
const autoBtn = document.getElementById("autoBtn");

const showEditorBtn = document.getElementById("showEditorBtn");
const showPreviewBtn = document.getElementById("showPreviewBtn");

const IMPORT_PARAM = "import";
const PREVIEW_PARAM = "preview";
const EDITOR_PARAM = "editor";

const editorControls = document.getElementById("editorControls");
const editorContainer = document.getElementById("editorContainer");
const dbContainer = document.getElementById("dbContainer");
const editor = ace.edit("editor");
editor.session.setMode("ace/mode/yaml");
editor.setTheme("ace/theme/twilight");
editor.setOptions({
  fontSize: "12pt",
});

const send = () => {
  var value = editor.getValue();
  currentValue = value;
  if (value.trim() !== "") {
    console.debug(value);
    document.getElementById("dbFrame").contentWindow.postMessage(value, null);
  }
};

const onkey = (e) => {
  if (e.ctrlKey && e.code === "Enter") {
    send();
  }
};


const onShowEditor = e => {
  if (!showPreviewBtn.checked && !showEditorBtn.checked) {
    showEditorBtn.checked = true;
  }
  hideShow()
}

const onShowPreview = e => {
  if (!showPreviewBtn.checked && !showEditorBtn.checked) {
    showPreviewBtn.checked = true;
  }
  hideShow()
}

const hideShow = (e) => {

  if (showEditorBtn.checked) {
    editorContainer.style.width = "100%";
    editorControls.style.display = "inline-block";
  } else {
    editorContainer.style.width = "0%";
    editorControls.style.display = "none";
  }

  if (showPreviewBtn.checked) {
    dbContainer.style.width = "100%";
  } else {
    dbContainer.style.width = "0%";
  }

  urlHashParams.set(PREVIEW_PARAM, showPreviewBtn.checked);
  urlHashParams.set(EDITOR_PARAM, showEditorBtn.checked);

  window.location.hash = `${EDITOR_PARAM}=${showEditorBtn.checked}&${PREVIEW_PARAM}=${showPreviewBtn.checked}`;
  editor.renderer.updateFull();
};

window.addEventListener("message", (e) => {
  if (e.data === "ready") {
    send();
  }
});

showEditorBtn.onclick = onShowEditor;
showPreviewBtn.onclick = onShowPreview;
updateBtn.onclick = (e) => send();
editorEl.onkeydown = onkey;

const urlHashParams = new URLSearchParams(window.location.hash.replace(/#/, "?"));
const showEditorParam = urlHashParams.get(EDITOR_PARAM);
const showPreviewParam = urlHashParams.get(PREVIEW_PARAM);
if (showEditorParam) {
  showEditorBtn.checked = showEditorParam !== "false";
}
if (showPreviewParam) {
  showPreviewParam.checked = showPreviewParam !== "false";
}
hideShow();

const urlQueryParams = new URLSearchParams(window.location.search);
const importUrl = urlQueryParams.get(IMPORT_PARAM);
if (importUrl) {
  fetch(importUrl, (r) => r.text())
    .then((data) => {
      data.text().then((v) => editor.session.setValue(v));
      send();
    })
    .catch((e) => editor.session.setValue(defaultYML));
} else {
  editor.session.setValue(defaultYML);
}
setInterval(() => {
  if (currentValue !== editor.getValue()) {
    currentValue = editor.getValue();
    send();
  }
}, 1500);
