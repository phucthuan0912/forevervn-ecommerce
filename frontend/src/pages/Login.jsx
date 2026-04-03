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

    const [forgotOpen, setForgotOpen] = useState(false);
    const [forgotStep, setForgotStep] = useState('request');
    const [resetEmail, setResetEmail] = useState('');
    const [resetOtp, setResetOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetLoading, setResetLoading] = useState(false);

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

    const resetForgotPasswordState = (nextEmail = '') => {
        setForgotStep('request');
        setResetEmail(nextEmail);
        setResetOtp('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const closeForgotPassword = () => {
        setForgotOpen(false);
        resetForgotPasswordState(email.trim());
    };

    const openForgotPassword = () => {
        setCurrentState('Login');
        resetForgotPasswordState(email.trim());
        setForgotOpen(true);
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

    const sendResetOtpHandler = async (event) => {
        event.preventDefault();
        if (resetLoading) return;

        const normalizedEmail = resetEmail.trim().toLowerCase();

        if (!normalizedEmail) {
            toast.error('Please enter your email');
            return;
        }

        setResetLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/user/forgot-password`, {
                email: normalizedEmail
            });
            const data = response?.data;

            if (data?.success) {
                toast.success(data.message || 'OTP has been sent to your email');
                setForgotStep('reset');
                setEmail(normalizedEmail);
                return;
            }

            toast.error(data?.message || 'Unable to send OTP');
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                'Khong the ket noi server';
            toast.error(message);
        } finally {
            setResetLoading(false);
        }
    };

    const resetPasswordHandler = async (event) => {
        event.preventDefault();
        if (resetLoading) return;

        const normalizedEmail = resetEmail.trim().toLowerCase();

        if (!normalizedEmail || !resetOtp.trim() || !newPassword || !confirmPassword) {
            toast.error('Please complete all password reset fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setResetLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/user/reset-password`, {
                email: normalizedEmail,
                otp: resetOtp.trim(),
                newPassword
            });
            const data = response?.data;

            if (data?.success) {
                toast.success(data.message || 'Password has been reset successfully');
                setCurrentState('Login');
                setEmail(normalizedEmail);
                setPassword('');
                closeForgotPassword();
                return;
            }

            toast.error(data?.message || 'Unable to reset password');
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                'Khong the ket noi server';
            toast.error(message);
        } finally {
            setResetLoading(false);
        }
    };

    const switchToSignUp = () => {
        closeForgotPassword();
        setCurrentState('Sign Up');
        resetForm();
    };

    const switchToLogin = () => {
        setCurrentState('Login');
        resetForm();
    };

    return (
        <>
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
                                Sign in or create an account to track orders, save
                                shopping sessions and continue checkout smoothly on
                                every device.
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
                                        ? 'Create a new account to start shopping faster.'
                                        : 'Sign in to continue your cart and your orders.'}
                                </p>

                                <div className="mt-8 space-y-4">
                                    {currentState === 'Sign Up' && (
                                        <input
                                            onChange={(event) => setName(event.target.value)}
                                            value={name}
                                            type="text"
                                            className="w-full rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                                            placeholder="Name"
                                            required
                                        />
                                    )}

                                    <input
                                        onChange={(event) => setEmail(event.target.value)}
                                        value={email}
                                        type="email"
                                        className="w-full rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                                        placeholder="Email"
                                        required
                                    />

                                    <input
                                        onChange={(event) => setPassword(event.target.value)}
                                        value={password}
                                        type="password"
                                        className="w-full rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                                        placeholder="Password"
                                        required
                                    />
                                </div>

                                <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-500">
                                    {currentState === 'Login' ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={openForgotPassword}
                                                className="cursor-pointer hover:text-slate-900"
                                            >
                                                Forgot your password?
                                            </button>
                                            <button
                                                type="button"
                                                onClick={switchToSignUp}
                                                className="cursor-pointer font-semibold text-slate-900"
                                            >
                                                Create account
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={switchToLogin}
                                            className="ml-auto cursor-pointer font-semibold text-slate-900"
                                        >
                                            Login Here
                                        </button>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-8 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60"
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

            {forgotOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 py-6">
                    <div className="w-full max-w-md rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_30px_120px_rgba(15,23,42,0.16)] sm:p-7">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
                                    Password Recovery
                                </p>
                                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">
                                    {forgotStep === 'request'
                                        ? 'Send reset OTP'
                                        : 'Verify OTP and reset'}
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={closeForgotPassword}
                                className="rounded-full border border-[var(--border)] px-3 py-1 text-sm text-slate-500 transition hover:text-slate-900"
                            >
                                Close
                            </button>
                        </div>

                        <p className="mt-3 text-sm leading-7 text-slate-500">
                            {forgotStep === 'request'
                                ? 'Enter the email linked to your account and we will send a one-time password.'
                                : 'Enter the OTP from your email, then choose a new password.'}
                        </p>

                        {forgotStep === 'request' ? (
                            <form onSubmit={sendResetOtpHandler} className="mt-6 space-y-4">
                                <input
                                    type="email"
                                    value={resetEmail}
                                    onChange={(event) => setResetEmail(event.target.value)}
                                    className="w-full rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                                    placeholder="Email"
                                    required
                                />

                                <button
                                    type="submit"
                                    disabled={resetLoading}
                                    className="w-full rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60"
                                >
                                    {resetLoading ? 'Sending OTP...' : 'Send OTP'}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={resetPasswordHandler} className="mt-6 space-y-4">
                                <input
                                    type="email"
                                    value={resetEmail}
                                    onChange={(event) => setResetEmail(event.target.value)}
                                    className="w-full rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                                    placeholder="Email"
                                    required
                                />

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={resetOtp}
                                    onChange={(event) => setResetOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                                    className="w-full rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                                    placeholder="6-digit OTP"
                                    required
                                />

                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(event) => setNewPassword(event.target.value)}
                                    className="w-full rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                                    placeholder="New password"
                                    required
                                />

                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    className="w-full rounded-[20px] border border-[var(--border)] px-4 py-4 text-sm outline-none"
                                    placeholder="Confirm new password"
                                    required
                                />

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="submit"
                                        disabled={resetLoading}
                                        className="flex-1 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60"
                                    >
                                        {resetLoading ? 'Updating...' : 'Reset password'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={sendResetOtpHandler}
                                        disabled={resetLoading}
                                        className="rounded-full border border-[var(--border)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
