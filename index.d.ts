interface MutationObserverHook<T> {
  value: T,
  isObserving: boolean,
  observe: () => undefined,
  disconnect: () => undefined,
}

export function useMutationObserver<T>(
  targetNode: Node,
  config: MutationObserverInit,
  callback: (mutationList: [MutationRecord], observer: MutationObserver) => T
): MutationObserverHook<T>;

export function useMutationObserverOnce<T>(
  targetNode: Node,
  config: MutationObserverInit,
  callback: (mutationList: [MutationRecord], observer: MutationObserver) => T
): T;
