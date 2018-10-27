import React from "react";
import { render } from "react-dom";
import { useMutationObserverOnce, useMutationObserver } from "./";

const config = { attributes: true };

function handleMutations(mutations) {
  if (!mutations) return;
  for (const { target } of mutations) {
    if (target.href) {
      return target.href;
    }
  }
}

function App() {
  let currentLink = useMutationObserver(
    document.getElementById("to-observe"),
    config,
    handleMutations
  );
  let firstLink = useMutationObserverOnce(
    document.getElementById("to-observe"),
    config,
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
