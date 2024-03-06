import { FC, useCallback, useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useGetPatientsQuery } from '../../../redux/modules/patients/patientsSlice'
import { filtersSelectors } from '../../../redux/modules/filters/filtersSelectors'
import { useSelector } from '../../../redux/hooks'
import { useSortOnClick } from './useSortOnClick'

const sx = {
  table: { minWidth: 650 },
  tableCell: { width: 300 },
  tableRow: { '&:last-child td, &:last-child th': { border: 0 } },
}
const PatientTable: FC = () => {
  const selectedClinic = useSelector(filtersSelectors.getSelectedClinic)
  const order = useSelector(filtersSelectors.getOrder)
  const sort = useSelector(filtersSelectors.getSort)
  const { isLoading, data, error, isError } = useGetPatientsQuery(
    {
      clinicId: selectedClinic as number,
      order,
      sort: [sort],
    },
    { skip: !selectedClinic },
  )
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const closeSnackbar = useCallback(() => {
    setSnackbarOpen(false)
  }, [])
  useEffect(() => {
    if (isError) {
      setSnackbarOpen(true)
    }
  }, [isError])
  const onClickSortByFirstName = useSortOnClick({
    nextSort: 'first_name',
    order,
    sort,
    selectedClinic,
  })
  const onClickSortByLastName = useSortOnClick({
    nextSort: 'last_name',
    order,
    sort,
    selectedClinic,
  })
  const onClickSortByDateOfBirth = useSortOnClick({
    nextSort: 'date_of_birth',
    order,
    sort,
    selectedClinic,
  })
  return (
    <>
      {isLoading && <div>loading...</div>}
      <TableContainer component={Paper}>
        <Table sx={sx.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell onClick={onClickSortByFirstName}>
                first name {sort === 'first_name' ? (order === 'desc' ? 'v' : '^') : ''}
              </TableCell>
              <TableCell onClick={onClickSortByLastName}>
                last name {sort === 'last_name' ? (order === 'desc' ? 'v' : '^') : ''}
              </TableCell>
              <TableCell onClick={onClickSortByDateOfBirth}>
                dob {sort === 'date_of_birth' ? (order === 'desc' ? 'v' : '^') : ''}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(patient => (
              <TableRow key={patient.id} sx={sx.tableRow}>
                <TableCell component="th" scope="row" sx={sx.tableCell}>
                  {patient.first_name}
                </TableCell>
                <TableCell component="th" scope="row" sx={sx.tableCell}>
                  {patient.last_name}
                </TableCell>
                <TableCell sx={sx.tableCell}>{patient.date_of_birth}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={closeSnackbar}>
        <Alert severity="error" variant="filled">
          {error?.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default PatientTable
