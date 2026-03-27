import React, { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const ORDER_REFRESH_INTERVAL_MS = 10000

const STATUS_DOT_STYLES = {
  'Order Placed': 'bg-sky-500',
  Packing: 'bg-amber-500',
  Shipped: 'bg-violet-500',
  'Out for Delivery': 'bg-orange-500',
  Delivered: 'bg-emerald-500',
}

function mapOrdersToItems(orders = []) {
  return orders
    .flatMap((order) =>
      (Array.isArray(order?.items) ? order.items : []).map((item, itemIndex) => ({
        ...item,
        orderId: order?._id,
        orderKey: `${order?._id || 'order'}-${item?._id || item?.name || 'item'}-${itemIndex}`,
        status: order?.status,
        payment: order?.payment,
        paymentMethod: order?.paymentMethod,
        date: order?.date,
        amount: order?.amount,
      })),
    )
    .sort((a, b) => (Number(b?.date) || 0) - (Number(a?.date) || 0))
}

const Orders = () => {
  const { backendUrl, token, currency, navigate, logout } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [accountLoading, setAccountLoading] = useState(true)

  const handleUnauthorized = useCallback(
    (message) => {
      const normalized = String(message || '').toLowerCase()
      const isUnauthorized =
        normalized.includes('not authorized') ||
        normalized.includes('invalid token') ||
        normalized.includes('jwt')

      if (!isUnauthorized) return false

      logout?.()
      return true
    },
    [logout],
  )

  const fetchCurrentAccount = useCallback(async () => {
    if (!token) {
      setAccount(null)
      setAccountLoading(false)
      return null
    }

    try {
      setAccountLoading(true)

      const response = await axios.post(
        `${backendUrl}/api/user/me`,
        {},
        { headers: { token } },
      )

      if (response?.data?.success) {
        setAccount(response.data.user || null)
        return response.data.user || null
      }

      if (handleUnauthorized(response?.data?.message)) return null
      setAccount(null)
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || ''
      if (handleUnauthorized(message)) return null
      console.error(error)
      setAccount(null)
    } finally {
      setAccountLoading(false)
    }

    return null
  }, [backendUrl, handleUnauthorized, token])

  const fetchOrderData = useCallback(
    async ({ silent = false } = {}) => {
      if (!token) {
        setOrderData([])
        setLoading(false)
        return []
      }

      try {
        if (!silent) {
          setLoading(true)
        }

        const response = await axios.post(
          `${backendUrl}/api/order/userorders`,
          {},
          { headers: { token } },
        )

        if (response?.data?.success) {
          const mappedOrders = mapOrdersToItems(response.data.orders)
          setOrderData(mappedOrders)
          return mappedOrders
        }

        if (handleUnauthorized(response?.data?.message)) return []
      } catch (error) {
        const message = error?.response?.data?.message || error?.message || ''
        if (handleUnauthorized(message)) return []
        console.error(error)
      } finally {
        if (!silent) {
          setLoading(false)
        }
      }

      return []
    },
    [backendUrl, handleUnauthorized, token],
  )

  const loadOrderData = useCallback(() => {
    fetchOrderData()
  }, [fetchOrderData])

  useEffect(() => {
    if (!token) {
      setAccount(null)
      setOrderData([])
      setLoading(false)
      setAccountLoading(false)
      return undefined
    }

    fetchCurrentAccount()
    fetchOrderData()

    const intervalId = window.setInterval(() => {
      fetchOrderData({ silent: true })
    }, ORDER_REFRESH_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [fetchCurrentAccount, fetchOrderData, token])

  const getStatusDotClass = (status) => STATUS_DOT_STYLES[status] || 'bg-gray-400'

  const getItemImage = (imageValue) => {
    if (Array.isArray(imageValue)) {
      return imageValue[0] || 'https://dummyimage.com/120x160/e5e7eb/6b7280&text=No+Image'
    }

    return imageValue || 'https://dummyimage.com/120x160/e5e7eb/6b7280&text=No+Image'
  }

  const isLoggedIn = Boolean(token)
  const isInitialLoading = isLoggedIn && (loading || accountLoading)
  const visibleOrders = isLoggedIn ? orderData : []

  return (
    <div className='border-t pt-16'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <div className='text-2xl'>
            <Title text1={'MY'} text2={'ORDERS'} />
          </div>
          <p className='mt-2 text-sm text-gray-500'>
            {account?.email
              ? `Current account: ${account.email}. Order status syncs from admin automatically every 10 seconds.`
              : 'Order status syncs from admin automatically every 10 seconds.'}
          </p>
        </div>

        {isLoggedIn ? (
          <button
            onClick={loadOrderData}
            disabled={loading}
            className='inline-flex items-center justify-center rounded-sm border px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-orange-400 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {loading ? 'Loading...' : 'Refresh status'}
          </button>
        ) : null}
      </div>

      <div className='mt-6'>
        {!isLoggedIn ? (
          <div className='border-y py-10 text-center'>
            <p className='text-sm text-gray-600'>Please sign in to view the orders placed by your account.</p>
            <button
              onClick={() => navigate('/login')}
              className='mt-4 rounded-sm border px-4 py-2 text-sm font-medium transition-colors hover:border-orange-400 hover:text-orange-500'
            >
              Go to login
            </button>
          </div>
        ) : isInitialLoading ? (
          <p className='border-y py-10 text-center text-sm text-gray-500'>Loading your orders...</p>
        ) : visibleOrders.length === 0 ? (
          <div className='border-y py-10 text-center'>
            <p className='text-sm text-gray-500'>No orders found for this account.</p>
            {account?.email ? (
              <p className='mt-2 text-xs text-gray-400'>Signed in as {account.email}</p>
            ) : null}
            <p className='mx-auto mt-2 max-w-xl text-xs text-gray-400'>
              Orders only appear for the same account that placed them. If admin can see the order but this page is empty, sign in with that account here.
            </p>
            <button
              onClick={() => navigate('/login')}
              className='mt-4 rounded-sm border px-4 py-2 text-sm font-medium transition-colors hover:border-orange-400 hover:text-orange-500'
            >
              Switch account
            </button>
          </div>
        ) : (
          visibleOrders.map((item) => (
            <div
              key={item.orderKey}
              className='flex flex-col gap-4 border-b border-t py-4 text-gray-700 md:flex-row md:items-center md:justify-between'
            >
              <div className='flex items-start gap-6 text-sm'>
                <img
                  className='w-16 rounded-md border border-gray-200 object-cover sm:w-20'
                  src={getItemImage(item.image)}
                  alt={item.name || 'Product'}
                />

                <div>
                  <p className='text-base font-medium sm:text-lg'>{item.name}</p>
                  <p className='mt-1 text-xs uppercase tracking-[0.18em] text-gray-400'>
                    Order #{String(item.orderId || '').slice(-8).toUpperCase()}
                  </p>

                  <div className='mt-2 flex flex-wrap items-center gap-3 text-base text-gray-700'>
                    <p>
                      {currency}
                      {Number(item.price || 0).toLocaleString('vi-VN')} VND
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size || 'Free'}</p>
                  </div>

                  <p className='mt-2'>
                    Date:{' '}
                    <span className='text-gray-400'>
                      {item.date ? new Date(item.date).toLocaleString('vi-VN') : '-'}
                    </span>
                  </p>

                  <p className='mt-2'>
                    Payment:{' '}
                    <span className='text-gray-400'>
                      {item.paymentMethod || 'COD'} {item.payment ? '(Paid)' : '(Pending)'}
                    </span>
                  </p>
                </div>
              </div>

              <div className='flex flex-col gap-3 md:min-w-[220px] md:items-end'>
                <div className='flex items-center gap-2'>
                  <p className={`h-2 min-w-2 rounded-full ${getStatusDotClass(item.status)}`} />
                  <p className='text-sm font-medium md:text-base'>{item.status || 'Unknown'}</p>
                </div>

                <button
                  onClick={loadOrderData}
                  className='rounded-sm border px-4 py-2 text-sm font-medium transition-colors hover:border-orange-400 hover:text-orange-500'
                >
                  Track order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders