import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SortField, SortOrder } from '../../../services/patientService'

export interface FiltersState {
  clinic?: number
  sort: SortField
  order: SortOrder
}

const initialState: FiltersState = {
  clinic: undefined,
  sort: 'date_of_birth',
  order: 'desc',
}
export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setClinic(state, action: PayloadAction<number>) {
      state.clinic = action.payload
    },
    setSort(state, action: PayloadAction<SortField>) {
      state.sort = action.payload
    },
    setOrder(state, action: PayloadAction<SortOrder>) {
      state.order = action.payload
    },
  },
})
