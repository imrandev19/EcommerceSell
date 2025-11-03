import ProductList from '@/components/ProductList';
import React from 'react'

const productsPage = ({searchParams}) => {
  const category = searchParams?.category || "all";
  return (
    <div>
      <ProductList category={category} params="products"/>
    </div>
  )
}

export default productsPage