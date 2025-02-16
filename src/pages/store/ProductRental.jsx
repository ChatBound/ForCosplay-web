import React from 'react'
import RentalTracking from '../../component/user/RentalTracking'

const ProductRental = () => {
  return (
    <div>
        <header className='bg-white h-16 flex items-center px-6'>
      <h1 className="text-2xl !mx-3">ติดตามการเช่าสินค้า</h1>
      </header>

      <div className="!p-5">
        <RentalTracking />
      </div>
      
    </div>
  )
}

export default ProductRental
