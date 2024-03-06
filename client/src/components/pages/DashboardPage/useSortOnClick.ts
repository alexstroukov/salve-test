import { filtersSlice } from '../../../redux/modules/filters/filtersSlice'
import { useDispatch } from '../../../redux/hooks'
import { patientsSlice } from '../../../redux/modules/patients/patientsSlice'
import useCallbackDebounced from '../../../hooks/useCallbackDebounced'
import { SortField, SortOrder } from '../../../services/patientService'

export const useSortOnClick = ({
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
  const onClick = useCallbackDebounced(
    (e: MouseEvent) => {
      e.stopPropagation()
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
    },
    [dispatch, nextSort, order, selectedClinic, sort],
  )
  return onClick
}
