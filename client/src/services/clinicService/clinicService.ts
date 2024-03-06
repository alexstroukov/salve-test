import { Clinic } from '../../models/Clinic'

class UserService {
  fetchAllClinics = async (): Promise<Clinic[]> => {
    const res = await fetch('http://localhost:8000/clinics')
    const clinics: Clinic[] = await res.json()
    return clinics
  }
}

export default new UserService()
