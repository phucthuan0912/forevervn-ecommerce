import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
    return (
        <section className='grid gap-4 py-10 sm:grid-cols-2 sm:py-14 lg:grid-cols-3'>
            <article className='section-shell p-6 text-center sm:p-7'>
                <div className='mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)]'>
                    <img src={assets.exchange_icon} className='w-7' alt='' />
                </div>
                <p className='text-base font-semibold text-slate-900'>Easy Exchange Policy</p>
                <p className='mt-3 text-sm leading-7 text-slate-500'>
                    Chúng tôi hỗ trợ đổi hàng dễ dàng, không rắc rối.
                </p>
            </article>

            <article className='section-shell p-6 text-center sm:p-7'>
                <div className='mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)]'>
                    <img src={assets.quality_icon} className='w-7' alt='' />
                </div>
                <p className='text-base font-semibold text-slate-900'>7 Days Return Policy</p>
                <p className='mt-3 text-sm leading-7 text-slate-500'>
                    Hoàn trả hàng miễn phí trong vòng 7 ngày.
                </p>
            </article>

            <article className='section-shell p-6 text-center sm:p-7'>
                <div className='mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)]'>
                    <img src={assets.support_img} className='w-7' alt='' />
                </div>
                <p className='text-base font-semibold text-slate-900'>Best Customer Support</p>
                <p className='mt-3 text-sm leading-7 text-slate-500'>
                    Hỗ trợ khách hàng 24/7, luôn sẵn sàng giải đáp.
                </p>
            </article>
        </section>
    )
}

export default OurPolicy
