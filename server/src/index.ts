import express, { Request, Response } from 'express'
import cors from 'cors'
import * as yup from 'yup'
import { clinicService } from './services/clinicService'
import { SortField, SortOrder, patientService } from './services/patientService'

const app = express()
const PORT = 8000
app.use(cors())
app.get('/clinics', async (req: Request, res: Response) => {
  try {
    const clinics = await clinicService.fetchAllClinics().catch((error: Error) => {
      throw new Error('Something went wrong when fetching clinics. Please try again later')
    })
    res.json(clinics)
  } catch (error) {
    res.status(500)
    res.send((error as Error).message)
  }
})

app.get('/clinics/:clinicId/patients', async (req: Request, res: Response) => {
  try {
    const clinicId = req.params.clinicId
    const querySchema = yup.object({
      sort: yup.lazy(val =>
        Array.isArray(val)
          ? yup
              .array()
              .of(yup.string().oneOf(['first_name', 'last_name', 'date_of_birth'] as const))
              .defined()
          : yup
              .string()
              .oneOf(['first_name', 'last_name', 'date_of_birth'] as const)
              .defined()
      ),
      order: yup.string().oneOf(['asc', 'desc'] as const),
    })
    await querySchema.validate(req.query)
    const { sort = 'last_name', order = 'desc' } = req.query as {
      sort: SortField | SortField[]
      order: SortOrder
    }
    const patients = await patientService
      .fetchPatientsByClinicId({
        clinicId,
        sort,
        order,
      })
      .catch((error: Error) => {
        if (error.message !== 'Invalid clinic_id') {
          throw new Error('Something went wrong when fetching patients. Please try again later')
        }
        throw error
      })
    res.json(patients)
  } catch (error) {
    res.status(500)
    res.send((error as Error).message)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
