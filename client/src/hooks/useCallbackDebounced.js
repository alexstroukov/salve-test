import { useRef, useCallback } from 'react'

// leading debounce - callback is called immediately and then a delay is applied afterwards to prevent spam
const useCallbackDebounced = (fn, deps, delay = 300) => {
  const timerRef = useRef()
  return useCallback((...args) => {
    if (!timerRef.current) {
      fn(...args)
    }
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      timerRef.current = undefined
    }, delay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useCallbackDebounced
