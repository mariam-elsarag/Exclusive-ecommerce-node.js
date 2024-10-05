import React from 'react'
import Button from '../../ui/Button'
import ProductItem from '../product/ProductItem'

const Wishlist = () => {
  return (
    <div className='Container my-8'>
      {/* header */}
      <header className='flex flex-col items-start gap-4 sm:flex-row sm:items-center justify-between'>
        <h1 className='font-normal text-[20px]' >Wishlist <span>(4)</span> </h1>
     <Button type='outline'>Move All To Bag</Button>
      </header>
      {/* body */}
      <div>
     
      </div>
    </div>
  )
}

export default Wishlist
