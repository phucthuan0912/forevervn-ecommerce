import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
    return (
        <div className='space-y-6 py-4 sm:space-y-8 sm:py-6'>
            <section className='section-shell px-5 py-6 sm:px-8 sm:py-8'>
                <div className='mb-8 text-center'>
                    <Title text1={'CONTACT'} text2={'US'} />
                </div>

                <div className='grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]'>
                    <div className='overflow-hidden rounded-[28px] border border-white/70 bg-white/70 p-3 shadow-[0_22px_45px_rgba(15,23,42,0.1)]'>
                        <img
                            className='w-full rounded-[22px] object-cover'
                            src={assets.contact_img}
                            alt="Contact"
                        />
                    </div>

                    <div className='space-y-6'>
                        <div className='rounded-[24px] border border-[var(--border)] bg-white p-5'>
                            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-400'>Our Store</p>
                            <p className='mt-4 text-sm leading-7 text-slate-500 sm:text-base'>
                                64 Nhơn Hòa 5, Hòa An, Liên Chiểu, <br /> Đà Nẵng 550000, Việt Nam
                            </p>
                            <p className='mt-4 text-sm leading-7 text-slate-500 sm:text-base'>
                                Tel: (+84) 555-0132 <br />
                                Email: admin@forever.com
                            </p>
                        </div>

                        <div className='rounded-[24px] border border-[var(--border)] bg-white p-5'>
                            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-400'>
                                Careers at Forever
                            </p>
                            <p className='mt-4 text-sm leading-7 text-slate-500 sm:text-base'>
                                Tìm hiểu thêm về đội ngũ và cơ hội việc làm của chúng tôi.
                            </p>
                            <button className='mt-5 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:bg-slate-800'>
                                Explore Jobs
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className='space-y-5'>
                <div className='text-center'>
                    <Title text1={'LIÊN HỆ'} text2={'TRỰC TIẾP'} />
                </div>

                <div className='grid gap-4 md:grid-cols-2'>
                    <div className='section-shell p-6 text-center sm:p-7'>
                        <p className='text-sm font-semibold uppercase tracking-[0.22em] text-slate-400'>Email</p>
                        <p className='mt-4 text-lg font-semibold text-slate-900'>thuanphuc12b9@gmail.com</p>
                    </div>

                    <div className='section-shell p-6 text-center sm:p-7'>
                        <p className='text-sm font-semibold uppercase tracking-[0.22em] text-slate-400'>Điện thoại</p>
                        <p className='mt-4 text-lg font-semibold text-slate-900'>0327 906 061</p>
                    </div>
                </div>
            </section>

            <NewsletterBox />
        </div>
    )
}

export default Contact
