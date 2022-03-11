import { Specification, MermaidDiagram } from "./swfsdk.esm.min.js";

const mermaidDiv = document.querySelector(".workflowdiagram");
window.addEventListener("message", (e) => {
  const props = e.data.properties;
  const dataset = props ? props.get("dataSet") : null;
  if (props) {
    const diagram = props.get("diagram");
    if (diagram) {
      const mermaidSource = new MermaidDiagram(
        Specification.Workflow.fromSource(diagram)
      ).sourceCode();
      mermaid.mermaidAPI.render("mermaid", mermaidSource, (svgCode) => {
        mermaidDiv.innerHTML = svgCode;
      });
    }
  }
  if (dataset) {
  }
});
