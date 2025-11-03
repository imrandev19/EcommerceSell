'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Filter = () => {
     const searchParams = useSearchParams()
        const pathname = usePathname()
        const router = useRouter()
  return (
    <div className='flex items-center justify-end gap-2 text-sm text-gray-500 my-6'>
        <span>Sort by</span>
        <select className='ring-1 ring-gray-200 shadow-md p-1 rounded-sm' name="sort" id="sort">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
        
        </select>
    </div>
  )
}

export default Filter