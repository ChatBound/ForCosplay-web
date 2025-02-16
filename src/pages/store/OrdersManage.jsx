
import React from 'react'
import OrderManagement from '../../component/user/OrderManagement'

const OrdersManage = () => {
  return (
    <div>
      <header className='bg-white h-16 flex items-center px-6'>
        <h1 className="text-2xl !mx-3">การสั่งซื้อ</h1>
      </header>
      <div className="!p-5">
        <OrderManagement />
      </div>
    </div>
  )
}

export default OrdersManage
