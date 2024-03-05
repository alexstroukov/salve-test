import { parse, Options, Info } from 'csv-parse'

export abstract class AbstractCsvService {
  protected promiseParse = <T>(
    input: string,
    options: Options
  ): Promise<{ records: T[]; info: Info }> => {
    return new Promise((resolve, reject): void => {
      parse(input, options, (err, records: T[], info): void => {
        if (err) reject(err)
        else resolve({ records, info })
      })
    })
  }
}
