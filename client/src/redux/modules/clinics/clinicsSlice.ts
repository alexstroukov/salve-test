import { createApi } from '@reduxjs/toolkit/query/react'
import { Clinic } from '../../../models/Clinic'
import { clinicService } from '../../../services/clinicService'
import baseQuery from '../baseQuery'

export const clinicSlice = createApi({
  reducerPath: 'clinics',
  baseQuery,
  endpoints: builder => ({
    getClinics: builder.query<Clinic[], void>({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        return baseQuery(() => clinicService.fetchAllClinics())
      },
    }),
  }),
})

export const { usePrefetch: userPrefetchClinics, useGetClinicsQuery } = clinicSlice
