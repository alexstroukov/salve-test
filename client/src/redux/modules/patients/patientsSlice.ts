import { createApi } from '@reduxjs/toolkit/query/react'
import { Patient } from '../../../models/Patient'
import { SortField, SortOrder, patientService } from '../../../services/patientService'
import baseQuery from '../baseQuery'

export const patientsSlice = createApi({
  reducerPath: 'patients',
  baseQuery,
  endpoints: builder => ({
    getPatients: builder.query<
      Patient[],
      { clinicId: string | number; sort: SortField[]; order: SortOrder }
    >({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        return baseQuery(() => patientService.fetchPatientsByClinic(args))
      },
    }),
  }),
})

export const { useGetPatientsQuery } = patientsSlice
