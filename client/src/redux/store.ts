import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore, REHYDRATE, PERSIST } from 'redux-persist'
import { combineReducers } from 'redux'
import { patientsSlice } from './modules/patients/patientsSlice'
import { clinicSlice } from './modules/clinics/clinicsSlice'
import { filtersSlice } from './modules/filters/filtersSlice'
import persistConfig from './persistConfig'

const reducers = {
  [clinicSlice.reducerPath]: clinicSlice.reducer,
  [patientsSlice.reducerPath]: patientsSlice.reducer,
  [filtersSlice.name]: filtersSlice.reducer,
}

const persistedReducer = persistReducer(persistConfig, combineReducers(reducers))

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PERSIST],
      },
    }).concat([patientsSlice.middleware, clinicSlice.middleware])
  },
})

export const persistor = persistStore(store, {}, () => {
  persistor.persist()
  store.dispatch({ type: 'persist/REHYDRATE_COMPLETE' })
})
