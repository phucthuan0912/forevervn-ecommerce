import React, { useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { ArrowRight } from 'lucide-react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const getNextPromoDeadline = () => {
    const now = new Date()
    const deadline = new Date(now)
    const day = deadline.getDay()
    const daysUntilSunday = day === 0 ? 7 : 7 - day

    deadline.setDate(deadline.getDate() + daysUntilSunday)
    deadline.setHours(23, 59, 59, 999)
    return deadline
}

const buildCountdown = (targetDate) => {
    const diff = targetDate.getTime() - Date.now()
    if (diff <= 0) {
        return { days: '00', hours: '00', minutes: '00', seconds: '00' }
    }

    const totalSeconds = Math.floor(diff / 1000)
    const days = Math.floor(totalSeconds / (60 * 60 * 24))
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
    const seconds = totalSeconds % 60

    return {
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
    }
}

const timerItems = [
    { key: 'days', label: 'Days' },
    { key: 'hours', label: 'Hrs' },
    { key: 'minutes', label: 'Mins' },
    { key: 'seconds', label: 'Secs' },
]

const NewsletterBox = ({ featured = false }) => {
    const { backendUrl } = useContext(ShopContext)
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [promoDeadline, setPromoDeadline] = useState(() => getNextPromoDeadline())
    const [countdown, setCountdown] = useState(() => buildCountdown(getNextPromoDeadline()))

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            const next = buildCountdown(promoDeadline)

            if (Object.values(next).every((value) => value === '00')) {
                const nextDeadline = getNextPromoDeadline()
                setPromoDeadline(nextDeadline)
                setCountdown(buildCountdown(nextDeadline))
                return
            }

            setCountdown(next)
        }, 1000)

        return () => window.clearInterval(intervalId)
    }, [promoDeadline])

    const timerValues = useMemo(
        () => timerItems.map((item) => ({ ...item, value: countdown[item.key] })),
        [countdown],
    )

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        if (loading) return

        try {
            setLoading(true)

            const { data } = await axios.post(`${backendUrl}/api/system/newsletter/subscribe`, {
                email: email.trim(),
            })

            if (data?.success) {
                toast.success(data.message || 'Voucher SUBSCRIBE has been sent to your email')
                setEmail('')
                return
            }

            toast.error(data?.message || 'Cannot subscribe right now')
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || 'Cannot subscribe right now')
        } finally {
            setLoading(false)
        }
    }

    if (!featured) {
        return (
            <section className='section-shell relative overflow-hidden px-5 py-8 text-center sm:px-8 sm:py-10'>
                <div className='absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(221,232,243,0.9),transparent_60%)] md:block' />

                <div className='relative'>
                    <p className='display-font text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl'>
                        Subscribe now & get 20% off
                    </p>

                    <p className='mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base'>
                        Đăng ký nhận bản tin để nhận ưu đãi độc quyền, cập nhật sản phẩm mới
                        và nhiều khuyến mãi hấp dẫn. Mã voucher SUBSCRIBE sẽ được gửi về email của bạn.
                    </p>

                    <form
                        onSubmit={onSubmitHandler}
                        className='mx-auto mt-6 flex w-full max-w-2xl flex-col gap-3 sm:flex-row'
                    >
                        <input
                            className='w-full rounded-full border border-[var(--border)] bg-white px-5 py-4 text-sm outline-none shadow-[0_10px_25px_rgba(15,23,42,0.05)]'
                            type='email'
                            placeholder='Enter your email'
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <button
                            type='submit'
                            disabled={loading}
                            className='rounded-full bg-slate-900 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:px-10'
                        >
                            {loading ? 'Sending...' : 'Subscribe'}
                        </button>
                    </form>
                </div>
            </section>
        )
    }

    return (
        <section className='section-shell relative overflow-hidden px-5 py-8 sm:px-8 sm:py-10'>
            <div className='absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(221,232,243,0.9),transparent_60%)] md:block' />

            <div className='relative grid gap-6 xl:grid-cols-[0.92fr_1.08fr] xl:items-center'>
                <div className='overflow-hidden rounded-[28px] border border-[#f5d9b4] bg-[linear-gradient(135deg,#fffaf2,#fff7ed)] px-5 py-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)] sm:px-7 sm:py-8'>
                    <p className='text-xs font-semibold uppercase tracking-[0.28em] text-[#b45309]'>
                        Limited-time subscriber perk
                    </p>

                    <h3 className='display-font mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl'>
                        Unlock voucher <span className='text-[#b45309]'>SUBSCRIBE</span> before the timer ends.
                    </h3>

                    <p className='mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base'>
                        Create urgency the right way: give visitors a reason to act now,
                        then send the offer straight to their email so they can use it later.
                    </p>

                    <div className='mt-6 grid grid-cols-4 gap-3'>
                        {timerValues.map((item) => (
                            <div
                                key={item.key}
                                className='rounded-[20px] border border-[#f5d9b4] bg-white/80 px-3 py-4 text-center'
                            >
                                <div className='text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl'>
                                    {item.value}
                                </div>
                                <div className='mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400'>
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-6 flex flex-wrap items-center gap-4'>
                        <Link
                            to='/collection'
                            className='inline-flex items-center gap-3 text-xl font-medium text-slate-900'
                        >
                            <span>Shop now</span>
                            <span className='flex h-14 w-14 items-center justify-center rounded-full bg-[#d5a574] text-white shadow-[0_16px_30px_rgba(213,165,116,0.35)]'>
                                <ArrowRight className='h-6 w-6' />
                            </span>
                        </Link>
                    </div>
                </div>

                <div className='text-center xl:text-left'>
                    <p className='display-font text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl'>
                        Subscribe now & get 20% off
                    </p>

                    <p className='mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base xl:mx-0'>
                        Đăng ký nhận bản tin để nhận ưu đãi độc quyền, cập nhật sản phẩm mới
                        và nhiều khuyến mãi hấp dẫn. Mã voucher sẽ được gửi trực tiếp về email của bạn.
                    </p>

                    <div className='mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-[#fff7ed] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#b45309] xl:mx-0'>
                        Subscriber-only voucher delivered by email
                    </div>

                    <form
                        onSubmit={onSubmitHandler}
                        className='mx-auto mt-6 flex w-full max-w-2xl flex-col gap-3 sm:flex-row xl:mx-0'
                    >
                        <input
                            className='w-full rounded-full border border-[var(--border)] bg-white px-5 py-4 text-sm outline-none shadow-[0_10px_25px_rgba(15,23,42,0.05)]'
                            type='email'
                            placeholder='Enter your email'
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <button
                            type='submit'
                            disabled={loading}
                            className='rounded-full bg-slate-900 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:px-10'
                        >
                            {loading ? 'Sending...' : 'Subscribe'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default NewsletterBox
