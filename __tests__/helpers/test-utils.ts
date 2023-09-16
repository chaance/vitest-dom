import document from "./document";

function render(html: string) {
  const container = document.createElement("div");
  container.innerHTML = html;

  function queryByTestId<E extends Element = Element>(
    testId: string,
  ): E | null {
    return container.querySelector(`[data-testid="${testId}"]`);
  }

  // asFragment has been stolen from react-testing-library
  function asFragment() {
    return document.createRange().createContextualFragment(container.innerHTML);
  }

  // Some tests need to look up global ids with document.getElementById()
  // so we need to be inside an actual document.
  document.body.innerHTML = "";
  document.body.appendChild(container);

  return { container, queryByTestId, asFragment };
}

export { render };
