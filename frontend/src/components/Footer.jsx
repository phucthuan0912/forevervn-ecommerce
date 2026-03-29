import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className='mt-16 sm:mt-20'>
            <div className='section-shell grid gap-10 px-5 py-8 text-sm sm:px-8 lg:grid-cols-[2fr_1fr_1fr] lg:gap-14'>
                <div>
                    <img src={assets.logo} className='mb-6 w-32' alt="logo" />
                    <p className='max-w-lg leading-7 text-slate-500'>
                        Lorem Ipsum is dummy text of the printing and typesetting 
                        industry. Lorem Ipsum has been the industry's standard dummy 
                        text ever since the 1500s, when an unknown printer took a 
                        galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>

                <div>
                    <p className='mb-5 text-lg font-semibold text-slate-900'>COMPANY</p>
                    <ul className='flex flex-col gap-3 text-slate-500'>
                        <li><Link className='hover:text-slate-900' to='/'>Home</Link></li>
                        <li><Link className='hover:text-slate-900' to='/about'>About us</Link></li>
                        <li><Link className='hover:text-slate-900' to='/collection'>Delivery</Link></li>
                        <li><Link className='hover:text-slate-900' to='/contact'>Privacy policy</Link></li>
                    </ul>
                </div>

                <div>
                    <p className='mb-5 text-lg font-semibold text-slate-900'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-3 text-slate-500'>
                        <li>0327906061</li>
                        <li>thuanphuc12b9@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div className='px-2 py-6 text-center text-sm text-slate-500'>
                <p>
                    Copyright 2026@ forever.com - All Right Reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
