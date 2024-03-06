import { createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import migrations from './migrations'

const config = {
  key: 'root',
  storage,
  migrate: createMigrate(migrations, { debug: false }),
  version: 0,
}

export default config
