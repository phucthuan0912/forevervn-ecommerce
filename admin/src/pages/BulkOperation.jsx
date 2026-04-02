import React, { useState, useCallback, useEffect, useMemo } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl as defaultBackendUrl } from '../config'
import { Upload, Percent, Zap, AlertTriangle } from 'lucide-react'

const BulkOperation = ({ token, backendUrl: backendUrlFromProps }) => {
  const [discountPercent, setDiscountPercent] = useState('')
  const [discountCategory, setDiscountCategory] = useState('')
  const [discountSubCategory, setDiscountSubCategory] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  
  const [csvFile, setCsvFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  
  const [categories, setCategories] = useState([])
  const [allSubCategories, setAllSubCategories] = useState([])
  const [filteredSubCategories, setFilteredSubCategories] = useState([])

  const apiBaseUrl = useMemo(
    () => (backendUrlFromProps || defaultBackendUrl || '').trim().replace(/\/+$/, ''),
    [backendUrlFromProps],
  )

  const fetchFilters = useCallback(async () => {
    try {
      const [catRes, subRes] = await Promise.all([
        axios.get(`${apiBaseUrl}/api/category/list`),
        axios.get(`${apiBaseUrl}/api/sub-category/list`)
      ])
      
      if (catRes.data.success) {
        setCategories(catRes.data.categories)
      }
      if (subRes.data.success) {
        setAllSubCategories(subRes.data.subCategories)
      }
    } catch (err) { }
  }, [apiBaseUrl])

  useEffect(() => {
    fetchFilters()
  }, [fetchFilters])

  useEffect(() => {
    if (discountCategory) {
       const parent = categories.find(c => c.name === discountCategory)
       if (parent) {
          setFilteredSubCategories(allSubCategories.filter(s => s.categoryId?._id === parent._id))
       } else {
          setFilteredSubCategories([])
       }
    } else {
       setFilteredSubCategories([])
    }
    setDiscountSubCategory('')
  }, [discountCategory, categories, allSubCategories])

  const applyDiscount = async (e) => {
      e.preventDefault()
      if (!discountPercent || discountPercent <= 0 || discountPercent >= 100) {
          toast.error("Phần trăm giảm giá phải từ 1-99%")
          return
      }
      
      if (!window.confirm(`Bạn sắp giảm giá ${discountPercent}% cho toàn bộ sản phẩm ${discountCategory ? 'trong '+discountCategory : 'trên hệ thống'}. Tiếp tục?`)) {
          return
      }

      try {
          setIsApplying(true)
          const { data } = await axios.post(`${apiBaseUrl}/api/product/bulk-discount`, {
              category: discountCategory,
              subCategory: discountSubCategory,
              discountPercent: Number(discountPercent)
          }, { headers: { token } })

          if (data.success) {
              toast.success(data.message)
              setDiscountPercent('')
              setDiscountCategory('')
          } else {
              toast.error(data.message)
          }
      } catch (err) {
          toast.error("Lỗi áp dụng giảm giá hàng loạt!")
      } finally {
          setIsApplying(false)
      }
  }

  const handleFileUpload = async (e) => {
      e.preventDefault()
      if (!csvFile) {
          toast.error("Vui lòng chọn file CSV")
          return
      }
      try {
          setIsUploading(true)
          const formData = new FormData()
          formData.append('file', csvFile)

          const { data } = await axios.post(`${apiBaseUrl}/api/product/bulk-import`, formData, {
              headers: { 
                  token,
                  'Content-Type': 'multipart/form-data'
              }
          })

          if (data.success) {
              toast.success(data.message)
              setCsvFile(null)
          } else {
              toast.error(data.message)
          }
      } catch (err) {
           toast.error(err.response?.data?.message || "Lỗi tải lên CSV!")
      } finally {
          setIsUploading(false)
      }
  }

  return (
    <div className='w-full px-4 py-8 md:px-8'>
      <div className='mb-8'>
         <p className='text-3xl font-bold text-slate-800 flex items-center gap-3'>
            <Zap size={32} className="text-pink-500 fill-pink-500" />
            Smart Operations
         </p>
         <p className="text-sm text-slate-500 mt-2">Công cụ tự động hóa thao tác hệ thống: Xử lý file dữ liệu, Sale Flash số lượng lớn.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
          
          {/* BULK DISCOUNT */}
          <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 text-pink-50 opacity-50 pointer-events-none">
                 <Percent size={120} />
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Percent size={24} className="text-pink-500" /> Giảm Giá Hàng Loạt (Smart Sale)
             </h3>
             <form onSubmit={applyDiscount} className="relative z-10 space-y-5">
                 <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-start gap-3 text-sm mb-6">
                     <AlertTriangle size={20} className="shrink-0 mt-0.5" />
                     <p>Hành động này sẽ <strong>ghi đè vĩnh viễn</strong> giá bán hiện tại của các sản phẩm tương ứng và tạo gạch ngang giá gốc. Hãy thận trọng!</p>
                 </div>
                 
                 <div className="grid sm:grid-cols-2 gap-4">
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Category Lớn</label>
                        <select value={discountCategory} onChange={e => setDiscountCategory(e.target.value)} className="w-full mt-1 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400">
                            <option value="">Tất cả danh mục (All)</option>
                            {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                        </select>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Sub Category Nhỏ</label>
                        <select value={discountSubCategory} onChange={e => setDiscountSubCategory(e.target.value)} className="w-full mt-1 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-400">
                            <option value="">Tất cả phân loại</option>
                            {filteredSubCategories.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                        </select>
                     </div>
                 </div>

                 <div>
                     <label className="text-xs font-bold text-slate-500 uppercase">Phần Trăm Giảm Giá (%)</label>
                     <input required type="number" min="1" max="99" value={discountPercent} onChange={e => setDiscountPercent(e.target.value)} className="w-full mt-1 border-2 border-pink-200 bg-pink-50 rounded-xl px-4 py-3 text-lg font-bold outline-none focus:border-pink-500 text-pink-700" placeholder="VD: 50" />
                 </div>

                 <button disabled={isApplying} type="submit" className="w-full bg-pink-500 text-white font-bold text-sm py-4 rounded-xl shadow-[0_8px_20px_rgba(236,72,153,0.3)] hover:bg-pink-600 transition-all active:scale-[0.98] disabled:opacity-50 mt-4">
                     {isApplying ? 'Đang áp dụng...' : 'Áp Dụng Giảm Giá Ngay'}
                 </button>
             </form>
          </div>

          {/* BULK IMPORT */}
          <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm relative overflow-hidden block">
             <div className="absolute -bottom-10 -right-10 text-indigo-50 opacity-40 pointer-events-none">
                 <Upload size={180} />
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Upload size={24} className="text-indigo-500" /> Thêm Sản Phẩm Bằng CSV
             </h3>

             <form onSubmit={handleFileUpload} className="relative z-10 space-y-5">
                 <p className="text-sm text-slate-500 mb-4">Mẫu CSV yêu cầu các cột: <code className="bg-slate-100 px-2 py-1 rounded text-pink-600">name, description, price, oldPrice, category, subCategory, sizes (ngăn bằng |), colors (ngăn bằng |), videoUrl, bestseller (true/false), image (urls ngăn bằng |)</code>.</p>
                 
                 <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 transition-colors rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                    <input type="file" id="csv-upload" accept=".csv" className="hidden" onChange={(e) => setCsvFile(e.target.files[0])} />
                    <label htmlFor="csv-upload" className="cursor-pointer w-full h-full flex flex-col items-center">
                       <Upload size={48} className="text-indigo-400 mb-4" />
                       <p className="font-bold text-indigo-900 mb-1">{csvFile ? csvFile.name : 'Nhấn để chọn file CSV'}</p>
                       <p className="text-xs text-indigo-400">{csvFile ? `Kích thước: ${(csvFile.size / 1024).toFixed(1)} KB` : 'Hỗ trợ định dạng .csv chuẩn UTF-8'}</p>
                    </label>
                 </div>

                 <button disabled={isUploading || !csvFile} type="submit" className="w-full bg-indigo-600 text-white font-bold text-sm py-4 rounded-xl shadow-[0_8px_20px_rgba(79,70,229,0.25)] hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                     {isUploading ? 'Đang tải dữ liệu...' : 'Bắt Đầu Import Hệ Thống'}
                 </button>
             </form>
          </div>

      </div>
    </div>
  )
}
export default BulkOperation
