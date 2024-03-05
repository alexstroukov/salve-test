import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { Clinic } from '../../models/Clinic'
import { AbstractCsvService } from '../AbstractCsvService'

export class ClinicService extends AbstractCsvService {
  fetchAllClinics = async (): Promise<Clinic[]> => {
    const filePath = path.join(__dirname, '..', '..', '..', '/data', '/clinics.csv')
    const csvData: string = await promisify(fs.readFile)(filePath, { encoding: 'utf-8' })
    const headers = ['id', 'name']
    const { records } = await this.promiseParse<Clinic>(csvData, {
      delimiter: ',',
      from_line: 2,
      columns: headers,
      cast: (columnValue, context) => {
        if (context.column === 'id') {
          return Number(columnValue)
        }
        return columnValue
      },
    })
    return records
  }
}

export default new ClinicService()
