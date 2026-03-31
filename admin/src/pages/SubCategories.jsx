import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl as defaultBackendUrl } from '../config';
import { Plus, Trash2, FolderEdit, Check, X, Loader2 } from 'lucide-react';

const SubCategories = ({ token, backendUrl: backendUrlFromProps }) => {
    const [list, setList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    
    // New subcategory state
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [adding, setAdding] = useState(false);

    const apiBaseUrl = useMemo(
        () => (backendUrlFromProps || defaultBackendUrl || '').trim().replace(/\/+$/, ''),
        [backendUrlFromProps],
    );

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [subRes, catRes] = await Promise.all([
                axios.get(`${apiBaseUrl}/api/sub-category/list`),
                axios.get(`${apiBaseUrl}/api/category/list`)
            ]);
            
            if (subRes.data.success) setList(subRes.data.subCategories);
            if (catRes.data.success) setCategories(catRes.data.categories);
            
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [apiBaseUrl]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setAdding(true);
            const response = await axios.post(`${apiBaseUrl}/api/sub-category/add`, 
                { name, categoryId, status: true }, 
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setName('');
                setCategoryId('');
                setShowAdd(false);
                fetchData();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setAdding(false);
        }
    };

    const removeSubCategory = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xoá danh mục con này?")) return;
        try {
            const response = await axios.post(`${apiBaseUrl}/api/sub-category/remove`, { id }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchData();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/api/sub-category/status`, { id, status: !currentStatus }, { headers: { token } });
            if (response.data.success) {
                fetchData();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="w-full px-4 py-8 md:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Sub-Categories</h1>
                    <p className="text-sm text-slate-500 mt-1">Refine your product grouping with nested sub-categories.</p>
                </div>
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5"
                >
                    {showAdd ? <X size={18} /> : <Plus size={18} />}
                    {showAdd ? 'Cancel' : 'Add Sub-Category'}
                </button>
            </div>

            {showAdd && (
                <form onSubmit={onSubmitHandler} className="mb-10 rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Sub-Category Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-medium outline-none transition-all focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-50"
                                placeholder="e.g., T-Shirts"
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Parent Category</label>
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-medium outline-none transition-all focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-50"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={adding}
                        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-6 py-4 text-sm font-bold text-white shadow-md shadow-sky-100 transition-all hover:bg-sky-700 disabled:opacity-60 md:w-auto md:px-12"
                    >
                        {adding ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                        Save Sub-Category
                    </button>
                </form>
            )}

            <div className="w-full overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-sm">
                <div className="hidden grid-cols-[1fr_1fr_120px_120px] items-center border-b border-slate-50 bg-slate-50/50 px-8 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider md:grid">
                    <span>Name</span>
                    <span>Parent Category</span>
                    <span>Status</span>
                    <span className="text-right">Action</span>
                </div>

                {loading ? (
                    <div className="px-8 py-16 text-center text-sm text-slate-400 animate-pulse">Loading sub-categories...</div>
                ) : list.length === 0 ? (
                    <div className="px-8 py-16 text-center text-sm text-slate-400 font-medium italic">No sub-categories created yet.</div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {list.map((item) => (
                            <div key={item._id} className="grid md:grid-cols-[1fr_1fr_120px_120px] items-center px-8 py-4 transition-colors hover:bg-slate-50/50">
                                <div className="font-bold text-slate-800 text-base">{item.name}</div>
                                <div className="text-slate-500 font-medium">{item.categoryId?.name || 'Unknown'}</div>
                                <div>
                                    <button
                                        onClick={() => toggleStatus(item._id, item.status)}
                                        className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-all ${
                                            item.status ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                                        }`}
                                    >
                                        {item.status ? 'Active' : 'Disabled'}
                                    </button>
                                </div>
                                <div className="text-right">
                                    <button
                                        onClick={() => removeSubCategory(item._id)}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-500 transition-all hover:bg-rose-500 hover:text-white"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubCategories;
