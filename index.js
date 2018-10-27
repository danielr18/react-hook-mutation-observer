"use strict";
let { useState, useEffect, useMemo } = require("react");

const defaultCallback = mutationList => mutationList;

function useMutationObserver(targetNode, config, callback = defaultCallback) {
  const [value, setValue] = useState(undefined);
  const observer = useMemo(
    () =>
      new MutationObserver((mutationList, observer) => {
        const result = callback(mutationList, observer);
        setValue(result);
      }),
    [callback]
  );
  useEffect(
    () => {
      if (targetNode) {
        observer.observe(targetNode, config);
        return () => {
          observer.disconnect();
        };
      }
    },
    [targetNode, config]
  );

  return value;
}

function useMutationObserverOnce(targetNode, config, callback) {
  const [isObserving, setObserving] = useState(true);
  const node = isObserving ? targetNode : null;
  const value = useMutationObserver(node, config, callback);
  if (value !== undefined && isObserving) {
    setObserving(false);
  }
  return value;
}

module.exports.useMutationObserver = useMutationObserver;
module.exports.useMutationObserverOnce = useMutationObserverOnce;
