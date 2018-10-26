# `@rehooks/mutation-observer`

> React hook for [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

> **Note:** This is using the new [React Hooks API Proposal](https://reactjs.org/docs/hooks-intro.html)
> which is subject to change until React 16.7 final.
>
> You'll need to install `react`, `react-dom`, etc at `^16.7.0-alpha.0`

## Install

```sh
yarn add @rehooks/mutation-observer
```

## Usage

```js
import { useMutationObserver, useMutationObserverOnce } from "@rehooks/mutation-observer";

function handleMutations(mutations) {
  /**
   * The return value of this function will be:
   * - value property in the object returned by useMutationObserver hook.
   * - return value of useMutationObserverOnce hook.
   */

  if (!mutations) return;
  for (const { target } of mutations) {
    if (target.href) {
      return target.href;
    }
  }
}

function MyComponent() {
  let { value: currentValue } = useMutationObserver(
    document.getElementById("to-observe"),
    { attributes: true },
    handleMutations
  );

  let firstValue = useMutationObserverOnce(
    document.getElementById("to-observe"),
    { attributes: true },
    handleMutations
  );

  return (
    <div>
      <p>First Value: {firstValue}</p>
      <p>Current Value: {currentValue}</p>
    </div>
  );
}
```
