import { ThunkAction, Action } from '@reduxjs/toolkit'
import { RootState } from './RootState'

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
