import React from 'react'

const NewsletterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

    return (
        <section className='section-shell relative overflow-hidden px-5 py-8 text-center sm:px-8 sm:py-10'>
            <div className='absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(221,232,243,0.9),transparent_60%)] md:block' />

            <div className='relative'>
                <p className='display-font text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl'>
                    Subscribe now & get 20% off
                </p>

                <p className='mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base'>
                    Đăng ký nhận bản tin để nhận ưu đãi độc quyền,
                    cập nhật sản phẩm mới và nhiều khuyến mãi hấp dẫn.
                </p>

                <form
                    onSubmit={onSubmitHandler}
                    className='mx-auto mt-6 flex w-full max-w-2xl flex-col gap-3 sm:flex-row'
                >
                    <input
                        className='w-full rounded-full border border-[var(--border)] bg-white px-5 py-4 text-sm outline-none shadow-[0_10px_25px_rgba(15,23,42,0.05)]'
                        type="email"
                        placeholder='Enter your email'
                        required
                    />
                    <button
                        type='submit'
                        className='rounded-full bg-slate-900 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:bg-slate-800 sm:px-10'
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    )
}

export default NewsletterBox
