import React from 'react'
import Dashboard from '../../component/user/Dashboard'

const DashboardStore = () => {
  return (
    <div>
       <header className='bg-white h-16 flex items-center px-6'>
       <h1 className="text-2xl !mx-3">ภาพรวมร้านค้า</h1>
      </header>
      <div className="!p-5">
        <Dashboard/>
      </div>
     
    </div>
  )
}

export default DashboardStore
