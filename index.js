"use strict";
let { useState, useEffect, useMemo } = require("react");

function useMutationObserver(targetNode, config, callback) {
  const [value, setValue] = useState(undefined);
  const [isObserving, setObserving] = useState(true);

  function createObserver(callback) {
    return new MutationObserver((mutationList, observer) => {
      const result = callback(mutationList, observer);
      setValue(result);
    });
  }

  const observer = useMemo(() => createObserver(callback), [callback]);
  useEffect(() => {
    if (isObserving) {
      observer.observe(targetNode, config);
      return () => {
        observer.disconnect();
      };
    }
  });

  return {
    value,
    isObserving,
    observe: () => {
      setObserving(true);
    },
    disconnect: () => {
      setObserving(false);
    }
  };
}

function useMutationObserverOnce(targetNode, config, callback) {
  const { value, isObserving, disconnect } = useMutationObserver(
    targetNode,
    config,
    callback
  );
  if (value !== undefined && isObserving) {
    disconnect();
  }
  return value;
}

module.exports.useMutationObserver = useMutationObserver;
module.exports.useMutationObserverOnce = useMutationObserverOnce;
