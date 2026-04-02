import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { backendUrl } from '../config'
import { toast } from 'react-toastify'
import { Trash2, Star, User, Package, Calendar, Search, Filter, Reply, X, MessageSquare, Clock } from 'lucide-react'

const Reviews = ({ token }) => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [dateFilter, setDateFilter] = useState('all') // all, today, week
    const [sortOrder, setSortOrder] = useState('newest') // newest, oldest
    
    // Reply State
    const [replyingId, setReplyingId] = useState(null)
    const [replyText, setReplyText] = useState('')

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

    const submitReply = async (id) => {
        if (!replyText.trim()) return;
        try {
            const response = await axios.post(backendUrl + '/api/review-user/reply', { id, reply: replyText }, { headers: { token } })
            if (response.data.success) {
                toast.success("Đã gửi phản hồi thành công!")
                setReplyingId(null)
                setReplyText('')
                fetchList()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Lỗi phản hồi!")
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    const filteredList = useMemo(() => {
        let result = [...list];

        // 1. Search Filter (Product Name or UserName or Comment)
        if (searchTerm.trim()) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(item => 
                (item.productId?.name || '').toLowerCase().includes(lowerSearch) ||
                (item.userName || '').toLowerCase().includes(lowerSearch) ||
                (item.comment || '').toLowerCase().includes(lowerSearch)
            );
        }

        // 2. Date Filter
        const now = Date.now();
        if (dateFilter === 'today') {
            result = result.filter(item => (now - item.date) <= 24 * 60 * 60 * 1000);
        } else if (dateFilter === 'week') {
            result = result.filter(item => (now - item.date) <= 7 * 24 * 60 * 60 * 1000);
        }

        // 3. Sorting
        result.sort((a, b) => {
            if (sortOrder === 'newest') return b.date - a.date;
            return a.date - b.date;
        });

        return result;
    }, [list, searchTerm, dateFilter, sortOrder]);

    const getSafeImage = (img) => {
        if (Array.isArray(img)) return img[0];
        return img;
    };

    return (
        <div className='p-4 sm:p-8 bg-slate-50 min-h-screen'>
            {/* Header section */}
            <div className='mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4'>
                <div>
                    <h2 className='text-4xl font-black text-slate-900 tracking-tight'>Đánh giá khách hàng</h2>
                    <p className='text-slate-500 mt-2 font-medium'>Xây dựng uy tín bằng cách phản hồi chân thành.</p>
                </div>
                <div className='flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm'>
                    <MessageSquare className='text-indigo-500' size={20} />
                    <span className='text-slate-700 font-bold'>{filteredList.length} <span className='text-slate-400 font-medium'>Kết quả</span></span>
                </div>
            </div>

            {/* Filters bar */}
            <div className='mb-8 flex flex-wrap items-center gap-4'>
                <div className='relative flex-1 min-w-[280px]'>
                    <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' size={18} />
                    <input 
                        type="text" 
                        placeholder="Tìm theo tên sản phẩm, khách hàng..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm font-medium'
                    />
                </div>

                <div className='flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm'>
                    <div className='flex items-center gap-2 px-3 text-slate-400'>
                        <Filter size={16} />
                        <span className='text-xs font-bold uppercase tracking-wider'>Lọc:</span>
                    </div>
                    <select 
                        value={dateFilter} 
                        onChange={(e) => setDateFilter(e.target.value)}
                        className='bg-slate-50 text-slate-700 text-sm font-bold py-2 px-4 rounded-xl border-none outline-none cursor-pointer hover:bg-slate-100 transition-colors'
                    >
                        <option value="all">Tất cả thời gian</option>
                        <option value="today">Hôm nay</option>
                        <option value="week">7 ngày qua</option>
                    </select>
                </div>

                <div className='flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm'>
                    <div className='flex items-center gap-2 px-3 text-slate-400'>
                        <Clock size={16} />
                        <span className='text-xs font-bold uppercase tracking-wider'>Xếp:</span>
                    </div>
                    <select 
                        value={sortOrder} 
                        onChange={(e) => setSortOrder(e.target.value)}
                        className='bg-slate-50 text-slate-700 text-sm font-bold py-2 px-4 rounded-xl border-none outline-none cursor-pointer hover:bg-slate-100 transition-colors'
                    >
                        <option value="newest">Mới nhất</option>
                        <option value="oldest">Cũ nhất</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className='flex justify-center items-center h-64'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
                </div>
            ) : (
                <div className='space-y-6'>
                    {filteredList.length === 0 ? (
                        <div className='bg-white p-20 text-center rounded-[32px] border border-slate-100 shadow-sm'>
                            <div className='w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <Search size={32} className='text-slate-200' />
                            </div>
                            <p className='text-slate-400 font-bold'>Không tìm thấy đánh giá nào phù hợp.</p>
                        </div>
                    ) : (
                        filteredList.map((item, index) => (
                            <div key={index} className='group bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300'>
                                <div className='flex flex-col lg:flex-row'>
                                    {/* Product & User Side */}
                                    <div className='lg:w-1/4 p-6 bg-slate-50/50 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col gap-4'>
                                        <div className='flex items-center gap-4'>
                                            <img 
                                                style={{ width: '64px', height: '64px', minWidth: '64px' }} 
                                                className='object-cover rounded-xl border border-white shadow-sm flex-shrink-0' 
                                                src={getSafeImage(item.productId?.image) || 'https://dummyimage.com/100'} 
                                                alt="" 
                                            />
                                            <div className='flex-1 min-w-0'>
                                                <p className='text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate'>Sản phẩm</p>
                                                <h4 className='text-xs font-bold text-slate-900 truncate'>{item.productId?.name || 'Unknown Product'}</h4>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-4 pt-4 border-t border-slate-100'>
                                            <div className='w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100'>
                                                <User size={20} className='text-slate-400' />
                                            </div>
                                            <div>
                                                <p className='text-xs font-bold text-slate-400 uppercase tracking-tight'>Khách hàng</p>
                                                <h4 className='text-sm font-bold text-slate-900'>{item.userName}</h4>
                                            </div>
                                        </div>

                                        <div className='mt-auto flex items-center justify-between pt-4 border-t border-slate-100'>
                                            <div className='flex items-center gap-1'>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} fill={i < item.rating ? "#fbbf24" : "none"} stroke={i < item.rating ? "#fbbf24" : "#cbd5e1"} />
                                                ))}
                                            </div>
                                            <div className='text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-100'>
                                               {new Date(item.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className='flex-1 p-8 flex flex-col'>
                                        <div className='flex justify-between items-start gap-4 mb-4'>
                                            <p className='text-slate-700 text-lg leading-relaxed font-medium italic'>"{item.comment}"</p>
                                            <button 
                                                onClick={() => deleteReview(item._id)}
                                                className='shrink-0 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all'
                                                title='Xoá vĩnh viễn'
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>

                                        {/* Review Images - Smaller */}
                                        {item.images && item.images.length > 0 && (
                                            <div className='flex gap-2 pb-6'>
                                                {item.images.map((img, i) => (
                                                    <img 
                                                        key={i} 
                                                        style={{ width: '48px', height: '48px', minWidth: '48px' }}
                                                        className='object-cover rounded-xl border border-slate-50 shadow-sm flex-shrink-0' 
                                                        src={img} 
                                                        alt="" 
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {/* Admin Reply Section */}
                                        <div className='mt-auto pt-6 border-t border-slate-50'>
                                            {item.adminReply ? (
                                                <div className='bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100/50 relative'>
                                                    <div className='flex items-center gap-2 mb-2'>
                                                        <Reply size={16} className='text-indigo-500 -scale-x-100' />
                                                        <span className='text-[10px] font-black uppercase text-indigo-400 tracking-widest'>Phản hồi từ cửa hàng</span>
                                                        <span className='ml-auto text-[10px] text-indigo-300'>{new Date(item.replyDate).toLocaleDateString()}</span>
                                                    </div>
                                                    <p className='text-indigo-900 text-sm font-medium leading-relaxed'>{item.adminReply}</p>
                                                    <button 
                                                        onClick={() => { setReplyingId(item._id); setReplyText(item.adminReply); }}
                                                        className='absolute top-4 right-4 text-[10px] font-bold text-indigo-400 hover:text-indigo-600 uppercase underline'
                                                    >
                                                        Sửa
                                                    </button>
                                                </div>
                                            ) : replyingId === item._id ? (
                                                <div className='space-y-3 animate-in fade-in slide-in-from-top-2'>
                                                    <textarea 
                                                        autoFocus
                                                        value={replyText}
                                                        onChange={(e) => setReplyText(e.target.value)}
                                                        placeholder="Nhập nội dung phản hồi khách hàng..."
                                                        className='w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm outline-none focus:border-indigo-400 transition-all min-h-[100px]'
                                                    />
                                                    <div className='flex justify-end gap-2'>
                                                        <button onClick={() => setReplyingId(null)} className='px-4 py-2 text-xs font-bold text-slate-400 uppercase hover:text-slate-600'>Hủy</button>
                                                        <button 
                                                            onClick={() => submitReply(item._id)}
                                                            className='bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all'
                                                        >
                                                            Gửi phản hồi
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button 
                                                    onClick={() => setReplyingId(item._id)}
                                                    className='flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors group'
                                                >
                                                    <Reply size={18} className='group-hover:-translate-x-1 transition-transform' />
                                                    <span className='text-sm font-bold'>Phản hồi đánh giá này</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
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
