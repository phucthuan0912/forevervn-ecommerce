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
            className="grid gap-6 py-4 sm:py-6 lg:grid-cols-[minmax(0,1fr)_380px]"
        >
            <section className="section-shell px-5 py-6 sm:px-8 sm:py-8">
                <div className="mb-8">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                        type="text"
                        placeholder="First name"
                        required
                    />
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                        type="text"
                        placeholder="Last name"
                        required
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="sm:col-span-2 rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                        type="email"
                        placeholder="Email address"
                        required
                    />
                    <input
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className="sm:col-span-2 rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                        type="text"
                        placeholder="Street"
                        required
                    />
                    <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                        type="text"
                        placeholder="City"
                        required
                    />
                    <input
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                        type="text"
                        placeholder="State"
                        required
                    />
                    <input
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        className="rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                        type="text"
                        placeholder="Zipcode"
                        required
                    />
                    <input
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                        type="text"
                        placeholder="Country"
                        required
                    />
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="sm:col-span-2 rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                        type="text"
                        placeholder="Phone"
                        required
                    />
                </div>
            </section>

            <aside className="lg:sticky lg:top-[140px] lg:h-fit">
                <div className="section-shell p-6 sm:p-7">
                    <Title text1={'CART'} text2={'TOTALS'} />

                    <div className="mt-6 space-y-4 text-sm text-slate-600">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>
                                {currency}
                                {getCartAmount().toLocaleString('vi-VN')} VND
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <p>Shipping Fee</p>
                            <p>
                                {currency}
                                {delivery_fee.toLocaleString('vi-VN')} VND
                            </p>
                        </div>

                        <div className="rounded-[22px] bg-slate-900 px-5 py-4 text-base font-semibold text-white">
                            <div className="flex justify-between">
                                <p>Total</p>
                                <p>
                                    {currency}
                                    {(getCartAmount() + delivery_fee).toLocaleString('vi-VN')} VND
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 rounded-[24px] border border-[var(--border)] bg-white p-5">
                        <Title text1={'PAYMENT'} text2={'METHOD'} />

                        <div className="mt-4 flex items-center gap-3 rounded-[20px] border border-emerald-200 bg-emerald-50 px-4 py-4">
                            <span className="h-3.5 w-3.5 rounded-full bg-emerald-500" />
                            <p className="text-sm font-medium text-slate-600">
                                CASH ON DELIVERY
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 w-full rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60"
                    >
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </aside>
        </form>
    );
};

export default PlaceOrder;
