import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import SuspensePanel from '../components/atoms/SuspensePanel'
import { store, persistor } from './store'

const ReduxProvider = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <Provider store={store}>
      <PersistGate loading={<SuspensePanel />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider
