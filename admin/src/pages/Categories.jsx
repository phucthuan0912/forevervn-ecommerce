import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl as defaultBackendUrl } from '../config';
import { Plus, Trash2, Camera, Check, X, Loader2, RefreshCw } from 'lucide-react';

const Categories = ({ token, backendUrl: backendUrlFromProps }) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    
    // New category state
    const [name, setName] = useState('');
    const [image, setImage] = useState(false);
    const [adding, setAdding] = useState(false);

    const apiBaseUrl = useMemo(
        () => (backendUrlFromProps || defaultBackendUrl || '').trim().replace(/\/+$/, ''),
        [backendUrlFromProps],
    );

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiBaseUrl}/api/category/list`);
            if (response.data.success) {
                setList(response.data.categories);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [apiBaseUrl]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setAdding(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("status", true);
            if (image) formData.append("image", image);

            const response = await axios.post(`${apiBaseUrl}/api/category/add`, formData, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);
                setName('');
                setImage(false);
                setShowAdd(false);
                fetchCategories();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setAdding(false);
        }
    };

    const removeCategory = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xoá danh mục này? Hàng loạt Sub-Category liên quan cũng sẽ bị xoá.")) return;
        try {
            const response = await axios.post(`${apiBaseUrl}/api/category/remove`, { id }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchCategories();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            const response = await axios.post(`${apiBaseUrl}/api/category/status`, { id, status: !currentStatus }, { headers: { token } });
            if (response.data.success) {
                fetchCategories();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const resetToPro = async () => {
        if (!window.confirm("CẢNH BÁO: Hành động này sẽ XOÁ TOÀN BỘ danh mục và danh mục con hiện tại để thiết lập lại bộ khung thời trang chuyên nghiệp. Bạn có chắc chắn muốn tiếp tục?")) return;
        
        try {
            setLoading(true);
            const response = await axios.post(`${apiBaseUrl}/api/system/reset-categories`, {}, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchCategories();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full px-4 py-8 md:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Manage Categories</h1>
                    <p className="text-sm text-slate-500 mt-1">Create and manage your main product categories.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={resetToPro}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-100 transition-all hover:-translate-y-0.5 hover:bg-amber-600"
                    >
                        <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                        Reset & Setup Pro
                    </button>
                    <button
                        onClick={() => setShowAdd(!showAdd)}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5"
                    >
                        {showAdd ? <X size={18} /> : <Plus size={18} />}
                        {showAdd ? 'Cancel' : 'Add New Category'}
                    </button>
                </div>
            </div>

            {showAdd && (
                <form onSubmit={onSubmitHandler} className="mb-10 rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Category Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-medium outline-none transition-all focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-50"
                                placeholder="e.g., Men's Wear"
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Display Image</label>
                            <label htmlFor="cat-image" className="relative flex min-h-[54px] cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:bg-slate-100">
                                {image ? (
                                    <span className="text-sm font-semibold text-sky-600">{image.name}</span>
                                ) : (
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <Camera size={20} />
                                        <span className="text-sm font-medium">Click to upload icon/image</span>
                                    </div>
                                )}
                                <input type="file" id="cat-image" hidden onChange={(e) => setImage(e.target.files[0])} />
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={adding}
                        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-6 py-4 text-sm font-bold text-white shadow-md shadow-sky-100 transition-all hover:bg-sky-700 disabled:opacity-60 md:w-auto md:px-12"
                    >
                        {adding ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                        Save Category
                    </button>
                </form>
            )}

            <div className="w-full overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-sm">
                <div className="hidden grid-cols-[100px_1fr_120px_120px] items-center border-b border-slate-50 bg-slate-50/50 px-8 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider md:grid">
                    <span>Image</span>
                    <span>Name</span>
                    <span>Status</span>
                    <span className="text-right">Action</span>
                </div>

                {loading ? (
                    <div className="px-8 py-16 text-center text-sm text-slate-400 animate-pulse">Fetching categories...</div>
                ) : list.length === 0 ? (
                    <div className="px-8 py-16 text-center text-sm text-slate-400 font-medium italic">No categories created yet.</div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {list.map((item) => (
                            <div key={item._id} className="grid md:grid-cols-[100px_1fr_120px_120px] items-center px-8 py-4 transition-colors hover:bg-slate-50/50">
                                <div className="h-14 w-14 rounded-2xl bg-slate-100 object-cover overflow-hidden border border-slate-50">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-slate-300"><Camera size={20} /></div>
                                    )}
                                </div>
                                <div className="font-bold text-slate-800 text-base">{item.name}</div>
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
                                        onClick={() => removeCategory(item._id)}
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

export default Categories;
