import ProductList from '@/components/ProductList'
import Image from 'next/image'
import React from 'react'

export default  function page({searchParams}) {
    const category = searchParams?.category || "all";
  return (
  
    <div className='font-poppins '>
      <div className='relative aspect-[3/1] mb-12'>
        <Image src="/featured.png" alt="banner" fill />
      </div>
      <ProductList category={category} params="homepage"/>
    </div>
  )
}
