import ProductList from '@/components/ProductList';
import React from 'react'

const productsPage = async  ({searchParams}) => {
  const params = await searchParams;
  const category = params?.category || 'all';
  return (
    <div>
      <ProductList category={category} params="products"/>
    </div>
  )
}

export default productsPage