import React from 'react'
import FormCategory from '../../component/admin/FormCategory'

const CategoryAdmin = () => {
  return (
    
    
    <div>
          <header className='bg-white h-16 flex items-center px-6'>
       <h1 className="text-2xl !mx-3">จัดการหมวดหมู่</h1>
      </header>
      <div className="!p-5">
      <FormCategory />
      </div>
    </div>
  )
}

export default CategoryAdmin
