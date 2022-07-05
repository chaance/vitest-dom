function parse(code: string, options?: ParserOptions): Stylesheet;
export default parse;

export interface ParserOptions {
  /** Silently fail on parse errors */
  silent?: boolean | undefined;
  /** The path to the file containing css. Makes errors and source maps more helpful, by letting them know where code comes from. */
  source?: string | undefined;
}

export interface Stylesheet extends Node {
  stylesheet?: StyleRules | undefined;
}

interface Node {
  /** The possible values are the ones listed in the Types section on https://github.com/reworkcss/css page. */
  type?: string | undefined;
  /** A reference to the parent node, or null if the node has no parent. */
  parent?: Node | undefined;
  /** Information about the position in the source string that corresponds to the node. */
  position?:
    | {
        start?: Position | undefined;
        end?: Position | undefined;
        /** The value of options.source if passed to css.parse. Otherwise undefined. */
        source?: string | undefined;
        /** The full source string passed to css.parse. */
        content?: string | undefined;
      }
    | undefined;
}

interface Position {
  line?: number | undefined;
  column?: number | undefined;
}
