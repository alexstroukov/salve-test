import { FC, useCallback, useEffect, useState, memo } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useGetClinicsQuery } from '../../../redux/modules/clinics/clinicsSlice'
import { filtersSlice } from '../../../redux/modules/filters/filtersSlice'
import { filtersSelectors } from '../../../redux/modules/filters/filtersSelectors'
import { useDispatch, useSelector } from '../../../redux/hooks'
import { patientsSlice } from '../../../redux/modules/patients/patientsSlice'

const sx = {
  formControl: { m: 1, minWidth: 120 },
}

const ClinicPicker: FC = () => {
  const dispatch = useDispatch()
  const { isLoading, data, error, isError } = useGetClinicsQuery()
  const selectedClinic = useSelector(filtersSelectors.getSelectedClinic)
  const order = useSelector(filtersSelectors.getOrder)
  const sort = useSelector(filtersSelectors.getSort)
  const [open, setOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const handleChange = useCallback(
    (event: SelectChangeEvent<number>) => {
      const clinicId = Number(event.target.value)
      dispatch(filtersSlice.actions.setClinic(clinicId))
      dispatch(
        patientsSlice.endpoints.getPatients.initiate({ clinicId: clinicId, order, sort: [sort] }),
      )
    },
    [dispatch, order, sort],
  )
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])
  const closeSnackbar = useCallback(() => {
    setSnackbarOpen(false)
  }, [])
  useEffect(() => {
    if (isError) {
      setSnackbarOpen(true)
    }
  }, [isError])
  return (
    <div>
      <FormControl sx={sx.formControl}>
        <InputLabel id="controlled-open-select-label">
          {isLoading ? 'Loading...' : 'Clinics'}
        </InputLabel>
        <Select
          labelId="controlled-open-select-label"
          id="controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectedClinic}
          label={isLoading ? 'Loading...' : 'Clinics'}
          onChange={handleChange}
        >
          {data?.map(clinic => {
            return (
              <MenuItem key={clinic.id} value={clinic.id}>
                {clinic.name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={closeSnackbar}>
        <Alert severity="error" variant="filled">
          {error?.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default memo(ClinicPicker)
