import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { backendUrl as defaultBackendUrl } from '../config'

const List = ({ token, setToken, backendUrl: backendUrlFromProps }) => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState('')

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
      }),
    [],
  )

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

  const normalizeImage = (imageValue) => {
    if (Array.isArray(imageValue)) return imageValue[0] || assets.upload_area
    return imageValue || assets.upload_area
  }

  const visibleProducts = useMemo(
    () =>
      [...products]
        .sort((a, b) => (b?.date || 0) - (a?.date || 0))
        .map((item) => ({
          id: item?._id,
          name: item?.name || '-',
          category: item?.category || '-',
          price: Number(item?.price || 0),
          oldPrice: Number(item?.oldPrice || 0),
          image: normalizeImage(item?.image),
        })),
    [products],
  )

  const fetchProducts = useCallback(async () => {
    if (!apiBaseUrl || !token) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data } = await axios.get(`${apiBaseUrl}/api/product/list`, {
        headers: { token },
        timeout: 20000,
      })

      if (data?.success) {
        setProducts(Array.isArray(data.products) ? data.products : [])
        return
      }

      if (handleUnauthorized(data?.message)) return
      toast.error(data?.message || 'Cannot load products')
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Cannot load products'
      if (handleUnauthorized(message)) return
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [apiBaseUrl, handleUnauthorized, token])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleRemove = async (id) => {
    if (!id || removingId || !apiBaseUrl || !token) return

    try {
      setRemovingId(id)
      const { data } = await axios.post(
        `${apiBaseUrl}/api/product/remove`,
        { id },
        { headers: { token }, timeout: 20000 },
      )

      if (data?.success) {
        toast.success(data.message || 'Product removed')
        setProducts((prev) => prev.filter((item) => item._id !== id))
        return
      }

      if (handleUnauthorized(data?.message)) return
      toast.error(data?.message || 'Remove failed')
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Remove failed'
      if (handleUnauthorized(message)) return
      toast.error(message)
    } finally {
      setRemovingId('')
    }
  }

  const exportToCsv = async () => {
    if (!apiBaseUrl || !token) return;

    try {
      const { data } = await axios.get(`${apiBaseUrl}/api/product/inventory`, {
        headers: { token },
        timeout: 20000,
      });

      if (!data.success || !data.inventory.length) {
        toast.info('No inventory data to export');
        return;
      }

      const headers = [
        'Product Name',
        'Category',
        'Sub-Category',
        'Size',
        'Color',
        'Total Stock',
      ];

      const rows = data.inventory.map(item => [
        `"${item.productName}"`,
        `"${item.category}"`,
        `"${item.subCategory}"`,
        `"${item.size}"`,
        `"${item.color}"`,
        item.totalStock,
      ].join(','));

      const csvContent = [headers.join(','), ...rows].join('\n');
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `inventory_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Export failed';
      if (handleUnauthorized(message)) return;
      toast.error(message);
    }
  };

  return (
    <div className='w-full px-4 py-6 md:px-6'>
      <div className='mb-4 flex items-center justify-between'>
        <p className='text-xl font-semibold text-gray-800'>All Products List</p>
        <button
          onClick={() => exportToCsv()}
          disabled={loading}
          className='inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-500 disabled:cursor-not-allowed disabled:opacity-60'
        >
          Export to CSV
        </button>
      </div>

      <div className='w-full max-w-[1020px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
        <div className='grid grid-cols-[90px_2fr_1fr_1fr_100px] items-center border-b border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50 px-4 py-3 text-[13px] font-semibold text-gray-700'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className='text-center'>Action</span>
        </div>

        {loading ? (
          <div className='grid grid-cols-[90px_2fr_1fr_1fr_90px] px-4 py-8 text-center text-sm text-gray-500'>
            <span className='col-span-5'>Loading products...</span>
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className='grid grid-cols-[90px_2fr_1fr_1fr_90px] px-4 py-8 text-center text-sm text-gray-500'>
            <span className='col-span-5'>No products found.</span>
          </div>
        ) : (
          visibleProducts.map((product, index) => (
            <div
              key={product.id}
              className={`grid min-h-[76px] grid-cols-[90px_2fr_1fr_1fr_100px] items-center border-b border-gray-100 px-4 py-2 text-[13px] text-gray-700 transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
              } hover:bg-rose-50/50`}
            >
              <div className='flex justify-start'>
                <div className='flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gray-50'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='h-full w-full object-contain p-1'
                  />
                </div>
              </div>

              <span className='pr-3 font-medium text-gray-700'>
                {product.name}
                {product.oldPrice > product.price && (
                  <span className='ml-2 inline-block rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-600'>SALE</span>
                )}
              </span>
              <span className='text-gray-600'>{product.category}</span>
              <div className='flex flex-col'>
                <span className='font-semibold text-emerald-700'>{currencyFormatter.format(product.price)}</span>
                {product.oldPrice > product.price && (
                  <span className='text-[10px] text-gray-400 line-through'>{currencyFormatter.format(product.oldPrice)}</span>
                )}
              </div>

              <div className='flex items-center justify-center gap-1'>
                <button
                  onClick={() => navigate(`/update/${product.id}`)}
                  className='inline-flex h-8 w-12 items-center justify-center rounded-lg border border-transparent text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-50'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemove(product.id)}
                  disabled={removingId === product.id}
                  className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-base font-semibold leading-none text-gray-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40'
                >
                  {removingId === product.id ? '...' : 'X'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default List