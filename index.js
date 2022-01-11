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
var currentContent = "";
const editorEl = document.getElementById("editor");
const editor = ace.edit("editor");
editor.session.setMode("ace/mode/yaml");
editor.session.setValue(defaultYML);
editor.setOptions({
    fontSize: "12pt"
  });

const toJson = (value) => {
  var json = jsyaml.load(value);
  return JSON.stringify(json);
};

const send = () => {
  var value = editor.getValue();
  currentContent = value;
  value = toJson(value);
  document.getElementById("dbFrame").contentWindow.postMessage(value, null);
};

const onkey = (e) => {
  if (e.ctrlKey && e.code === "Enter") {
    send();
  }
};

window.addEventListener("message", (e) => {
  if (e.data === "ready") {
    send();
  }
});

editorEl.onkeydown = (e) => onkey(e);
setInterval(() => {
  if (currentContent !== editor.getValue()) {
    currentContent = editor.getValue();
    send();
  }
}, 2000);