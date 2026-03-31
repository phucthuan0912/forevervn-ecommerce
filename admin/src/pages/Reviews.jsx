import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../config'
import { toast } from 'react-toastify'
import { Trash2, Star, User, Package, Calendar } from 'lucide-react'

const Reviews = ({ token }) => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchList = async () => {
        try {
            setLoading(true)
            const response = await axios.get(backendUrl + "/api/review-user/list")
            if (response.data.success) {
                setList(response.data.reviews)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const deleteReview = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xoá đánh giá này vĩnh viễn không?")) return;
        try {
            const response = await axios.post(backendUrl + '/api/review-user/delete', { id }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                fetchList()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div className='p-4 sm:p-8'>
            <div className='mb-6'>
                <h2 className='text-3xl font-bold text-gray-800'>Quản lý Đánh giá</h2>
                <p className='text-gray-500 mt-2'>Xem và kiểm soát phản hồi từ khách hàng.</p>
            </div>

            {loading ? (
                <div className='flex justify-center items-center h-64'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-black'></div>
                </div>
            ) : (
                <div className='grid grid-cols-1 gap-6'>
                    {list.length === 0 ? (
                        <div className='bg-white p-12 text-center rounded-xl border border-gray-100'>
                            <p className='text-gray-400'>Chưa có đánh giá nào.</p>
                        </div>
                    ) : (
                        list.map((item, index) => (
                            <div key={index} className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row'>
                                {/* User Info & Rating */}
                                <div className='p-6 md:w-1/4 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center justify-center text-center'>
                                    <div className='w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3'>
                                        <User size={30} className='text-gray-400' />
                                    </div>
                                    <h3 className='font-bold text-gray-800 text-lg'>{item.userName}</h3>
                                    <div className='flex items-center gap-1 mt-2'>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill={i < item.rating ? "#fbbf24" : "none"} stroke={i < item.rating ? "#fbbf24" : "#d1d5db"} />
                                        ))}
                                    </div>
                                    <div className='flex items-center gap-2 text-xs text-gray-400 mt-4'>
                                        <Calendar size={14} />
                                        {new Date(item.date).toLocaleDateString()}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className='p-6 flex-1'>
                                    <div className='flex justify-between items-start mb-4'>
                                        <div className='flex items-center gap-2 text-gray-500 text-sm'>
                                            <Package size={16} />
                                            <span>Sản phẩm ID: <code className='bg-gray-50 px-2 py-0.5 rounded'>{item.productId}</code></span>
                                        </div>
                                        <button 
                                            onClick={() => deleteReview(item._id)}
                                            className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1'
                                            title='Xoá đánh giá'
                                        >
                                            <Trash2 size={20} />
                                            <span className='text-sm font-medium'>Xoá</span>
                                        </button>
                                    </div>

                                    <p className='text-gray-700 leading-relaxed mb-6 italic'>"{item.comment}"</p>

                                    {item.images && item.images.length > 0 && (
                                        <div className='flex gap-4 overflow-x-auto pb-2'>
                                            {item.images.map((img, i) => (
                                                <img key={i} className='w-24 h-24 object-cover rounded-lg border border-gray-100' src={img} alt="" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default Reviews
