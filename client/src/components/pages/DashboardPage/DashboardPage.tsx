import { FC } from 'react'
import Box from '@mui/material/Box'
import { userPrefetchClinics } from '../../../redux/modules/clinics/clinicsSlice'
import ClinicPicker from './ClinicPicker'
import PatientTable from './PatientTable'

const DashboardPage: FC = () => {
  userPrefetchClinics('getClinics', { force: true })
  return (
    <Box>
      <ClinicPicker />
      <PatientTable />
    </Box>
  )
}

export default DashboardPage
