const defaultYML = `datasets:
  - uuid: pop
    url: /datasets/population.json
layoutTemplates:
  - name: Countries Population
    rows:
      - layoutColumns:
          - layoutComponents:
              - type: HTML
                properties:
                  HTML_CODE: Countries Population
                  font-size: xx-large
              - settings:
                  type: BARCHART
                  subtype: COLUMN
                  chart:
                    width: '800'
                    margin:
                      left: '100'
                  dataSetLookup:
                    dataSetUuid: pop
                    rowCount: 10
                    groupOps:
                      - columnGroup:
                          source: Name
                          groupStrategy: DYNAMIC
                        groupFunctions:
                          - source: Name
                          - source: 2020 Population
                          - source: 2021 Population
              - settings:
                  type: TABLE
                  chart:
                    resizable: 'true'
                  table:
                    sort:
                      enabled: 'true'
                  dataSetLookup:
                    dataSetUuid: pop`;
var currentValue = "";
var hideEditor = false;
const editorEl = document.getElementById("editor");
const updateBtn = document.getElementById("updateBtn");
const hideEditorBtn = document.getElementById("hideEditorBtn");
const editorContainer = document.getElementById("editorContainer");
const dbContainer = document.getElementById("dbContainer");
const editor = ace.edit("editor");
editor.session.setMode("ace/mode/yaml");
editor.setOptions({
  fontSize: "12pt",
});

const toJson = (value) => {
  var json = jsyaml.load(value);
  return JSON.stringify(json);
};

const send = () => {
  var value = editor.getValue();
  currentValue = value;
  if (value.trim() !== "") {
    value = toJson(value);
    document.getElementById("dbFrame").contentWindow.postMessage(value, null);
  }
};

const onkey = (e) => {
  if (e.ctrlKey && e.code === "Enter") {
    send();
  }
};

const hideShowEditor = (e) => {
    hideEditor = !hideEditor;
    if (hideEditor) {
        editorContainer.style.width = "0%";
        dbContainer.style.width = "100%";
        hideEditorBtn.textContent = "EDIT";
    } else {
        editorContainer.style.width = "40%";
        dbContainer.style.width = "60%";
        hideEditorBtn.textContent = "PREVIEW";
    }
    editor.renderer.updateFull();
};

window.addEventListener("message", (e) => {
  if (e.data === "ready") {
    send();
  }
});
hideEditorBtn.onclick = hideShowEditor;
updateBtn.onclick = (e) => send();
editorEl.onkeydown = (e) => onkey(e);
setInterval(() => {
  if (currentValue !== editor.getValue()) {
    currentValue = editor.getValue();
    send();
  }
}, 2000);

const urlParams = new URLSearchParams(window.location.search);
const importUrl = urlParams.get("import");
const preview = urlParams.get("preview");

if (importUrl) {
  fetch(importUrl, (r) => r.text())
    .then((data) => data.text().then((v) => editor.session.setValue(v)))
    .catch((e) => editor.session.setValue(defaultYML));
} else {
  editor.session.setValue(defaultYML);
}

if (preview) {
  hideShowEditor();
}
