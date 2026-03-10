import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
    return (
        <div>

            {/* ── CONTACT US ── */}
            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'CONTACT'} text2={'US'} />
            </div>

            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
                <img
                    className='w-full md:max-w-[480px]'
                    src={assets.contact_img}
                    alt="Contact"
                />

                <div className='flex flex-col justify-center items-start gap-6'>

                    {/* Our Store */}
                    <p className='font-semibold text-xl text-gray-600'>Our Store</p>
                    <p className='text-gray-500'>
                        64 Nhơn Hòa 5, Hoà An, Liên Chiểu, <br/> Đà Nẵng 550000, Việt Nam
                    </p>
                    <p className='text-gray-500'>
                        Tel: (+84) 555-0132 <br />
                        Email: admin@forever.com
                    </p>

                    {/* Careers */}
                    <p className='font-semibold text-xl text-gray-600'>
                        Careers at Forever
                    </p>
                    <p className='text-gray-500'>
                        Tìm hiểu thêm về đội ngũ và cơ hội việc làm của chúng tôi.
                    </p>
                    <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
                        Explore Jobs
                    </button>

                </div>
            </div>

            {/* ── LIÊN HỆ TRỰC TIẾP ── */}
            <div className='text-center text-2xl mb-6'>
                <Title text1={'LIÊN HỆ'} text2={'TRỰC TIẾP'} />
            </div>

            <div className='flex flex-col md:flex-row justify-center gap-8 mb-20 text-center text-gray-600'>
                <div className='border px-10 py-8 flex flex-col gap-3'>
                    <p className='font-semibold text-lg'>📧 Email</p>
                    <p>thuanphuc12b9@gmail.com</p>
                </div>
                <div className='border px-10 py-8 flex flex-col gap-3'>
                    <p className='font-semibold text-lg'>📞 Điện thoại</p>
                    <p>0327 906 061</p>
                </div>
            </div>

            {/* ── NEWSLETTER ── */}
            <NewsletterBox />

        </div>
    )
}

export default Contact
