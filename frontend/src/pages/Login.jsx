import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [currentState, setCurrentState] = useState('Sign Up');
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // CHANGE: dong bo token context tu localStorage neu da dang nhap truoc do
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (!token && savedToken) {
            setToken(savedToken);
        }
    }, [token, setToken]);

    // CHANGE: da co token thi quay ve trang chu
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
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
        >
            <div className="inline-flex items-center gap-2 mb-2 mt-10">
                <p className="prata-regular text-3xl">{currentState}</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>

            {currentState === 'Sign Up' && (
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Name"
                    required
                />
            )}

            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Email"
                required
            />

            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Password"
                required
            />

            <div className="w-full flex justify-between text-sm mt-[-8px]">
                <p className="cursor-pointer">Forgot your password?</p>
                {currentState === 'Login' ? (
                    <p
                        onClick={() => {
                            setCurrentState('Sign Up');
                            resetForm();
                        }}
                        className="cursor-pointer"
                    >
                        Create account
                    </p>
                ) : (
                    <p
                        onClick={() => {
                            setCurrentState('Login');
                            resetForm();
                        }}
                        className="cursor-pointer"
                    >
                        Login Here
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-black text-white font-light px-8 py-2 mt-4 disabled:opacity-60"
            >
                {loading
                    ? 'Processing...'
                    : currentState === 'Login'
                      ? 'Sign In'
                      : 'Sign Up'}
            </button>
        </form>
    );
};

export default Login;
