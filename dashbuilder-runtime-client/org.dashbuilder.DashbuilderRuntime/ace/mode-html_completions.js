define("ace/mode/html_completions", ["require", "exports", "module", "ace/token_iterator"], function (e, t, n) {
  function f(e, t) {
    var n = e.type.split(".");
    return t.split(".").every(function (e) {
      return n.indexOf(e) !== -1;
    });
  }
  function l(e, t) {
    var n = new r(e, t.row, t.column),
      i = n.getCurrentToken();
    if (!i || (!f(i, "tag") && (!f(i, "text") || !i.value.match("/"))))
      do i = n.stepBackward();
      while (i && (f(i, "string") || f(i, "operator") || f(i, "attribute-name") || f(i, "text")));
    if (i && f(i, "tag-name") && !n.stepBackward().value.match("/")) return i.value;
  }
  var r = e("../token_iterator").TokenIterator,
    i = [
      "accesskey",
      "class",
      "contenteditable",
      "contextmenu",
      "dir",
      "draggable",
      "dropzone",
      "hidden",
      "id",
      "lang",
      "spellcheck",
      "style",
      "tabindex",
      "title",
      "translate",
    ],
    s = [
      "onabort",
      "onblur",
      "oncancel",
      "oncanplay",
      "oncanplaythrough",
      "onchange",
      "onclick",
      "onclose",
      "oncontextmenu",
      "oncuechange",
      "ondblclick",
      "ondrag",
      "ondragend",
      "ondragenter",
      "ondragleave",
      "ondragover",
      "ondragstart",
      "ondrop",
      "ondurationchange",
      "onemptied",
      "onended",
      "onerror",
      "onfocus",
      "oninput",
      "oninvalid",
      "onkeydown",
      "onkeypress",
      "onkeyup",
      "onload",
      "onloadeddata",
      "onloadedmetadata",
      "onloadstart",
      "onmousedown",
      "onmousemove",
      "onmouseout",
      "onmouseover",
      "onmouseup",
      "onmousewheel",
      "onpause",
      "onplay",
      "onplaying",
      "onprogress",
      "onratechange",
      "onreset",
      "onscroll",
      "onseeked",
      "onseeking",
      "onselect",
      "onshow",
      "onstalled",
      "onsubmit",
      "onsuspend",
      "ontimeupdate",
      "onvolumechange",
      "onwaiting",
    ],
    o = i.concat(s),
    u = {
      html: ["manifest"],
      head: [],
      title: [],
      base: ["href", "target"],
      link: ["href", "hreflang", "rel", "media", "type", "sizes"],
      meta: ["http-equiv", "name", "content", "charset"],
      style: ["type", "media", "scoped"],
      script: ["charset", "type", "src", "defer", "async"],
      noscript: ["href"],
      body: [
        "onafterprint",
        "onbeforeprint",
        "onbeforeunload",
        "onhashchange",
        "onmessage",
        "onoffline",
        "onpopstate",
        "onredo",
        "onresize",
        "onstorage",
        "onundo",
        "onunload",
      ],
      section: [],
      nav: [],
      article: ["pubdate"],
      aside: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      header: [],
      footer: [],
      address: [],
      main: [],
      p: [],
      hr: [],
      pre: [],
      blockquote: ["cite"],
      ol: ["start", "reversed"],
      ul: [],
      li: ["value"],
      dl: [],
      dt: [],
      dd: [],
      figure: [],
      figcaption: [],
      div: [],
      a: ["href", "target", "ping", "rel", "media", "hreflang", "type"],
      em: [],
      strong: [],
      small: [],
      s: [],
      cite: [],
      q: ["cite"],
      dfn: [],
      abbr: [],
      data: [],
      time: ["datetime"],
      code: [],
      var: [],
      samp: [],
      kbd: [],
      sub: [],
      sup: [],
      i: [],
      b: [],
      u: [],
      mark: [],
      ruby: [],
      rt: [],
      rp: [],
      bdi: [],
      bdo: [],
      span: [],
      br: [],
      wbr: [],
      ins: ["cite", "datetime"],
      del: ["cite", "datetime"],
      img: ["alt", "src", "height", "width", "usemap", "ismap"],
      iframe: ["name", "src", "height", "width", "sandbox", "seamless"],
      embed: ["src", "height", "width", "type"],
      object: ["param", "data", "type", "height", "width", "usemap", "name", "form", "classid"],
      param: ["name", "value"],
      video: ["src", "autobuffer", "autoplay", "loop", "controls", "width", "height", "poster"],
      audio: ["src", "autobuffer", "autoplay", "loop", "controls"],
      source: ["src", "type", "media"],
      track: ["kind", "src", "srclang", "label", "default"],
      canvas: ["width", "height"],
      map: ["name"],
      area: ["shape", "coords", "href", "hreflang", "alt", "target", "media", "rel", "ping", "type"],
      svg: [],
      math: [],
      table: ["summary"],
      caption: [],
      colgroup: ["span"],
      col: ["span"],
      tbody: [],
      thead: [],
      tfoot: [],
      tr: [],
      td: ["headers", "rowspan", "colspan"],
      th: ["headers", "rowspan", "colspan", "scope"],
      form: ["accept-charset", "action", "autocomplete", "enctype", "method", "name", "novalidate", "target"],
      fieldset: ["disabled", "form", "name"],
      legend: [],
      label: ["form", "for"],
      input: [
        "type",
        "accept",
        "alt",
        "autocomplete",
        "checked",
        "disabled",
        "form",
        "formaction",
        "formenctype",
        "formmethod",
        "formnovalidate",
        "formtarget",
        "height",
        "list",
        "max",
        "maxlength",
        "min",
        "multiple",
        "pattern",
        "placeholder",
        "readonly",
        "required",
        "size",
        "src",
        "step",
        "width",
        "files",
        "value",
      ],
      button: [
        "autofocus",
        "disabled",
        "form",
        "formaction",
        "formenctype",
        "formmethod",
        "formnovalidate",
        "formtarget",
        "name",
        "value",
        "type",
      ],
      select: ["autofocus", "disabled", "form", "multiple", "name", "size"],
      datalist: [],
      optgroup: ["disabled", "label"],
      option: ["disabled", "selected", "label", "value"],
      textarea: [
        "autofocus",
        "disabled",
        "form",
        "maxlength",
        "name",
        "placeholder",
        "readonly",
        "required",
        "rows",
        "cols",
        "wrap",
      ],
      keygen: ["autofocus", "challenge", "disabled", "form", "keytype", "name"],
      output: ["for", "form", "name"],
      progress: ["value", "max"],
      meter: ["value", "min", "max", "low", "high", "optimum"],
      details: ["open"],
      summary: [],
      command: ["type", "label", "icon", "disabled", "checked", "radiogroup", "command"],
      menu: ["type", "label"],
      dialog: ["open"],
    },
    a = Object.keys(u),
    c = function () {};
  (function () {
    (this.getCompletions = function (e, t, n, r) {
      var i = t.getTokenAt(n.row, n.column);
      return i
        ? f(i, "tag-name") || (i.value == "<" && f(i, "text"))
          ? this.getTagCompletions(e, t, n, r)
          : f(i, "text") || f(i, "attribute-name")
          ? this.getAttributeCompetions(e, t, n, r)
          : []
        : [];
    }),
      (this.getTagCompletions = function (e, t, n, r) {
        var i = a;
        return (
          r &&
            (i = i.filter(function (e) {
              return e.indexOf(r) === 0;
            })),
          i.map(function (e) {
            return { value: e, meta: "tag" };
          })
        );
      }),
      (this.getAttributeCompetions = function (e, t, n, r) {
        var i = l(t, n);
        if (!i) return [];
        var s = o;
        return (
          i in u && (s = s.concat(u[i])),
          r &&
            (s = s.filter(function (e) {
              return e.indexOf(r) === 0;
            })),
          s.map(function (e) {
            return { caption: e, snippet: e + '="$0"', meta: "attribute" };
          })
        );
      });
  }.call(c.prototype),
    (t.HtmlCompletions = c));
});
