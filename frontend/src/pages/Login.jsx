import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Login = () => {
    const [currentState, setCurrentState] = useState('Sign Up');
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (!token && savedToken) {
            setToken(savedToken);
        }
    }, [token, setToken]);

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (loading) return;

        setLoading(true);
        try {
            const endpoint =
                currentState === 'Sign Up'
                    ? '/api/user/register'
                    : '/api/user/login';

            const payload =
                currentState === 'Sign Up'
                    ? { name: name.trim(), email: email.trim(), password }
                    : { email: email.trim(), password };

            const response = await axios.post(`${backendUrl}${endpoint}`, payload);
            const data = response?.data;

            if (data?.success && data?.token) {
                localStorage.setItem('token', data.token);
                setToken(data.token);

                toast.success(
                    currentState === 'Sign Up'
                        ? 'Tao tai khoan thanh cong'
                        : 'Dang nhap thanh cong',
                );

                navigate('/');
                return;
            }

            toast.error(data?.message || 'Dang nhap that bai');
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
        <div className="py-4 sm:py-6">
            <section className="section-shell overflow-hidden">
                <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="bg-[linear-gradient(180deg,#fdfbf6_0%,#edf4fb_100%)] px-6 py-8 sm:px-8 sm:py-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                            Forever Account
                        </p>
                        <h1 className="display-font mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-5xl">
                            A cleaner way to shop.
                        </h1>
                        <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
                            Đăng nhập hoặc tạo tài khoản để theo dõi đơn hàng, lưu phiên mua sắm và tiếp tục checkout mượt mà trên mọi thiết bị.
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                            <div className="rounded-[22px] border border-[var(--border)] bg-white/80 p-4 text-sm text-slate-500">
                                Real-time order sync
                            </div>
                            <div className="rounded-[22px] border border-[var(--border)] bg-white/80 p-4 text-sm text-slate-500">
                                Faster checkout flow
                            </div>
                            <div className="rounded-[22px] border border-[var(--border)] bg-white/80 p-4 text-sm text-slate-500">
                                Responsive shopping experience
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={onSubmitHandler}
                        className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10"
                    >
                        <div className="max-w-md">
                            <div className="inline-flex items-center gap-3">
                                <p className="display-font text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                                    {currentState}
                                </p>
                                <span className="h-px w-10 bg-slate-300" />
                            </div>

                            <p className="mt-3 text-sm leading-7 text-slate-500">
                                {currentState === 'Sign Up'
                                    ? 'Tạo tài khoản mới để bắt đầu mua sắm nhanh hơn.'
                                    : 'Đăng nhập để tiếp tục giỏ hàng và đơn hàng của bạn.'}
                            </p>

                            <div className="mt-8 space-y-4">
                                {currentState === 'Sign Up' && (
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        type="text"
                                        className="w-full rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                                        placeholder="Name"
                                        required
                                    />
                                )}

                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="email"
                                    className="w-full rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                                    placeholder="Email"
                                    required
                                />

                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type="password"
                                    className="w-full rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                                    placeholder="Password"
                                    required
                                />
                            </div>

                            <div className="mt-4 flex justify-between gap-3 text-sm text-slate-500">
                                <p className="cursor-pointer hover:text-slate-900">
                                    Forgot your password?
                                </p>
                                {currentState === 'Login' ? (
                                    <p
                                        onClick={() => {
                                            setCurrentState('Sign Up');
                                            resetForm();
                                        }}
                                        className="cursor-pointer font-semibold text-slate-900"
                                    >
                                        Create account
                                    </p>
                                ) : (
                                    <p
                                        onClick={() => {
                                            setCurrentState('Login');
                                            resetForm();
                                        }}
                                        className="cursor-pointer font-semibold text-slate-900"
                                    >
                                        Login Here
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-8 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60"
                            >
                                {loading
                                    ? 'Processing...'
                                    : currentState === 'Login'
                                      ? 'Sign In'
                                      : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Login;
