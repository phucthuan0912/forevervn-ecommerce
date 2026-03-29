import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <section className='section-shell relative overflow-hidden px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(221,232,243,0.8),transparent_28%)]' />

      <div className='relative grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12'>
        <div className='max-w-xl'>
          <div className='inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 shadow-[0_10px_24px_rgba(15,23,42,0.06)]'>
            <span className='h-2 w-2 rounded-full bg-slate-900' />
            OUR BESTSELLERS
          </div>

          <h1 className='display-font mt-6 text-4xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-5xl lg:text-6xl'>
            Latest Arrivals
          </h1>

          <p className='mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base'>
            Khám phá những thiết kế mới nổi bật với bố cục gọn gàng, trải nghiệm mua sắm mượt mà và hình ảnh sản phẩm rõ ràng trên mọi thiết bị.
          </p>

          <div className='mt-8 flex flex-wrap items-center gap-4'>
            <Link
              to='/collection'
              className='rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:bg-slate-800'
            >
              Shop Now
            </Link>

            <div className='flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/80 px-5 py-3 text-sm font-medium text-slate-500'>
              <span className='h-px w-8 bg-slate-300' />
              Smooth on desktop, tablet and mobile
            </div>
          </div>
        </div>

        <div className='relative'>
          <div className='absolute -left-6 top-8 hidden h-28 w-28 rounded-full bg-white/70 blur-2xl md:block' />

          <div className='overflow-hidden rounded-[28px] border border-white/70 bg-white/70 p-3 shadow-[0_28px_50px_rgba(15,23,42,0.12)]'>
            <img
              className='h-full w-full rounded-[22px] object-cover'
              src={assets.hero_img}
              alt='Latest arrivals'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
