import React from "react";
import { render } from "react-dom";
import { useMutationObserverOnce, useMutationObserver } from "./";

function handleMutations(mutations) {
  if (!mutations) return;
  for (const { target } of mutations) {
    if (target.href) {
      return target.href;
    }
  }
}

function App() {
  let { value: currentLink } = useMutationObserver(
    document.getElementById("to-observe"),
    { attributes: true },
    handleMutations
  );
  let firstLink = useMutationObserverOnce(
    document.getElementById("to-observe"),
    { attributes: true },
    handleMutations
  );
  return (
    <div>
      <p>Current Link goes to: {currentLink}</p>
      <p>First Link went to: {firstLink}</p>
    </div>
  );
}

render(<App />, window.root);
