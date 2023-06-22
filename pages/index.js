import React from 'react'
import { Navbar } from './components/Navbar';
import { Cover } from './components/Cover';
import { Categories } from './components/Categories';
import { Deals } from './components/Deals';
import { Brands } from './components/Brands';
import { Offs } from './components/Offs';
import { Popular } from './components/Popular';
import { CashBack } from './components/CashBack';
import { TodayDeals } from './components/TodayDeals';
import { MostSelling } from './components/MostSelling';
import { Trending } from './components/Trending';
import { SellingStore } from './components/SellingStore';
import { Service } from './components/Service';
import { Footer } from './components/Footer';

const index = () => {
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