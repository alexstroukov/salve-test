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
import { filtersSlice } from '../../../redux/modules/filters/filtersSlice'
import { filtersSelectors } from '../../../redux/modules/filters/filtersSelectors'
import { useDispatch, useSelector } from '../../../redux/hooks'
import { patientsSlice } from '../../../redux/modules/patients/patientsSlice'
import useCallbackDebounced from '../../../hooks/useCallbackDebounced'
import { SortField, SortOrder } from '../../../services/patientService'

const useSort = ({
  nextSort,
  order,
  sort,
  selectedClinic,
}: {
  nextSort: SortField
  order: SortOrder
  sort: SortField
  selectedClinic: number | undefined
}) => {
  const dispatch = useDispatch()
  const onClick = useCallbackDebounced(() => {
    let nextOrder = order
    if (sort === nextSort) {
      nextOrder = order === 'asc' ? 'desc' : 'asc'
      dispatch(filtersSlice.actions.setOrder(nextOrder))
    }
    dispatch(filtersSlice.actions.setSort(nextSort))
    if (!selectedClinic) {
      return
    }
    dispatch(
      patientsSlice.endpoints.getPatients.initiate({
        clinicId: selectedClinic,
        order: nextOrder,
        sort: [nextSort],
      }),
    )
  }, [dispatch, nextSort, order, selectedClinic, sort])
  return onClick
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
  const onClickSortByFirstName = useSort({ nextSort: 'first_name', order, sort, selectedClinic })
  const onClickSortByLastName = useSort({ nextSort: 'last_name', order, sort, selectedClinic })
  const onClickSortByDateOfBirth = useSort({
    nextSort: 'date_of_birth',
    order,
    sort,
    selectedClinic,
  })
  return (
    <>
      {isLoading && <div>loading...</div>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell onClick={onClickSortByFirstName}>
                first name {sort === 'first_name' ? (order === 'desc' ? '^' : 'v') : ''}
              </TableCell>
              <TableCell onClick={onClickSortByLastName}>
                last name {sort === 'last_name' ? (order === 'desc' ? '^' : 'v') : ''}
              </TableCell>
              <TableCell onClick={onClickSortByDateOfBirth}>
                dob {sort === 'date_of_birth' ? (order === 'desc' ? '^' : 'v') : ''}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(patient => (
              <TableRow key={patient.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ width: 300 }}>
                  {patient.first_name}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ width: 300 }}>
                  {patient.last_name}
                </TableCell>
                <TableCell sx={{ width: 300 }}>{patient.date_of_birth}</TableCell>
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
