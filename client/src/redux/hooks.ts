import {
  TypedUseSelectorHook,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux'
import type { AppDispatch } from './types/AppDispatch'
import type { RootState } from './types/RootState'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => useDispatchBase<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase
