// http://www.w3.org/TR/CSS21/grammar.html
// https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
const commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;

function cssParse(css, options) {
  options = options || {};

  /**
   * Positional.
   */

  let lineno = 1;
  let column = 1;

  /**
   * Update lineno and column based on `str`.
   */

  function updatePosition(str) {
    let lines = str.match(/\n/g);
    if (lines) lineno += lines.length;
    let i = str.lastIndexOf("\n");
    column = ~i ? str.length - i : column + str.length;
  }

  /**
   * Mark position and patch `node.position`.
   */

  function position() {
    let start = { line: lineno, column: column };
    return function (node) {
      node.position = new Position(start);
      whitespace();
      return node;
    };
  }

  /**
   * Store position information for a node
   */

  function Position(start) {
    this.start = start;
    this.end = { line: lineno, column: column };
    this.source = options.source;
  }

  /**
   * Non-enumerable source string
   */

  Position.prototype.content = css;

  /**
   * Error `msg`.
   */

  let errorsList = [];

  function error(msg) {
    let err = new Error(
      options.source + ":" + lineno + ":" + column + ": " + msg,
    );
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = css;

    if (options.silent) {
      errorsList.push(err);
    } else {
      throw err;
    }
  }

  /**
   * Parse stylesheet.
   */

  function stylesheet() {
    let rulesList = rules();

    return {
      type: "stylesheet",
      stylesheet: {
        source: options.source,
        rules: rulesList,
        parsingErrors: errorsList,
      },
    };
  }

  /**
   * Opening brace.
   */

  function open() {
    return match(/^{\s*/);
  }

  /**
   * Closing brace.
   */

  function close() {
    return match(/^}/);
  }

  /**
   * Parse ruleset.
   */

  function rules() {
    let node;
    let rules = [];
    whitespace();
    comments(rules);
    while (css.length && css.charAt(0) != "}" && (node = atrule() || rule())) {
      if (node !== false) {
        rules.push(node);
        comments(rules);
      }
    }
    return rules;
  }

  /**
   * Match `re` and return captures.
   */

  function match(re) {
    let m = re.exec(css);
    if (!m) return;
    let str = m[0];
    updatePosition(str);
    css = css.slice(str.length);
    return m;
  }

  /**
   * Parse whitespace.
   */

  function whitespace() {
    match(/^\s*/);
  }

  /**
   * Parse comments;
   */

  function comments(rules) {
    let c;
    rules = rules || [];
    while ((c = comment())) {
      if (c !== false) {
        rules.push(c);
      }
    }
    return rules;
  }

  /**
   * Parse comment.
   */

  function comment() {
    let pos = position();
    if ("/" != css.charAt(0) || "*" != css.charAt(1)) return;

    let i = 2;
    while (
      "" != css.charAt(i) &&
      ("*" != css.charAt(i) || "/" != css.charAt(i + 1))
    )
      ++i;
    i += 2;

    if ("" === css.charAt(i - 1)) {
      return error("End of comment missing");
    }

    let str = css.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    css = css.slice(i);
    column += 2;

    return pos({
      type: "comment",
      comment: str,
    });
  }

  /**
   * Parse selector.
   */

  function selector() {
    let m = match(/^([^{]+)/);
    if (!m) return;
    /* @fix Remove all comments from selectors
     * http://ostermiller.org/findcomment.html */
    return trim(m[0])
      .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, "")
      .replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (m) {
        return m.replace(/,/g, "\u200C");
      })
      .split(/\s*(?![^(]*\)),\s*/)
      .map(function (s) {
        return s.replace(/\u200C/g, ",");
      });
  }

  /**
   * Parse declaration.
   */

  function declaration() {
    let pos = position();

    // prop
    // eslint-disable-next-line no-useless-escape
    let prop = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
    if (!prop) return;
    prop = trim(prop[0]);

    // :
    if (!match(/^:\s*/)) return error("property missing ':'");

    // val
    // eslint-disable-next-line no-useless-escape
    let val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);

    let ret = pos({
      type: "declaration",
      property: prop.replace(commentre, ""),
      value: val ? trim(val[0]).replace(commentre, "") : "",
    });

    // ;
    match(/^[;\s]*/);

    return ret;
  }

  /**
   * Parse declarations.
   */

  function declarations() {
    let decls = [];

    if (!open()) return error("missing '{'");
    comments(decls);

    // declarations
    let decl;
    while ((decl = declaration())) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }

    if (!close()) return error("missing '}'");
    return decls;
  }

  /**
   * Parse keyframe.
   */

  function keyframe() {
    let m;
    let vals = [];
    let pos = position();

    while ((m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/))) {
      vals.push(m[1]);
      match(/^,\s*/);
    }

    if (!vals.length) return;

    return pos({
      type: "keyframe",
      values: vals,
      declarations: declarations(),
    });
  }

  /**
   * Parse keyframes.
   */

  function atkeyframes() {
    let pos = position();
    let m = match(/^@([-\w]+)?keyframes\s*/);

    if (!m) return;
    let vendor = m[1];

    // identifier
    m = match(/^([-\w]+)\s*/);
    if (!m) return error("@keyframes missing name");
    let name = m[1];

    if (!open()) return error("@keyframes missing '{'");

    let frame;
    let frames = comments();
    while ((frame = keyframe())) {
      frames.push(frame);
      frames = frames.concat(comments());
    }

    if (!close()) return error("@keyframes missing '}'");

    return pos({
      type: "keyframes",
      name: name,
      vendor: vendor,
      keyframes: frames,
    });
  }

  /**
   * Parse supports.
   */

  function atsupports() {
    let pos = position();
    let m = match(/^@supports *([^{]+)/);

    if (!m) return;
    let supports = trim(m[1]);

    if (!open()) return error("@supports missing '{'");

    let style = comments().concat(rules());

    if (!close()) return error("@supports missing '}'");

    return pos({
      type: "supports",
      supports: supports,
      rules: style,
    });
  }

  /**
   * Parse host.
   */

  function athost() {
    let pos = position();
    let m = match(/^@host\s*/);

    if (!m) return;

    if (!open()) return error("@host missing '{'");

    let style = comments().concat(rules());

    if (!close()) return error("@host missing '}'");

    return pos({
      type: "host",
      rules: style,
    });
  }

  /**
   * Parse media.
   */

  function atmedia() {
    let pos = position();
    let m = match(/^@media *([^{]+)/);

    if (!m) return;
    let media = trim(m[1]);

    if (!open()) return error("@media missing '{'");

    let style = comments().concat(rules());

    if (!close()) return error("@media missing '}'");

    return pos({
      type: "media",
      media: media,
      rules: style,
    });
  }

  /**
   * Parse custom-media.
   */

  function atcustommedia() {
    let pos = position();
    let m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
    if (!m) return;

    return pos({
      type: "custom-media",
      name: trim(m[1]),
      media: trim(m[2]),
    });
  }

  /**
   * Parse paged media.
   */

  function atpage() {
    let pos = position();
    let m = match(/^@page */);
    if (!m) return;

    let sel = selector() || [];

    if (!open()) return error("@page missing '{'");
    let decls = comments();

    // declarations
    let decl;
    while ((decl = declaration())) {
      decls.push(decl);
      decls = decls.concat(comments());
    }

    if (!close()) return error("@page missing '}'");

    return pos({
      type: "page",
      selectors: sel,
      declarations: decls,
    });
  }

  /**
   * Parse document.
   */

  function atdocument() {
    let pos = position();
    let m = match(/^@([-\w]+)?document *([^{]+)/);
    if (!m) return;

    let vendor = trim(m[1]);
    let doc = trim(m[2]);

    if (!open()) return error("@document missing '{'");

    let style = comments().concat(rules());

    if (!close()) return error("@document missing '}'");

    return pos({
      type: "document",
      document: doc,
      vendor: vendor,
      rules: style,
    });
  }

  /**
   * Parse font-face.
   */

  function atfontface() {
    let pos = position();
    let m = match(/^@font-face\s*/);
    if (!m) return;

    if (!open()) return error("@font-face missing '{'");
    let decls = comments();

    // declarations
    let decl;
    while ((decl = declaration())) {
      decls.push(decl);
      decls = decls.concat(comments());
    }

    if (!close()) return error("@font-face missing '}'");

    return pos({
      type: "font-face",
      declarations: decls,
    });
  }

  /**
   * Parse import
   */

  let atimport = _compileAtrule("import");

  /**
   * Parse charset
   */

  let atcharset = _compileAtrule("charset");

  /**
   * Parse namespace
   */

  let atnamespace = _compileAtrule("namespace");

  /**
   * Parse non-block at-rules
   */

  function _compileAtrule(name) {
    let re = new RegExp("^@" + name + "\\s*([^;]+);");
    return function () {
      let pos = position();
      let m = match(re);
      if (!m) return;
      let ret = { type: name };
      ret[name] = m[1].trim();
      return pos(ret);
    };
  }

  /**
   * Parse at rule.
   */

  function atrule() {
    if (css[0] != "@") return;

    return (
      atkeyframes() ||
      atmedia() ||
      atcustommedia() ||
      atsupports() ||
      atimport() ||
      atcharset() ||
      atnamespace() ||
      atdocument() ||
      atpage() ||
      athost() ||
      atfontface()
    );
  }

  /**
   * Parse rule.
   */

  function rule() {
    let pos = position();
    let sel = selector();

    if (!sel) return error("selector missing");
    comments();

    return pos({
      type: "rule",
      selectors: sel,
      declarations: declarations(),
    });
  }

  return addParent(stylesheet());
}

/**
 * Trim `str`.
 */

function trim(str) {
  return str ? str.replace(/^\s+|\s+$/g, "") : "";
}

/**
 * Adds non-enumerable parent node reference to each node.
 */

function addParent(obj, parent) {
  let isNode = obj && typeof obj.type === "string";
  let childParent = isNode ? obj : parent;

  for (var k in obj) {
    let value = obj[k];
    if (Array.isArray(value)) {
      value.forEach(function (v) {
        addParent(v, childParent);
      });
    } else if (value && typeof value === "object") {
      addParent(value, childParent);
    }
  }

  if (isNode) {
    Object.defineProperty(obj, "parent", {
      configurable: true,
      writable: true,
      enumerable: false,
      value: parent || null,
    });
  }

  return obj;
}

export default cssParse;
