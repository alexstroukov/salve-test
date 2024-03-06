import { RootState } from '../../types/RootState'

export class FiltersSelectors {
  getSelectedClinic = (state: RootState) => state.filters.clinic
  getSort = (state: RootState) => state.filters.sort
  getOrder = (state: RootState) => state.filters.order
}

const filtersSelectors = new FiltersSelectors()
export { filtersSelectors }
