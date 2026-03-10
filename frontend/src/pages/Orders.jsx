import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {
    const { products, currency, cartItems } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);

    // Chuyển cartItems → array để render (giống Cart.jsx)
    useEffect(() => {
        const tempData = [];
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    const productInfo = products.find(p => p._id === itemId);
                    if (productInfo) {
                        tempData.push({
                            ...productInfo,
                            size: size,
                            quantity: cartItems[itemId][size],
                            date: '25, Jul, 2024',
                            status: 'Ready to ship',
                        });
                    }
                }
            }
        }
        setOrderData(tempData);
    }, [cartItems, products]);

    return (
        <div className='border-t pt-16'>

            {/* Tiêu đề */}
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            {/* Danh sách đơn hàng */}
            <div>
                {orderData.length === 0 ? (
                    <p className='text-gray-500 text-center py-10'>
                        Chưa có đơn hàng nào 📦
                    </p>
                ) : (
                    orderData.map((item, index) => (
                        <div
                            key={index}
                            className='py-4 border-t border-b text-gray-700
                                       flex flex-col md:flex-row md:items-center
                                       md:justify-between gap-4'
                        >
                            {/* Trái: Ảnh + Thông tin */}
                            <div className='flex items-start gap-6 text-sm'>
                                <img
                                    className='w-16 sm:w-20'
                                    src={item.image[0]}
                                    alt={item.name}
                                />
                                <div>
                                    <p className='sm:text-base font-medium'>
                                        {item.name}
                                    </p>
                                    <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                        <p>{currency}{item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Size: {item.size}</p>
                                    </div>
                                    <p className='mt-2'>
                                        Date:{' '}
                                        <span className='text-gray-400'>
                                            {item.date}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Phải: Trạng thái + Nút */}
                            <div className='md:w-1/2 flex justify-between items-center'>
                                {/* Trạng thái */}
                                <div className='flex items-center gap-2'>
                                    <span className='w-2 h-2 rounded-full bg-green-500' />
                                    <p className='text-sm'>{item.status}</p>
                                </div>

                                {/* Nút Track Order */}
                                <button className='border px-4 py-2 text-sm font-medium rounded-sm
                                                   hover:bg-gray-100 transition-all'>
                                    Track Order
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
