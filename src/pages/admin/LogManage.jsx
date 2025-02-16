import React from 'react'
import TableUsers from '../../component/admin/TableUsers'

const LogManage = () => {
  return (
    <div>
       <header className='bg-white h-16 flex items-center px-6'>
       <h1 className="text-2xl !mx-3">จัดการผู้ใช้</h1>
      </header>
      <div className="!p-5">
      <TableUsers />
      </div>
     
    </div>
  )
}

export default LogManage
