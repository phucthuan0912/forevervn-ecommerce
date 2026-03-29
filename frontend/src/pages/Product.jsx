import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

function formatVndPrice(price) {
    const n = Number(price);
    if (!Number.isFinite(n)) return String(price ?? '');
    return `${n.toLocaleString('vi-VN')} VNĐ`;
}

function ensureImageArray(imageValue) {
    if (Array.isArray(imageValue) && imageValue.length > 0) return imageValue;
    if (typeof imageValue === 'string' && imageValue.trim()) return [imageValue.trim()];
    return ['https://dummyimage.com/600x800/e5e7eb/6b7280&text=No+Image'];
}

function ensureSizeArray(sizeValue) {
    if (Array.isArray(sizeValue) && sizeValue.length > 0) return sizeValue;
    return ['Free'];
}

const Product = () => {
    const { productId } = useParams();
    const { products, addToCart } = useContext(ShopContext);

    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    const fetchProductData = async () => {
        const item = products.find(
            (p) => String(p._id ?? p.id) === String(productId),
        );

        if (!item) {
            setProductData(false);
            setImage('');
            setSize('');
            return;
        }

        const normalizedImages = ensureImageArray(item.image);
        const normalizedSizes = ensureSizeArray(item.sizes);
        const normalizedProduct = {
            ...item,
            image: normalizedImages,
            sizes: normalizedSizes,
        };

        setProductData(normalizedProduct);
        setImage(normalizedImages[0]);
        setSize(normalizedSizes[0]);
    };

    useEffect(() => {
        fetchProductData();
        window.scrollTo(0, 0);
    }, [productId, products]);

    return productData ? (
        <div className="space-y-8 py-4 sm:space-y-10 sm:py-6">
            <section className="section-shell px-5 py-6 sm:px-8 sm:py-8">
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
                    <div className="grid gap-4 lg:grid-cols-[110px_minmax(0,1fr)]">
                        <div className="no-scrollbar flex gap-3 overflow-x-auto lg:flex-col lg:overflow-y-auto">
                            {productData.image.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setImage(item)}
                                    className={`overflow-hidden rounded-[22px] border bg-white ${
                                        image === item
                                            ? 'border-slate-900 shadow-[0_14px_30px_rgba(15,23,42,0.12)]'
                                            : 'border-[var(--border)]'
                                    }`}
                                    type="button"
                                >
                                    <img
                                        src={item}
                                        className="h-24 w-20 object-cover lg:h-28 lg:w-full"
                                        alt={productData.name}
                                    />
                                </button>
                            ))}
                        </div>

                        <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/70 p-3 shadow-[0_22px_45px_rgba(15,23,42,0.1)]">
                            <img
                                className="aspect-[4/5] w-full rounded-[22px] object-cover"
                                src={image}
                                alt={productData.name}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                                Product Details
                            </p>
                            <h1 className="display-font mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl">
                                {productData.name}
                            </h1>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <img src={assets.star_icon} alt="" className="w-4" />
                            <img src={assets.star_icon} alt="" className="w-4" />
                            <img src={assets.star_icon} alt="" className="w-4" />
                            <img src={assets.star_icon} alt="" className="w-4" />
                            <img src={assets.star_dull_icon} alt="" className="w-4" />
                            <span className="pl-1">(122)</span>
                        </div>

                        <p className="text-3xl font-semibold text-slate-900">
                            {formatVndPrice(productData.price)}
                        </p>

                        <p className="max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                            {productData.description}
                        </p>

                        <div className="rounded-[24px] border border-[var(--border)] bg-white p-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Select Size
                            </p>

                            <div className="mt-4 flex flex-wrap gap-3">
                                {productData.sizes.map((item, index) => (
                                    <button
                                        onClick={() => setSize(item)}
                                        className={`rounded-full px-5 py-3 text-sm font-semibold ${
                                            item === size
                                                ? 'bg-slate-900 text-white shadow-[0_14px_30px_rgba(15,23,42,0.16)]'
                                                : 'border border-[var(--border)] bg-slate-50 text-slate-600 hover:border-slate-900 hover:text-slate-900'
                                        }`}
                                        key={index}
                                        type="button"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <button
                                onClick={() => {
                                    if (!size) return toast.error('Vui long chon size!');
                                    addToCart(productData._id ?? productData.id, size);
                                    toast.success('Da them vao gio hang!');
                                }}
                                className="rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:bg-slate-800"
                                type="button"
                            >
                                Add To Cart
                            </button>

                            <div className="rounded-full border border-[var(--border)] bg-white px-5 py-4 text-sm text-slate-500">
                                100% original product
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                            <div className="rounded-[22px] border border-[var(--border)] bg-white p-4 text-sm text-slate-500">
                                Cash on delivery is available on this product.
                            </div>
                            <div className="rounded-[22px] border border-[var(--border)] bg-white p-4 text-sm text-slate-500">
                                Easy return and exchange policy within 7 days.
                            </div>
                            <div className="rounded-[22px] border border-[var(--border)] bg-white p-4 text-sm text-slate-500">
                                Carefully curated quality for everyday wear.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-shell overflow-hidden">
                <div className="flex flex-wrap border-b border-[var(--border)] bg-white/70">
                    <b className="border-r border-[var(--border)] px-5 py-4 text-sm text-slate-900">
                        Description
                    </b>
                    <p className="px-5 py-4 text-sm text-slate-500">Reviews (122)</p>
                </div>

                <div className="space-y-4 px-6 py-6 text-sm leading-7 text-slate-500 sm:px-8">
                    <p>
                        An e-commerce website is an online platform that
                        facilitates the buying and selling of products or
                        services over the internet.
                    </p>
                    <p>
                        E-commerce websites typically display products or
                        services along with detailed descriptions, images,
                        prices, and any available variations (such as sizes or
                        colors).
                    </p>
                </div>
            </section>

            <RelatedProducts
                category={productData.category}
                subCategory={productData.subCategory}
            />
        </div>
    ) : (
        <div className="py-20 text-center text-slate-400">Loading product...</div>
    );
};

export default Product;
