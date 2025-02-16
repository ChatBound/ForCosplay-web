// rafce
import React, { useState, useEffect } from 'react'
import { createCategory, listCategory, removeCategory } from '../../api/Category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'



const FormCategory = () => {
    // Javascript
    const token = useEcomStore((state) => state.token)
    const [name, setName] = useState('')
    // const [categories, setCategories] = useState([])
    const categories = useEcomStore((state)=>state.categories)
    const getCategory = useEcomStore((state)=>state.getCategory)
    useEffect(() => {
        getCategory(token)
    }, [])

    const handleSubmit = async (e) => {
        // code
        e.preventDefault()
        if (!name) {
            return toast.warning('Please fill data')
        }
        try {
            const res = await createCategory(token, { name })
            console.log(res.data.name)
            toast.success(`Add Category ${res.data.name} success!!!`)
            getCategory(token)
        } catch (err) {
            console.log(err)
        }
    }
    const handleRemove = async(id)=>{
        console.log(id)
        try{
            const res = await removeCategory(token,id)
            console.log(res)
            toast.success(`Deleted ${res.data.name} success`)
            getCategory(token)
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div className="container !mx-auto !p-6 bg-white shadow-lg rounded-lg">
    
        
        {/* Form Section */}
        <form className="flex space-x-4 !mb-6" onSubmit={handleSubmit}>
            <input
                onChange={(e) => setName(e.target.value)}
                className="flex-grow !px-4 !py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="กรอกชื่อหมวดหมู่"
            />
            <button
                type="submit"
                className="!px-6 !py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            >
                เพิ่มหมวดหมู่
            </button>
        </form>
    
        <hr className="border-t border-gray-200 !my-4" />
    
        {/* Category List */}
        <ul className="space-y-3">
            {categories.map((item, index) => (
                <li
                    className="flex justify-between items-center !px-4 !py-2 bg-gray-50 rounded-md shadow-sm"
                    key={index}
                >
                    <span className="text-gray-700 font-medium">{item.name}</span>
                    <button
                        onClick={() => handleRemove(item.id)}
                        className="!px-4 !py-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
                    >
                        ลบ
                    </button>
                </li>
            ))}
        </ul>
    </div>
    )
}

export default FormCategory