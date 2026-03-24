import React, { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const initialAddress = {
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
};

const PlaceOrder = () => {
    const {
        products,
        cartItems,
        getCartAmount,
        delivery_fee,
        currency,
        backendUrl,
        token,
        updateCartQty
    } = useContext(ShopContext);

    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialAddress);
    const [loading, setLoading] = useState(false);

    const orderItems = useMemo(() => {
        const items = [];

        for (const itemId in cartItems) {
            const productInfo = products.find(
                (product) => String(product._id || product.id) === String(itemId)
            );

            if (!productInfo) {
                continue;
            }

            for (const size in cartItems[itemId]) {
                const quantity = Number(cartItems[itemId][size]) || 0;

                if (quantity <= 0) {
                    continue;
                }

                items.push({
                    _id: productInfo._id,
                    name: productInfo.name,
                    price: productInfo.price,
                    image: productInfo.image,
                    size,
                    quantity
                });
            }
        }

        return items;
    }, [cartItems, products]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const clearLocalCart = () => {
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                updateCartQty(itemId, size, 0);
            }
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (loading) {
            return;
        }

        if (!token) {
            toast.error('Vui long dang nhap de dat hang');
            navigate('/login');
            return;
        }

        if (orderItems.length === 0) {
            toast.error('Gio hang dang trong');
            return;
        }

        try {
            setLoading(true);

            const payload = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            };

            const response = await axios.post(
                `${backendUrl}/api/order/place`,
                payload,
                { headers: { token } }
            );

            if (response?.data?.success) {
                clearLocalCart();
                toast.success('Dat hang COD thanh cong');
                navigate('/orders');
                return;
            }

            toast.error(response?.data?.message || 'Khong the dat hang');
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                'Khong the ket noi server';

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
        >
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                <div className="flex gap-3">
                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="First name"
                        required
                    />
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Last name"
                        required
                    />
                </div>

                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="email"
                    placeholder="Email address"
                    required
                />

                <input
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="text"
                    placeholder="Street"
                    required
                />

                <div className="flex gap-3">
                    <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="City"
                        required
                    />
                    <input
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="State"
                        required
                    />
                </div>

                <div className="flex gap-3">
                    <input
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Zipcode"
                        required
                    />
                    <input
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Country"
                        required
                    />
                </div>

                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="text"
                    placeholder="Phone"
                    required
                />
            </div>

            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <div className="text-xl sm:text-2xl">
                        <Title text1={'CART'} text2={'TOTALS'} />
                    </div>

                    <div className="flex flex-col gap-2 mt-2 text-sm">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>
                                {currency}
                                {getCartAmount().toLocaleString('vi-VN')} VND
                            </p>
                        </div>

                        <hr />

                        <div className="flex justify-between">
                            <p>Shipping Fee</p>
                            <p>
                                {currency}
                                {delivery_fee.toLocaleString('vi-VN')} VND
                            </p>
                        </div>

                        <hr />

                        <div className="flex justify-between font-bold">
                            <p>Total</p>
                            <p>
                                {currency}
                                {(getCartAmount() + delivery_fee).toLocaleString('vi-VN')} VND
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <Title text1={'PAYMENT'} text2={'METHOD'} />

                    <div className="flex gap-3 flex-col lg:flex-row mt-4">
                        <div className="flex items-center gap-3 border p-3 px-5 min-w-[130px] border-green-500">
                            <span className="w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 bg-green-500 border-green-500" />
                            <p className="text-gray-500 text-sm font-medium mx-4">
                                CASH ON DELIVERY
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full text-end mt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white text-sm px-16 py-3 disabled:opacity-60"
                    >
                        {loading ? 'PROCESSING...' : 'PLACE ORDER'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
