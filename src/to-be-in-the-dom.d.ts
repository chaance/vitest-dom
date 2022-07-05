import type { MatcherResult } from "./types";

/** @deprecated */
export function toBeInTheDOM(
  element: Element,
  container?: HTMLElement | SVGElement
): MatcherResult;
