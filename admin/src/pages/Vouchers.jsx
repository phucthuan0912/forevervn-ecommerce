import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl as defaultBackendUrl } from '../config'

const Vouchers = ({ token, setToken, backendUrl: backendUrlFromProps }) => {
  const [vouchers, setVouchers] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState('')
  const [togglingId, setTogglingId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form State
  const [editingId, setEditingId] = useState(null)
  const [code, setCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState('')
  const [description, setDescription] = useState('')
  const [showAsHot, setShowAsHot] = useState(false)
  const [isActive, setIsActive] = useState(true)

  const apiBaseUrl = useMemo(
    () => (backendUrlFromProps || defaultBackendUrl || '').trim().replace(/\/+$/, ''),
    [backendUrlFromProps],
  )

  const handleUnauthorized = useCallback(
    (message) => {
      const normalized = (message || '').toLowerCase()
      if (!normalized.includes('not authorized')) return false

      toast.error('Session expired, please login again')
      setToken?.('')
      localStorage.removeItem('token')
      setTimeout(() => window.location.reload(), 400)
      return true
    },
    [setToken],
  )

  const fetchVouchers = useCallback(async () => {
    if (!apiBaseUrl) return

    try {
      setLoading(true)
      const { data } = await axios.get(`${apiBaseUrl}/api/system/voucher/list`)

      if (data?.success) {
        setVouchers(Array.isArray(data.vouchers) ? data.vouchers : [])
        return
      }

      toast.error(data?.message || 'Cannot load vouchers')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }, [apiBaseUrl])

  useEffect(() => {
    fetchVouchers()
  }, [fetchVouchers])

  const handleAddVoucher = async (e) => {
    e.preventDefault()
    if (!token) return toast.error('Please login first')

    if (!code.trim() || !discountPercent) {
      return toast.error('Please enter code and discount percentage')
    }

    setIsSubmitting(true)
    try {
      const endpoint = editingId ? '/api/system/voucher/update' : '/api/system/voucher/add';
      const payload = {
        code: code.trim().toUpperCase(),
        discountPercent: Number(discountPercent),
        description: description.trim(),
        showAsHot,
        isActive
      };
      
      if (editingId) {
        payload.id = editingId;
      }

      const { data } = await axios.post(`${apiBaseUrl}${endpoint}`, payload, { headers: { token } })

      if (data.success) {
        toast.success(editingId ? 'Voucher updated' : 'Voucher created')
        setCode('')
        setDiscountPercent('')
        setDescription('')
        setShowAsHot(false)
        setIsActive(true)
        setEditingId(null)
        fetchVouchers()
      } else {
        if (handleUnauthorized(data.message)) return
        toast.error(data.message)
      }
    } catch (error) {
      if (handleUnauthorized(error.response?.data?.message)) return
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (v) => {
    setEditingId(v._id)
    setCode(v.code)
    setDiscountPercent(v.discountPercent)
    setDescription(v.description)
    setShowAsHot(v.showAsHot)
    setIsActive(v.isActive)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setCode('')
    setDiscountPercent('')
    setDescription('')
    setShowAsHot(false)
    setIsActive(true)
  }

  const handleToggleActive = async (v) => {
    if (!token || togglingId) return

    try {
      setTogglingId(v._id)
      const { data } = await axios.post(`${apiBaseUrl}/api/system/voucher/update`, {
        id: v._id,
        isActive: !v.isActive
      }, { headers: { token } })

      if (data.success) {
        toast.success(`Voucher ${!v.isActive ? 'activated' : 'deactivated'}`)
        setVouchers(prev => prev.map(item => item._id === v._id ? { ...item, isActive: !v.isActive } : item))
      } else {
        if (handleUnauthorized(data.message)) return
        toast.error(data.message)
      }
    } catch (error) {
      if (handleUnauthorized(error.response?.data?.message)) return
      toast.error(error.message)
    } finally {
      setTogglingId('')
    }
  }

  const handleRemove = async (id) => {
    if (!id || removingId || !token) return
    if (!window.confirm('Are you sure you want to delete this voucher?')) return;

    try {
      setRemovingId(id)
      const { data } = await axios.post(
        `${apiBaseUrl}/api/system/voucher/delete`,
        { id },
        { headers: { token }, timeout: 20000 },
      )

      if (data?.success) {
        toast.success(data.message || 'Voucher deleted')
        setVouchers((prev) => prev.filter((item) => item._id !== id))
        return
      }

      if (handleUnauthorized(data?.message)) return
      toast.error(data?.message || 'Delete failed')
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Delete failed'
      if (handleUnauthorized(message)) return
      toast.error(message)
    } finally {
      setRemovingId('')
    }
  }

  return (
    <div className='flex w-full flex-col gap-8 px-4 py-6 md:px-6'>
      
      {/* Create / Edit Voucher Form */}
      <div>
        <p className='mb-4 text-xl font-semibold text-gray-800'>{editingId ? 'Edit Voucher' : 'Create Voucher'}</p>
        <form onSubmit={handleAddVoucher} className='max-w-[800px] w-full bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4'>
            <div className='flex gap-4 flex-wrap'>
                <div className='flex-1 min-w-[200px]'>
                    <p className='mb-2 font-medium text-sm text-gray-700'>Voucher Code</p>
                    <input
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        className='w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-pink-400'
                        type='text'
                        placeholder='e.g. SUMMER20'
                        required
                    />
                </div>
                <div className='w-[150px]'>
                    <p className='mb-2 font-medium text-sm text-gray-700'>Discount (%)</p>
                    <input
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                        className='w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-pink-400'
                        type='number'
                        min="1"
                        max="100"
                        placeholder='20'
                        required
                    />
                </div>
            </div>

            <div className='w-full'>
                <p className='mb-2 font-medium text-sm text-gray-700'>Short Description</p>
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-pink-400'
                    type='text'
                    placeholder='Describe the promotion'
                    required
                />
            </div>

            <div className='flex items-center gap-6 mt-2'>
                <div className='flex items-center gap-2'>
                    <input
                        type='checkbox'
                        id='showAsHot'
                        checked={showAsHot}
                        onChange={(e) => setShowAsHot(e.target.checked)}
                        className='h-4 w-4 accent-pink-500'
                    />
                    <label htmlFor='showAsHot' className='cursor-pointer text-sm font-medium text-gray-700'>
                        Show as "Hot"
                    </label>
                </div>
                <div className='flex items-center gap-2'>
                    <input
                        type='checkbox'
                        id='isActive'
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className='h-4 w-4 accent-blue-500'
                    />
                    <label htmlFor='isActive' className='cursor-pointer text-sm font-medium text-gray-700'>
                        Active (Can be used)
                    </label>
                </div>
            </div>

            <div className='mt-4 flex gap-3'>
                <button
                    type='submit'
                    disabled={isSubmitting}
                    className='rounded bg-pink-500 px-8 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60'
                >
                    {isSubmitting ? 'SAVING...' : (editingId ? 'UPDATE VOUCHER' : 'CREATE VOUCHER')}
                </button>
                {editingId && (
                    <button
                        type='button'
                        onClick={handleCancelEdit}
                        className='rounded border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50'
                    >
                        CANCEL
                    </button>
                )}
            </div>
        </form>
      </div>

      {/* Vouchers List */}
      <div>
        <p className='mb-4 text-xl font-semibold text-gray-800'>Active Vouchers</p>
        <div className='w-full max-w-[1020px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
          <div className='grid grid-cols-[1.5fr_1fr_2fr_1fr_120px] items-center border-b border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50 px-4 py-3 text-[13px] font-semibold text-gray-700'>
            <span>Code</span>
            <span>Discount</span>
            <span>Description</span>
            <span>Status</span>
            <span className='text-center'>Actions</span>
          </div>

          {loading ? (
            <div className='px-4 py-8 text-center text-sm text-gray-500'>
              Loading vouchers...
            </div>
          ) : vouchers.length === 0 ? (
            <div className='px-4 py-8 text-center text-sm text-gray-500'>
              No vouchers found. Create one above.
            </div>
          ) : (
            vouchers.map((v, index) => (
              <div
                key={v._id}
                className={`grid min-h-[60px] grid-cols-[1.5fr_1fr_2fr_1fr_120px] items-center border-b border-gray-100 px-4 py-2 text-[13px] text-gray-700 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                } hover:bg-rose-50/50 ${!v.isActive ? 'opacity-70' : ''}`}
              >
                <div className='flex items-center'>
                    <span className='rounded bg-pink-100 px-2 py-1 font-mono font-bold text-pink-700'>{v.code}</span>
                </div>

                <span className='font-semibold text-emerald-600'>{v.discountPercent}% OFF</span>
                <span className='text-gray-600 truncate pr-3'>{v.description}</span>
                
                <div className='flex flex-col gap-1 items-start'>
                    <button 
                        onClick={() => handleToggleActive(v)}
                        disabled={togglingId === v._id}
                        className={`rounded px-2 text-[10px] font-medium transition-colors cursor-pointer border ${v.isActive ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'}`}
                        title="Click to toggle"
                    >
                        {v.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </button>
                    {v.showAsHot && <span className='rounded px-2 text-[10px] font-medium bg-orange-100 text-orange-700 border border-orange-200'>HOT 🔥</span>}
                </div>

                <div className='flex items-center justify-center gap-2'>
                  <button
                    onClick={() => handleEdit(v)}
                    className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 text-blue-500 transition-colors hover:bg-blue-50'
                    title="Edit Voucher"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleRemove(v._id)}
                    disabled={removingId === v._id}
                    className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-200 text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40'
                    title="Delete Voucher"
                  >
                    {removingId === v._id ? '...' : 'X'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  )
}

export default Vouchers
