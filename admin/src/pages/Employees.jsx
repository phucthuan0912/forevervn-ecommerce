import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl as defaultBackendUrl } from '../config'

import { Edit, X } from 'lucide-react'

const Employees = ({ token, backendUrl: backendUrlFromProps }) => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  
  const [editingUserId, setEditingUserId] = useState(null)
  const [editFormData, setEditFormData] = useState({ name: '', email: '', password: '' })
  const [updating, setUpdating] = useState(false)

  const apiBaseUrl = useMemo(
    () => (backendUrlFromProps || defaultBackendUrl || '').trim().replace(/\/+$/, ''),
    [backendUrlFromProps],
  )

  const fetchUsers = useCallback(async () => {
    if (!apiBaseUrl || !token) return
    try {
      setLoading(true)
      const { data } = await axios.get(`${apiBaseUrl}/api/user/list`, {
        headers: { token },
      })
      if (data?.success) {
        setEmployees(data.users.filter(u => u.role === 'Employee' || u.role === 'Admin'))
      } else {
        toast.error(data?.message || 'Cannot load employees')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Cannot load employees')
    } finally {
      setLoading(false)
    }
  }, [apiBaseUrl, token])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!apiBaseUrl || !token) return;
    try {
        setAdding(true);
        const { data } = await axios.post(`${apiBaseUrl}/api/user/create-employee`, formData, {
            headers: { token }
        });
        
        if (data.success) {
            toast.success(data.message);
            setFormData({ name: '', email: '', password: '' });
            fetchUsers();
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    } finally {
        setAdding(false);
    }
  }

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    if (!apiBaseUrl || !token) return;
    try {
        setUpdating(true);
        const { data } = await axios.put(`${apiBaseUrl}/api/user/update-employee`, { id: editingUserId, ...editFormData }, {
            headers: { token }
        });
        
        if (data.success) {
            toast.success(data.message);
            setEditingUserId(null);
            fetchUsers();
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || 'Lỗi cập nhật');
    } finally {
        setUpdating(false);
    }
  }

  const handleRemove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      const { data } = await axios.post(`${apiBaseUrl}/api/user/delete`, { id }, { headers: { token } })
      if (data?.success) {
        toast.success(data.message || 'Employee deleted')
        setEmployees((prev) => prev.filter((item) => item._id !== id))
      } else {
        toast.error(data?.message || 'Delete failed')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed')
    }
  }

  return (
    <div className='w-full px-4 py-6 md:px-6'>
      <p className='mb-4 text-xl font-semibold text-gray-800'>Personnel & Roles</p>

      <div className="grid gap-6 md:grid-cols-[300px_1fr] items-start">
          {/* Add Form */}
          <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4">Add Employee</h3>
             <form onSubmit={handleAddEmployee} className="flex flex-col gap-4">
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Full Name</label>
                    <input 
                       required 
                       type="text" 
                       value={formData.name} 
                       onChange={e => setFormData({...formData, name: e.target.value})}
                       className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition-colors"
                       placeholder="Nguyễn Văn A" 
                    />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Email</label>
                    <input 
                       required 
                       type="email" 
                       value={formData.email} 
                       onChange={e => setFormData({...formData, email: e.target.value})}
                       className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition-colors"
                       placeholder="employee@forevervn.com" 
                    />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Password</label>
                    <input 
                       required 
                       type="password" 
                       value={formData.password} 
                       onChange={e => setFormData({...formData, password: e.target.value})}
                       className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition-colors"
                       placeholder="Strong password" 
                    />
                 </div>
                 <button 
                    disabled={adding}
                    className="mt-2 w-full bg-indigo-600 text-white rounded-xl py-3 text-sm font-bold shadow-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                 >
                    {adding ? 'Creating...' : 'Create Account'}
                 </button>
             </form>
          </div>

          <div className='w-full overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-sm'>
            <div className='grid grid-cols-[1fr_2fr_100px_80px] items-center border-b border-gray-100 bg-slate-50 px-6 py-4 text-[13px] font-bold text-slate-500 uppercase tracking-wider'>
              <span>Name</span>
              <span>Email</span>
              <span className="text-center">Role</span>
              <span className='text-center'>Action</span>
            </div>

            {loading ? (
              <div className='p-8 text-center text-sm text-gray-500'>Loading employees...</div>
            ) : employees.length === 0 ? (
              <div className='p-8 text-center text-sm text-gray-500'>No employees found.</div>
            ) : (
              employees.map((user) => (
                <div key={user._id} className='grid grid-cols-[1fr_2fr_100px_80px] items-center border-b border-gray-50 px-6 py-4 text-[14px] text-gray-700 hover:bg-slate-50'>
                  <span className='font-bold text-slate-900'>{user.name}</span>
                  <span className='text-slate-500'>{user.email}</span>
                  <div className="text-center">
                      <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${user.role === 'Admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {user.role}
                      </span>
                  </div>
                  <div className='text-center flex items-center justify-center gap-2'>
                    <button
                      onClick={() => {
                          setEditingUserId(user._id);
                          setEditFormData({ name: user.name, email: user.email, password: '' });
                      }}
                      className='text-indigo-400 hover:text-indigo-600 bg-indigo-50 hover:bg-indigo-100 p-1.5 rounded-lg transition-colors'
                      title='Chi Tiết / Sửa'
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleRemove(user._id)}
                      className='text-rose-400 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 p-1.5 rounded-lg font-bold transition-colors'
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
      </div>

      {editingUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative animate-fade-in translate-y-[-10px]">
             <button onClick={() => setEditingUserId(null)} className="absolute top-4 right-4 text-slate-400 hover:text-rose-500">
                <X size={20} />
             </button>
             <h3 className="font-bold text-lg text-slate-900 mb-6">Update Employee</h3>
             
             <form onSubmit={handleUpdateEmployee} className="flex flex-col gap-4">
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Full Name</label>
                    <input 
                       required 
                       type="text" 
                       value={editFormData.name} 
                       onChange={e => setEditFormData({...editFormData, name: e.target.value})}
                       className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
                    />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Email</label>
                    <input 
                       required 
                       type="email" 
                       value={editFormData.email} 
                       onChange={e => setEditFormData({...editFormData, email: e.target.value})}
                       className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
                    />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">New Password (Optional)</label>
                    <input 
                       type="password" 
                       value={editFormData.password} 
                       onChange={e => setEditFormData({...editFormData, password: e.target.value})}
                       className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
                       placeholder="Leave blank to keep unchanged" 
                    />
                 </div>
                 <button 
                    disabled={updating}
                    className="mt-4 w-full bg-indigo-600 text-white rounded-xl py-3 text-sm font-bold shadow-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                 >
                    {updating ? 'Saving...' : 'Save Changes'}
                 </button>
             </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Employees
