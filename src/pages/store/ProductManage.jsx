import React from 'react'
import ProductTable from '../../component/user/ProductTable'
import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

const ProductManage = () => {
  return (
    <div>
      <header className='bg-white h-16 flex items-center px-6'>
      <h1 className="text-2xl !mx-3">สินค้าของคุณ</h1>
      </header>
      <div className="!p-5">
        <div>
          <Link to={'add-product-manage'} > 
              <Button type='submit' className="bg-blue-500 text-white !px-5 !my-2 !py-3  active:bg-gray-700"> + เพิ่มสินค้าใหม่ </Button>
          </Link>
        </div>
        <ProductTable />
      </div>
    </div>
  )
}

export default ProductManage
