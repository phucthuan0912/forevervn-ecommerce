import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const PlaceOrder = () => {
    const { getCartAmount, delivery_fee, currency } = useContext(ShopContext);
    const navigate = useNavigate();
    const [method, setMethod] = useState('cod'); // mặc định COD

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

            {/* ── LEFT: Delivery Information ── */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                <div className='flex gap-3'>
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
                </div>
                <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
                <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
                <div className='flex gap-3'>
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
                </div>
                <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
            </div>

            {/* ── RIGHT: Cart Total + Payment ── */}
            <div className='mt-8'>

                {/* Cart Totals */}
                <div className='mt-8 min-w-80'>
                    <div className='text-xl sm:text-2xl'>
                        <Title text1={'CART'} text2={'TOTALS'} />
                    </div>
                    <div className='flex flex-col gap-2 mt-2 text-sm'>
                        <div className='flex justify-between'>
                            <p>Subtotal</p>
                            <p>{currency}{getCartAmount().toLocaleString('vi-VN')} VNĐ</p>
                        </div>
                        <hr />
                        <div className='flex justify-between'>
                            <p>Shipping Fee</p>
                            <p>{currency}{delivery_fee.toLocaleString('vi-VN')} VNĐ</p>
                        </div>
                        <hr />
                        <div className='flex justify-between font-bold'>
                            <p>Total</p>
                            <p>{currency}{(getCartAmount() + delivery_fee).toLocaleString('vi-VN')} VNĐ</p>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                {/* Payment Method */}
                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />

                    <div className='flex gap-3 flex-col lg:flex-row mt-4'>

                        {/* MoMo */}
                        <div
                            onClick={() => setMethod('momo')}
                            className={`flex items-center gap-3 border p-3 px-5 cursor-pointer min-w-[130px]
                                ${method === 'momo' ? 'border-green-500' : 'border-gray-300'}`}
                        >
                            <span className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0
                                ${method === 'momo' ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}
                            />
                            <p className='text-pink-600 font-bold text-sm mx-4'>MoMo</p>
                        </div>

                        {/* COD */}
                        <div
                            onClick={() => setMethod('cod')}
                            className={`flex items-center gap-3 border p-3 px-5 cursor-pointer min-w-[130px]
                                ${method === 'cod' ? 'border-green-500' : 'border-gray-300'}`}
                        >
                            <span className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0
                                ${method === 'cod' ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}
                            />
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>

                    </div>
                </div>

                {/* Nút Place Order */}
                <div className='w-full text-end mt-8'>
                    <button
                        onClick={() => navigate('/orders')}
                        className='bg-black text-white text-sm px-16 py-3'
                    >
                        PLACE ORDER
                    </button>
                </div>

            </div>
        </div>
    )
}

export default PlaceOrder
