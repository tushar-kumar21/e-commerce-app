import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Product from './Product';

const product_slug = () => {

    const router = useRouter();
    const { product_slug } = router.query;
    let id = product_slug;

    useEffect(()=>{
    },[])

  return (
    <Product id={id}/>
  )
}

export default product_slug;  