import { Patient } from '../../models/Patient'

export type SortField = 'first_name' | 'last_name' | 'date_of_birth'
export type SortOrder = 'asc' | 'desc'

class PatientService {
  fetchPatientsByClinic = async ({
    clinicId,
    sort = ['last_name'],
    order = 'desc',
  }: {
    clinicId: string | number
    sort: SortField[]
    order: SortOrder
  }): Promise<Patient[]> => {
    const query = new URLSearchParams({
      order,
    })
    for (const sortField of sort) {
      query.append('sort', sortField)
    }
    const res = await fetch(
      `http://localhost:8000/clinics/${clinicId}/patients?${query.toString()}`,
    )
    const patients: Patient[] = await res.json()
    return patients
  }
}

export default new PatientService()
