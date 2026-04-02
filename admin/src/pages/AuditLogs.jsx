import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl as defaultBackendUrl } from '../config';
import { History, Trash2, Calendar, User, Activity } from 'lucide-react';

const AuditLogs = ({ token, backendUrl: backendUrlFromProps }) => {
    const [systemLogs, setSystemLogs] = useState([]);
    const [userLogs, setUserLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('system'); // 'system' | 'user'

    const apiBaseUrl = useMemo(
        () => (backendUrlFromProps || defaultBackendUrl || '').trim().replace(/\/+$/, ''),
        [backendUrlFromProps],
    );

    const fetchLogs = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiBaseUrl}/api/audit-log/list`, { headers: { token } });
            if (response.data.success) {
                setSystemLogs(response.data.logs || []);
                setUserLogs(response.data.userBehaviors || []);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [apiBaseUrl, token]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const clearLogs = async () => {
        if (!window.confirm("Bạn có chắc chắn muốn xoá toàn bộ lịch sử hệ thống?")) return;
        try {
            const response = await axios.post(`${apiBaseUrl}/api/audit-log/clear`, {}, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchLogs();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getActionColor = (action) => {
        if (action.includes('ADD')) return 'text-emerald-500 bg-emerald-50 border-emerald-100';
        if (action.includes('UPDATE')) return 'text-sky-500 bg-sky-50 border-sky-100';
        if (action.includes('DELETE')) return 'text-rose-500 bg-rose-50 border-rose-100';
        return 'text-slate-400 bg-slate-50 border-slate-100';
    };

    return (
        <div className="w-full px-4 py-8 md:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Activity Logs</h1>
                    <p className="text-sm text-slate-500 mt-1">Track actions from Admins, Employees, and Customers.</p>
                </div>
                <button
                    onClick={clearLogs}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-white px-6 py-3 text-sm font-semibold text-rose-600 shadow-sm transition-all hover:bg-rose-600 hover:text-white"
                >
                    <Trash2 size={18} />
                    Clear System Logs
                </button>
            </div>

            <div className="flex gap-2 mb-6 bg-slate-100 p-1.5 rounded-2xl w-fit">
                <button 
                    onClick={() => setActiveTab('system')} 
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'system' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    👨‍💻 Admin & Employee
                </button>
                <button 
                    onClick={() => setActiveTab('user')} 
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'user' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    🛒 User Behaviors
                </button>
            </div>

            <div className="w-full overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-sm">
                <div className="hidden grid-cols-[180px_140px_1fr_180px] items-center border-b border-slate-50 bg-slate-50/50 px-8 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider md:grid">
                    <span>Timestamp</span>
                    <span>{activeTab === 'system' ? 'Action' : 'Behavior'}</span>
                    <span>Target / Details</span>
                    <span className="text-right">{activeTab === 'system' ? 'Actor' : 'User/Guest ID'}</span>
                </div>

                {loading ? (
                    <div className="px-8 py-16 text-center text-sm text-slate-400 animate-pulse">Loading activity history...</div>
                ) : activeTab === 'system' ? (
                    systemLogs.length === 0 ? (
                        <div className="px-8 py-16 text-center text-sm text-slate-400 font-medium italic">All quiet. No admin activity recorded yet.</div>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {systemLogs.map((log) => (
                                <div key={log._id} className="grid grid-cols-[180px_140px_1fr_180px] items-center px-8 py-5 transition-colors hover:bg-slate-50/30">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                        <Calendar size={14} className="text-slate-300" />
                                        {new Date(log.timestamp || log.createdAt).toLocaleString('vi-VN')}
                                    </div>
                                    <div>
                                        <span className={`rounded-xl border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${getActionColor(log.action || log.actionType)}`}>
                                            {log.action || log.actionType}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium text-slate-600 truncate pr-4">{log.description}</div>
                                    <div className="flex items-center justify-end gap-2 text-xs font-bold text-slate-800">
                                        <User size={14} className="text-slate-400" />
                                        {log.userName || 'Admin'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    userLogs.length === 0 ? (
                        <div className="px-8 py-16 text-center text-sm text-slate-400 font-medium italic">No customer usage recorded yet.</div>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {userLogs.map((log) => (
                                <div key={log._id} className="grid grid-cols-[180px_140px_1fr_180px] items-center px-8 py-5 transition-colors hover:bg-pink-50/20">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-pink-400/80">
                                        <Activity size={14} className="text-pink-300" />
                                        {new Date(log.createdAt || log.timestamp).toLocaleString('vi-VN')}
                                    </div>
                                    <div>
                                        <span className={`rounded-xl border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${log.actionType === 'ADD_TO_CART' || log.actionType === 'PLACE_ORDER' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' : 'bg-pink-100 text-pink-600 border-pink-200'}`}>
                                            {log.actionType}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium text-slate-600 truncate pr-4">
                                        {log.actionType === 'VIEW_PRODUCT' ? `Xem SP: ${log.targetId}` : 
                                         log.actionType === 'SEARCH' ? `Tìm: ${log.metadata?.keyword || log.targetId}` : 
                                         log.actionType === 'ADD_TO_CART' ? `Thêm giỏ: ${log.targetId}` :
                                         log.actionType === 'REMOVE_FROM_CART' ? `Xoá giỏ: ${log.targetId}` :
                                         log.description || `Hành động: ${log.targetId}`}
                                    </div>
                                    <div className="flex items-center justify-end gap-2 text-xs font-mono font-bold text-slate-400">
                                        <Fingerprint size={14} className="text-slate-300" />
                                        {log.userId || 'Guest'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default AuditLogs;
