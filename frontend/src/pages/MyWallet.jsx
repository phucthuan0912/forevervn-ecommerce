import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import useLanguage from '../hooks/useLanguage';

const copy = {
    vi: {
        title1: 'VÍ',
        title2: 'CỦA TÔI',
        balance: 'Số dư ví khả dụng',
        topup: 'Nạp tiền',
        topupAmount: 'Nhập số tiền cần nạp (VND)',
        history: 'Lịch sử giao dịch',
        emptyHistory: 'Chưa có giao dịch nào',
        pending: 'Đang tải...',
        minAmount: 'Tối thiểu 10,000đ',
        processing: 'Đang tạo mã QR...'
    },
    en: {
        title1: 'MY',
        title2: 'WALLET',
        balance: 'Available Balance',
        topup: 'Top Up',
        topupAmount: 'Enter amount to top up (VND)',
        history: 'Transaction History',
        emptyHistory: 'No transactions yet',
        pending: 'Loading...',
        minAmount: 'Minimum 10,000 VND',
        processing: 'Generating QR...'
    }
};

const MyWallet = () => {
    const { backendUrl, token, navigate } = useContext(ShopContext);
    const { language } = useLanguage();
    const t = copy[language];

    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [topupAmount, setTopupAmount] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const fetchWalletInfo = async () => {
        if (!token) return;
        try {
            const { data } = await axios.post(`${backendUrl}/api/wallet/info`, {}, { headers: { token } });
            if (data.success) {
                setBalance(data.balance);
                setTransactions(data.transactions);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchWalletInfo();

        const intervalId = setInterval(fetchWalletInfo, 10000);
        return () => clearInterval(intervalId);
    }, [token, navigate, backendUrl]);

    const handleTopUp = async () => {
        if (!topupAmount || Number(topupAmount) < 10000) {
            toast.error(t.minAmount);
            return;
        }

        try {
            setSubmitting(true);
            const { data } = await axios.post(
                `${backendUrl}/api/wallet/topup`,
                { amount: Number(topupAmount) },
                { headers: { token } }
            );

            if (data.success && data.checkoutUrl) {
                window.location.replace(data.checkoutUrl);
            } else {
                toast.error(data.message || 'Lỗi tạo giao dịch nạp tiền');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center mt-20 text-slate-500">{t.pending}</div>;

    return (
        <div className="max-w-4xl mx-auto border-t pt-14 mb-[100px] px-4 font-inter">
            <div className="text-2xl mb-8">
                <Title text1={t.title1} text2={t.title2} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Panel Số dư */}
                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between h-[250px]">
                    <div className="absolute top-0 right-0 p-6 opacity-20">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                    </div>
                    
                    <div>
                        <p className="text-slate-400 font-medium text-sm mb-1 uppercase tracking-wider">{t.balance}</p>
                        <h2 className="text-4xl font-black tracking-tight" style={{fontFamily: 'Outfit'}}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(balance)}
                        </h2>
                    </div>

                    <div className="relative z-10 flex gap-3">
                        <input
                            type="number"
                            min="10000"
                            placeholder={t.topupAmount}
                            value={topupAmount}
                            onChange={(e) => setTopupAmount(e.target.value)}
                            className="bg-slate-800 text-white border border-slate-700 rounded-full px-5 py-3 outline-none text-sm font-medium w-[200px]"
                        />
                        <button
                            onClick={handleTopUp}
                            disabled={submitting}
                            className="bg-white text-slate-900 rounded-full px-6 py-3 text-sm font-bold shadow-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
                        >
                            {submitting ? t.processing : t.topup}
                        </button>
                    </div>
                </div>

                {/* Panel Lịch sử */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col h-[400px]">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">{t.history}</h3>
                    
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {transactions.length === 0 ? (
                            <p className="text-center text-slate-500 my-10">{t.emptyHistory}</p>
                        ) : (
                            transactions.map((tx) => (
                                <div key={tx._id} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-2xl transition">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'Credit' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                            {tx.type === 'Credit' ? (
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7-7 7 7"/></svg>
                                            ) : (
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7 7 7-7"/></svg>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">{tx.description}</p>
                                            <p className="text-xs text-slate-400">{new Date(tx.date).toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}</p>
                                        </div>
                                    </div>
                                    <div className={`font-bold text-sm ${tx.type === 'Credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                        {tx.type === 'Credit' ? '+' : '-'} {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tx.amount)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyWallet;
