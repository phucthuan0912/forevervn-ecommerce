import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';

function formatVndPrice(price) {
    const n = Number(price);
    if (!Number.isFinite(n)) return String(price ?? '');
    return `${n.toLocaleString('vi-VN')} VNĐ`;
}

function getSafeImage(imageValue) {
    if (Array.isArray(imageValue) && imageValue.length > 0) return imageValue[0];
    if (typeof imageValue === 'string' && imageValue.trim()) return imageValue;
    return 'https://dummyimage.com/600x800/e5e7eb/6b7280&text=No+Image';
}

const Cart = () => {
    const {
        products,
        cartItems,
        updateCartQty,
        removeFromCart,
        getCartAmount,
        delivery_fee,
        navigate,
    } = useContext(ShopContext);

    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];

        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                const qty = Number(cartItems[itemId][size]) || 0;
                if (qty > 0) {
                    tempData.push({
                        _id: itemId,
                        size,
                        quantity: qty,
                    });
                }
            }
        }

        setCartData(tempData);
    }, [cartItems]);

    return (
        <div className="space-y-6 py-4 sm:space-y-8 sm:py-6">
            <div className="section-shell px-5 py-6 sm:px-8 sm:py-8">
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                <section className="space-y-4">
                    {cartData.length === 0 ? (
                        <div className="section-shell px-6 py-12 text-center">
                            <p className="text-xl font-semibold text-slate-900">Giỏ hàng trống</p>
                            <p className="mt-3 text-sm leading-7 text-slate-500">
                                Hãy thêm một vài sản phẩm để tiếp tục mua sắm với trải nghiệm checkout mới.
                            </p>
                        </div>
                    ) : (
                        cartData.map((item, index) => {
                            const productData = products.find(
                                (p) => String(p._id ?? p.id) === String(item._id),
                            );

                            if (!productData) return null;

                            const imageSrc = getSafeImage(productData.image);
                            const availableSizes =
                                Array.isArray(productData.sizes) &&
                                productData.sizes.length > 0
                                    ? productData.sizes
                                    : ['Free'];

                            const displaySize = availableSizes.includes(item.size)
                                ? item.size
                                : availableSizes[0];

                            return (
                                <article
                                    key={`${item._id}-${item.size}-${index}`}
                                    className="section-shell flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-start gap-4 sm:gap-5">
                                        <img
                                            className="h-24 w-20 rounded-[20px] object-cover"
                                            src={imageSrc}
                                            alt={productData.name}
                                        />

                                        <div>
                                            <p className="text-base font-semibold text-slate-900 sm:text-lg">
                                                {productData.name}
                                            </p>

                                            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                                                <p>{formatVndPrice(productData.price)}</p>
                                                <p className="rounded-full border border-[var(--border)] bg-white px-3 py-1">
                                                    Size {displaySize}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <input
                                            onChange={(e) => {
                                                const val = Number(e.target.value);
                                                if (val <= 0 || e.target.value === '') {
                                                    removeFromCart(item._id, item.size);
                                                } else {
                                                    updateCartQty(item._id, item.size, val);
                                                }
                                            }}
                                            className="w-20 rounded-full border border-[var(--border)] px-4 py-3 text-center text-sm outline-none"
                                            type="number"
                                            min={0}
                                            value={item.quantity}
                                        />

                                        <button
                                            onClick={() => removeFromCart(item._id, item.size)}
                                            className="rounded-full border border-[var(--border)] p-3 hover:bg-slate-900"
                                            type="button"
                                        >
                                            <img
                                                className="w-4"
                                                src={assets.bin_icon}
                                                alt="Xoa"
                                            />
                                        </button>
                                    </div>
                                </article>
                            );
                        })
                    )}
                </section>

                <aside className="lg:sticky lg:top-[140px] lg:h-fit">
                    <div className="section-shell p-6 sm:p-7">
                        <Title text1={'CART'} text2={'TOTALS'} />

                        <div className="mt-6 space-y-4 text-sm text-slate-600">
                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p>{formatVndPrice(getCartAmount())}</p>
                            </div>

                            <div className="flex justify-between">
                                <p>Shipping Fee</p>
                                <p>{formatVndPrice(delivery_fee)}</p>
                            </div>

                            <div className="rounded-[22px] bg-slate-900 px-5 py-4 text-base font-semibold text-white">
                                <div className="flex justify-between">
                                    <p>Total</p>
                                    <p>{formatVndPrice(getCartAmount() + delivery_fee)}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/place-order')}
                            className="mt-6 w-full rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:bg-slate-800"
                            type="button"
                        >
                            Proceed To Checkout
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Cart;
