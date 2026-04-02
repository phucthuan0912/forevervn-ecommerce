import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl as defaultBackendUrl } from '../config'
import { DollarSign, ShoppingBag, Boxes, CircleCheckBig, Package, TrendingUp, PieChart as PieIcon, Download, HandCoins, Activity, Users, Clock, Database } from 'lucide-react'
import { 
  ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts'

const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

const getStatusClass = (status) => {
  if (status === 'Delivered') return 'border-emerald-200 bg-emerald-50 text-emerald-700'
  if (status === 'Shipped' || status === 'Out for Delivery') return 'border-sky-200 bg-sky-50 text-sky-700'
  if (status === 'Packing') return 'border-amber-200 bg-amber-50 text-amber-700'
  if (status === 'Cancelled') return 'border-rose-200 bg-rose-50 text-rose-700'
  return 'border-gray-200 bg-gray-50 text-gray-600'
}

const Dashboard = ({ token, backendUrl: backendUrlFromProps }) => {
  const [stats, setStats] = useState(null)
  const [charts, setCharts] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const apiBaseUrl = useMemo(
    () => (backendUrlFromProps || defaultBackendUrl || '').trim().replace(/\/+$/, ''),
    [backendUrlFromProps],
  )

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
      }),
    [],
  )

  const handleUnauthorized = useCallback((message) => {
    const normalized = (message || '').toLowerCase()
    if (!normalized.includes('not authorized')) return false

    toast.error('Session expired, please login again')
    localStorage.removeItem('token')
    setTimeout(() => window.location.reload(), 400)
    return true
  }, [])

  const fetchData = useCallback(async () => {
    if (!apiBaseUrl || !token) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const [statsRes, orderRes] = await Promise.all([
        axios.get(`${apiBaseUrl}/api/dashboard/stats`, { headers: { token } }),
        axios.post(`${apiBaseUrl}/api/order/list`, {}, { headers: { token } }),
      ])

      if (statsRes.data?.success) {
        setStats(statsRes.data.stats)
        setCharts(statsRes.data.charts)
      }

      if (orderRes.data?.success) {
        const sorted = (orderRes.data.orders || []).sort((a,b) => b.date - a.date).slice(0, 5);
        setRecentOrders(sorted)
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Cannot load dashboard'
      if (handleUnauthorized(message)) return
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [apiBaseUrl, handleUnauthorized, token])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleExport = useCallback(async () => {
    if (!apiBaseUrl || !token) return;
    try {
      const response = await axios.get(`${apiBaseUrl}/api/dashboard/export-orders`, {
        headers: { token },
        responseType: 'blob' // Important for file download
      });
      
      const url = window.URL.createObjectURL(new Blob(['\uFEFF' + response.data], { type: 'text/csv;charset=utf-8;' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'DonHang_BaoCao.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Xuất báo cáo thành công!');
    } catch (error) {
       toast.error('Lỗi xuất báo cáo!');
    }
  }, [apiBaseUrl, token]);

  const totals = useMemo(() => {
    if (!stats) return []
    return [
      {
        label: 'Gross Revenue',
        value: currencyFormatter.format(stats.totalRevenue),
        note: `Total sales`,
        icon: DollarSign,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
      },
      {
        label: 'Cost of Goods Sold',
        value: currencyFormatter.format(stats.totalCOGS || 0),
        note: `Total direct costs`,
        icon: ShoppingBag,
        color: 'text-rose-600',
        bg: 'bg-rose-50',
      },
      {
        label: 'Gross Profit',
        value: currencyFormatter.format(stats.totalProfit || 0),
        note: `Revenue - COGS`,
        icon: HandCoins,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
      },
      {
        label: 'Gross Margin',
        value: `${stats.grossMargin || 0}%`,
        note: `Profitability Ratio`,
        icon: TrendingUp,
        color: 'text-sky-600',
        bg: 'bg-sky-50',
      },
      {
        label: 'Inventory Value',
        value: currencyFormatter.format(stats.inventoryValue || 0),
        note: `${stats.totalStockQty || 0} items in stock`,
        icon: Database,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
      },
      {
        label: 'Total Customers',
        value: stats.totalCustomers || 0,
        note: `Registered Users`,
        icon: Users,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
      },
      {
        label: 'Pending Orders',
        value: stats.pendingOrders || 0,
        note: `Awaiting action`,
        icon: Clock,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
      },
      {
        label: 'Live Products',
        value: stats.totalProducts,
        note: `Items in catalog`,
        icon: Boxes,
        color: 'text-violet-600',
        bg: 'bg-violet-50',
      },
    ]
  }, [currencyFormatter, stats])

  const getCustomerName = (address = {}) =>
    address?.fullName || [address?.firstName, address?.lastName].filter(Boolean).join(' ') || 'Unknown customer'

  if (loading && !stats) return <div className="p-10 text-center text-slate-500 font-medium animate-pulse">Loading dashboard statistics...</div>

  return (
    <div className='w-full px-4 py-8 md:px-8'>
      <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-slate-900'>Financial Dashboard</h1>
          <p className='text-sm text-slate-500 mt-1'>Visual store performance and sales analysis.</p>
        </div>
        <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className='inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50'
            >
              <Download size={16} />
              Export CSV
            </button>
            <button
              onClick={fetchData}
              disabled={loading}
              className='inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60'
            >
              <Activity size={16} className="mr-2" />
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </button>
        </div>
      </div>

      <div className='mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {totals.map(({ label, value, note, icon: Icon, color, bg }) => (
          <div key={label} className='group flex flex-col rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100/50'>
            <div className='flex items-center justify-between pb-4'>
              <h3 className='text-[13px] font-semibold uppercase tracking-wider text-slate-400'>{label}</h3>
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${bg} transition-transform group-hover:scale-110`}>
                <Icon size={20} className={color} />
              </div>
            </div>
            <div className='text-3xl font-bold text-slate-900 tracking-tight'>{value}</div>
            <p className='mt-3 text-xs font-medium text-slate-400'>{note}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className='grid gap-8 lg:grid-cols-3 mb-12'>
         <div className="lg:col-span-2 rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900">Revenue Analysis</h3>
               <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-sky-500"></span>
                  Last 12 Months
               </div>
            </div>
            <div className="h-[360px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={charts?.financial || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.12}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorCogs" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8'}} tickFormatter={(value) => `${(value/1000000).toFixed(1)}M`} />
                    <Tooltip 
                      cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                      contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', padding: '12px 16px' }}
                      formatter={(value, name) => [currencyFormatter.format(value), name.charAt(0).toUpperCase() + name.slice(1)]}
                    />
                    <Legend verticalAlign="top" height={40} iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 500}} />
                    <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="cogs" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorCogs)" />
                  </ComposedChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
                  <PieIcon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Category Mix</h3>
                  <p className="text-xs text-slate-400">Product distribution</p>
                </div>
            </div>
            <div className="h-[360px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={charts?.categories || []}
                      cx="51%"
                      cy="45%"
                      innerRadius={80}
                      outerRadius={105}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {(charts?.categories || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={4} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={50} iconType="circle" wrapperStyle={{fontSize: '13px', paddingTop: '20px', fontWeight: 500}} />
                  </PieChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      <div className='max-w-[1240px]'>
        <div className="mb-6 flex items-center justify-between">
          <h2 className='text-xl font-bold text-slate-900'>Recent Activities</h2>
          <button className="text-sm font-semibold text-sky-600 hover:text-sky-700">View All</button>
        </div>
        
        <div className='w-full overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-sm'>
          <div className='hidden grid-cols-[80px_1fr_1fr_1fr_140px] items-center border-b border-slate-50 bg-slate-50/50 px-8 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider md:grid'>
            <span>Order</span>
            <span>Customer</span>
            <span>Date</span>
            <span>Grand Total</span>
            <span className='text-right'>Ship Status</span>
          </div>

          {!recentOrders || recentOrders.length === 0 ? (
            <div className='px-8 py-16 text-center text-sm text-slate-400 font-medium italic'>
              No recent orders found in the database.
            </div>
          ) : (
            <div className='divide-y divide-slate-50'>
              {recentOrders.map((order, index) => {
                const customer = getCustomerName(order?.address)
                return (
                  <div
                    key={order?._id}
                    className={`grid md:grid-cols-[80px_1fr_1fr_1fr_140px] items-center px-8 py-5 text-sm transition-colors hover:bg-slate-50/80 cursor-pointer`}
                  >
                    <div className='hidden md:flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 group-hover:bg-white'>
                      <Package size={22} className='text-slate-300' />
                    </div>

                    <div className='mb-2 md:mb-0'>
                      <p className='font-bold text-slate-900'>{customer}</p>
                      <p className='text-[11px] font-medium text-slate-400'>
                        #{String(order?._id || '').slice(-8).toUpperCase()}
                      </p>
                    </div>

                    <div className='mb-2 md:mb-0 text-slate-500 font-medium'>
                      {order?.date ? new Date(order.date).toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                    </div>

                    <div className='mb-3 md:mb-0 font-bold text-slate-900'>
                      {currencyFormatter.format(Number(order?.amount) || 0)}
                    </div>

                    <div className='md:text-right'>
                      <span className={`inline-flex rounded-xl border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider ${getStatusClass(order?.status)}`}>
                        {order?.status || 'Pending'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
