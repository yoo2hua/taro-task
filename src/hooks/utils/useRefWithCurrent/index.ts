import { useRef } from 'react'

export function useRefWithCurrent<T>(initialValue: T): React.MutableRefObject<T> {
  const ref = useRef(initialValue)
  const getRef = () => ref.current
  const setRef = (value: T) => {
    ref.current = value
  }
  return Object.defineProperty(ref, 'current', {
    get: getRef,
    set: setRef,
  })
}
