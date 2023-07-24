import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Cover } from '../components/Cover';
import { Categories } from '../components/Categories';
import { Deals } from '../components/Deals';
import { Brands } from '@/components/Brands';
import { Offs } from '../components/Offs';
import { Popular } from '../components/Popular';
import { CashBack } from '../components/CashBack';
import { TodayDeals } from '../components/TodayDeals';
import { MostSelling } from '../components/MostSelling';
import { Trending } from '../components/Trending';
import { SellingStore } from '../components/SellingStore';
import { Service } from '../components/Service';
import { Footer } from '../components/Footer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useFirebase } from '@/firebase/firebase';
import { Loader } from '@/components/Loader';

const index = () => {
  const auth = getAuth();
  const fb = useFirebase()
  const { getCurrentUser, userCollection, currentUser, getCartSize } = fb;

  useEffect(()=>{
    getCurrentUser();
    userCollection();
    getCartSize()
  },[currentUser])

  return (
    <>
    <Navbar/>
    <Cover/>
    <Categories/>
    <Deals/>
    <Brands/>
    <Offs/>
    <Popular/>
    <CashBack/>
    <TodayDeals/>
    <MostSelling/>
    <Trending/>
    <SellingStore/>
    <Service/>
    <Footer/>
    </>
  )
}

export default index;