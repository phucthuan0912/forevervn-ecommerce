import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl as defaultBackendUrl } from '../config'
import { PackageOpen,  Download, Search, PlusCircle, Calendar, Edit, X } from 'lucide-react'

const ImportBatch = ({ token, backendUrl: backendUrlFromProps }) => {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
      productId: '',
      size: 'Any',
      costPrice: '',
      initialQty: '',
      supplier: '',
      note: ''
  })
  
  const [editingBatchId, setEditingBatchId] = useState(null)
  const [editFormData, setEditFormData] = useState({ size: '', costPrice: '', remainingQty: '', supplier: '', note: '', status: '' })
  const [updating, setUpdating] = useState(false)
  
  const apiBaseUrl = useMemo(
    () => (backendUrlFromProps || defaultBackendUrl || '').trim().replace(/\/+$/, ''),
    [backendUrlFromProps],
  )

  const fetchData = useCallback(async () => {
      if (!apiBaseUrl || !token) return;
      try {
          setLoading(true);
          const [batchRes, prodRes] = await Promise.all([
             axios.get(`${apiBaseUrl}/api/import-batch/list`, { headers: { token } }),
             axios.get(`${apiBaseUrl}/api/product/list`)
          ]);
          if(batchRes.data.success) {
              setBatches(batchRes.data.batches);
          }
          if(prodRes.data.success) {
              setProducts(prodRes.data.products);
          }
      } catch (err) {
          toast.error(err.response?.data?.message || 'Error loading batches');
      } finally {
          setLoading(false);
      }
  }, [apiBaseUrl, token]);

  useEffect(() => {
      fetchData();
  }, [fetchData]);

  const handleAddBatch = async (e) => {
      e.preventDefault();
      try {
          const { data } = await axios.post(`${apiBaseUrl}/api/import-batch/add`, {
             ...formData,
             initialQty: Number(formData.initialQty),
             costPrice: Number(formData.costPrice),
          }, { headers: { token } });
          
          if(data.success) {
              toast.success('Thêm lô hàng thành công!');
              setIsAdding(false);
              setFormData({ productId: '', size: 'Any', costPrice: '', initialQty: '', supplier: '', note: '' });
              fetchData();
          } else {
              toast.error(data.message);
          }
      } catch (err) {
          toast.error('Lỗi khi thêm lô hàng');
      }
  }

  const handleUpdateBatch = async (e) => {
      e.preventDefault();
      try {
          setUpdating(true);
          const { data } = await axios.put(`${apiBaseUrl}/api/import-batch/update`, {
              id: editingBatchId,
              ...editFormData,
              remainingQty: Number(editFormData.remainingQty),
              costPrice: Number(editFormData.costPrice),
          }, { headers: { token } });
          
          if(data.success) {
              toast.success('Cập nhật lô hàng thành công!');
              setEditingBatchId(null);
              fetchData();
          } else {
              toast.error(data.message);
          }
      } catch (err) {
          toast.error('Lỗi khi cập nhật lô hàng');
      } finally {
          setUpdating(false);
      }
  }

  const getProductName = (id) => {
      const p = products.find(prod => prod._id === id);
      return p ? p.name : 'Sản phẩm xoá/ẩn';
  }

  return (
      <div className='w-full px-4 py-6 md:px-6'>
      <div className='mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center'>
        <div>
           <p className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
              <PackageOpen size={28} className="text-amber-500"/>
              Import Hub (FIFO Inventory)
           </p>
           <p className="text-sm text-gray-500 mt-1">Quản lý lô hàng nhập vào và kiểm soát chặt chẽ giá vốn (COGS).</p>
        </div>
        <button 
           onClick={() => setIsAdding(!isAdding)}
           className="flex items-center gap-2 bg-amber-500 text-white font-bold py-2.5 px-5 rounded-xl shadow-sm hover:bg-amber-600 transition-colors">
           <PlusCircle size={18} /> Nhập Hàng Mới
        </button>
      </div>

      {isAdding && (
         <form onSubmit={handleAddBatch} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6 animate-fade-in">
             <h3 className="text-lg font-bold text-gray-800 mb-4">Phiếu Nhập Hàng (Goods Receipt)</h3>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                 <div>
                     <label className="text-xs font-bold text-gray-500 uppercase">Sản Phẩm</label>
                     <select required value={formData.productId} onChange={e => setFormData({...formData, productId: e.target.value})} className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-amber-400">
                         <option value="" disabled>-- Chọn Sản Phẩm --</option>
                         {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                     </select>
                 </div>
                 <div>
                     <label className="text-xs font-bold text-gray-500 uppercase">Size / Kích Cỡ</label>
                     <input type="text" value={formData.size} onChange={e => setFormData({...formData, size: e.target.value.toUpperCase()})} className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-amber-400" placeholder="S, M, L, XL... hoặc Any" />
                 </div>
                 <div>
                     <label className="text-xs font-bold text-gray-500 uppercase">Supplier (Nguồn Hàng)</label>
                     <input type="text" value={formData.supplier} onChange={e => setFormData({...formData, supplier: e.target.value})} className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-amber-400" placeholder="Xưởng A, Chợ B..." />
                 </div>
                 <div>
                     <label className="text-xs font-bold text-gray-500 uppercase text-rose-500">Giá Vốn (VNĐ)</label>
                     <input required type="number" value={formData.costPrice} onChange={e => setFormData({...formData, costPrice: e.target.value})} className="w-full mt-1 border border-rose-200 bg-rose-50 rounded-xl px-4 py-2 text-sm outline-none focus:border-rose-400" placeholder="150000" />
                 </div>
                 <div>
                     <label className="text-xs font-bold text-gray-500 uppercase text-emerald-600">Số Lượng Nhập</label>
                     <input required type="number" value={formData.initialQty} onChange={e => setFormData({...formData, initialQty: e.target.value})} className="w-full mt-1 border border-emerald-200 bg-emerald-50 rounded-xl px-4 py-2 text-sm outline-none focus:border-emerald-400" placeholder="50" />
                 </div>
                 <div>
                     <label className="text-xs font-bold text-gray-500 uppercase">Ghi Chú</label>
                     <input type="text" value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-amber-400" placeholder="Lô hàng lỗi ít, vải đẹp..." />
                 </div>
             </div>
             <div className="flex justify-end mt-6 gap-3">
                 <button type="button" onClick={() => setIsAdding(false)} className="px-5 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100/50 rounded-xl border border-gray-200">Hủy</button>
                 <button type="submit" className="px-5 py-2 text-sm font-bold text-white bg-gray-900 shadow hover:bg-black rounded-xl border border-transparent">Lưu Phiếu Nhập</button>
             </div>
         </form>
      )}

      {/* Grid list */}
      <div className='w-full overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-sm'>
        <div className='grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_1fr_60px] items-center border-b border-gray-100 bg-slate-50 px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider'>
          <span>Product Base</span>
          <span>Variant</span>
          <span>Supplier</span>
          <span>Cost Price</span>
          <span className="text-center">Remaining / Initial</span>
          <span className="text-center">Status</span>
          <span className="text-center">Edit</span>
        </div>

        {loading ? (
          <div className='p-8 text-center text-sm text-gray-500'>Loading data...</div>
        ) : batches.length === 0 ? (
          <div className='p-8 text-center text-sm text-gray-500'>No batches found.</div>
        ) : (
          batches.map((batch) => (
            <div key={batch._id} className='grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_1fr_60px] items-center border-b border-gray-50 px-6 py-4 text-[13px] text-gray-700 hover:bg-amber-50/30 transition-colors'>
              <div className='font-bold text-slate-900 truncate pr-4'>{getProductName(batch.productId)}</div>
              <div className='text-gray-600'><span className="bg-gray-100 px-2 py-0.5 rounded text-xs border border-gray-200">{batch.size}</span></div>
              <div className='text-gray-500 truncate pr-2'>{batch.supplier || 'N/A'}</div>
              <div className='font-mono font-medium text-rose-600'>{new Intl.NumberFormat('vi-VN').format(batch.costPrice)} đ</div>
              <div className="text-center font-mono">
                  <span className={`font-bold ${batch.remainingQty === 0 ? 'text-red-500' : 'text-emerald-600'}`}>{batch.remainingQty}</span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-gray-500">{batch.initialQty}</span>
              </div>
              <div className="text-center">
                  <span className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-md ${batch.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {batch.status}
                  </span>
              </div>
              <div className="text-center">
                   <button
                      onClick={() => {
                          setEditingBatchId(batch._id);
                          setEditFormData({ 
                              size: batch.size, 
                              costPrice: batch.costPrice, 
                              remainingQty: batch.remainingQty, 
                              supplier: batch.supplier || '', 
                              note: batch.note || '',
                              status: batch.status
                          });
                      }}
                      className='text-amber-500 hover:text-amber-600 bg-amber-50 hover:bg-amber-100 p-1.5 rounded-lg transition-colors'
                      title='Edit Batch'
                    >
                      <Edit size={16} />
                   </button>
              </div>
            </div>
          ))
        )}
      </div>
      {editingBatchId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-[600px] p-6 shadow-xl relative animate-fade-in translate-y-[-10px]">
             <button onClick={() => setEditingBatchId(null)} className="absolute top-4 right-4 text-slate-400 hover:text-rose-500">
                <X size={20} />
             </button>
             <h3 className="font-bold text-lg text-slate-900 mb-6">Cập nhật Lô Hàng</h3>
             
             <form onSubmit={handleUpdateBatch} className="grid md:grid-cols-2 gap-4">
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Size / Kích Cỡ</label>
                    <input required type="text" value={editFormData.size} onChange={e => setEditFormData({...editFormData, size: e.target.value.toUpperCase()})} className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-amber-500" />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Tình Trạng (Status)</label>
                    <select value={editFormData.status} onChange={e => setEditFormData({...editFormData, status: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-amber-500">
                        <option value="Active">Active</option>
                        <option value="Hidden">Hidden</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block text-rose-500">Giá Vốn (Cost Price)</label>
                    <input required type="number" value={editFormData.costPrice} onChange={e => setEditFormData({...editFormData, costPrice: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-amber-500" />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block text-emerald-600">Tồn kho hiện tại (Remaining Qty)</label>
                    <input required type="number" value={editFormData.remainingQty} onChange={e => setEditFormData({...editFormData, remainingQty: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-amber-500 bg-emerald-50/50" />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Nguồn Hàng (Supplier)</label>
                    <input type="text" value={editFormData.supplier} onChange={e => setEditFormData({...editFormData, supplier: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-amber-500" />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Ghi Chú</label>
                    <input type="text" value={editFormData.note} onChange={e => setEditFormData({...editFormData, note: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-amber-500" />
                 </div>
                 <div className="md:col-span-2 pt-2">
                    <button disabled={updating} className="w-full bg-amber-500 text-white rounded-xl py-3 text-sm font-bold shadow-md hover:bg-amber-600 transition-colors disabled:opacity-50">
                        {updating ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                    </button>
                 </div>
             </form>
          </div>
        </div>
      )}

    </div>
  )
}
export default ImportBatch
