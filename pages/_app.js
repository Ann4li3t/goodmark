import { StateProvider } from 'context/stateContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  )
}

export default MyApp
