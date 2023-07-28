import '@/styles/globals.css';
import { FirebaseProvider } from '@/firebase/firebase';
import { ContextProvider } from '@/Context/context';
export default function App({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <ContextProvider>
      <Component {...pageProps} />
      </ContextProvider>
    </FirebaseProvider>
  )
}
