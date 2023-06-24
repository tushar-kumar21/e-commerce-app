import '@/styles/globals.css';
import '../styles/navbar.scss'
import '../styles/cover.scss'
import '../styles/categories.scss'
import '../styles/deals.scss'
import '../styles/brands.scss'
import '../styles/offs.scss'
import '../styles/cashback.scss'
import '../styles/todaysdeals.scss'
import '../styles/trending.scss'
import '../styles/sellingstore.scss'
import '../styles/services.scss'
import '../styles/footer.scss'
import '../styles/cart.scss'
import { FirebaseProvider } from '@/firebase/firebase';
export default function App({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  )
}
