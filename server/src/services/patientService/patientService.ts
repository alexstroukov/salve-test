import fs from 'fs'
import path from 'path'
import { orderBy } from 'lodash'
import { promisify } from 'util'
import { Patient } from '../../models/Patient'
import { AbstractCsvService } from '../AbstractCsvService'

export type SortField = 'last_name' | 'last_name' | 'date_of_birth'
export type SortOrder = 'asc' | 'desc'

export class PatientService extends AbstractCsvService {
  fetchPatientsByClinicId = async ({
    clinicId,
    sort,
    order,
  }: {
    clinicId: number | string
    sort: SortField | SortField[]
    order: SortOrder
  }): Promise<Patient[]> => {
    const filePath = path.join(__dirname, '..', '..', '..', '/data', `/patients-${clinicId}.csv`)
    const csvData: string = await promisify(fs.readFile)(filePath, { encoding: 'utf-8' }).catch(
      (error: NodeJS.ErrnoException) => {
        if (error.code === 'ENOENT') {
          throw new Error('Invalid clinic_id')
        }
        throw error
      }
    )
    const headers = ['id', 'clinic_id', 'first_name', 'last_name', 'date_of_birth']
    const { records } = await this.promiseParse<Patient>(csvData, {
      delimiter: ',',
      from_line: 2,
      columns: headers,
      cast: (columnValue, context) => {
        if (context.column === 'id' || context.column === 'clinic_id') {
          return Number(columnValue)
        }
        return columnValue
      },
    })
    return orderBy(records, sort, order)
  }
}

export default new PatientService()
