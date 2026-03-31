import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../config'
import { toast } from 'react-toastify'
import { Plus, Trash2, ExternalLink, ZoomIn, ZoomOut, Check } from 'lucide-react'
import Cropper from 'react-easy-crop'

// Inline cropper sub-component
const InlineCropper = ({ imageSrc, zoom, onZoomChange, onCropComplete }) => {
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
    return (
        <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onZoomChange={onZoomChange}
            onCropComplete={(_, px) => onCropComplete(px)}
            showGrid
            style={{ containerStyle: { borderRadius: 0 } }}
        />
    );
};


const Banners = ({ token }) => {
    const [list, setList] = useState([])
    const [showAdd, setShowAdd] = useState(false)
    const [image, setImage] = useState(false)           // cropped File for upload
    const [cropSrc, setCropSrc] = useState(null)        // raw data URL for inline cropper
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [cropZoom, setCropZoom] = useState(1)
    const [previewUrl, setPreviewUrl] = useState(null)  // object URL of cropped result
    const [title, setTitle] = useState("")
    const [link, setLink] = useState("")
    const [order, setOrder] = useState(0)

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/banner/list")
            if (response.data.success) {
                setList(response.data.banners)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (!image) { toast.error('Vui lòng chọn và cắt ảnh banner'); return; }
        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("link", link)
            formData.append("order", order)
            formData.append("status", "true")
            formData.append("image", image)

            const response = await axios.post(backendUrl + "/api/banner/add", formData, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                setTitle("")
                setLink("")
                setOrder(0)
                setImage(false)
                if (previewUrl) { URL.revokeObjectURL(previewUrl); setPreviewUrl(null); }
                setCropSrc(null)
                setShowAdd(false)
                fetchList()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Open inline cropper when user selects a file
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => { setCropSrc(reader.result); setCropZoom(1); };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    // Confirm crop — draw canvas and produce File
    const handleCropConfirm = useCallback(async () => {
        if (!cropSrc || !croppedAreaPixels) return;
        try {
            const image = await new Promise((res, rej) => {
                const img = new Image(); img.onload = () => res(img); img.onerror = rej; img.src = cropSrc;
            });
            const canvas = document.createElement('canvas');
            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height;
            canvas.getContext('2d').drawImage(
                image,
                croppedAreaPixels.x, croppedAreaPixels.y,
                croppedAreaPixels.width, croppedAreaPixels.height,
                0, 0, croppedAreaPixels.width, croppedAreaPixels.height
            );
            const croppedFile = await new Promise((res, rej) =>
                canvas.toBlob(b => b ? res(new File([b], `banner-${Date.now()}.jpg`, { type: 'image/jpeg' })) : rej(), 'image/jpeg', 0.92)
            );
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setPreviewUrl(URL.createObjectURL(croppedFile));
            setImage(croppedFile);
            setCropSrc(null);
        } catch (err) {
            toast.error('Lỗi khi cắt ảnh, thử lại!');
            console.error(err);
        }
    }, [cropSrc, croppedAreaPixels, previewUrl]);

    const removeBanner = async (id) => {
        if (!window.confirm("Are you sure you want to delete this banner?")) return;
        try {
            const response = await axios.post(backendUrl + '/api/banner/remove', { id }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                fetchList()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <>
            <div className='p-4 sm:p-8'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-800'>Quản lý Banner</h2>
                <button 
                    onClick={() => setShowAdd(!showAdd)}
                    className='bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors'
                >
                    <Plus size={20} />
                    {showAdd ? 'Hủy' : 'Thêm Banner'}
                </button>
            </div>

            {showAdd && (
                <form onSubmit={onSubmitHandler} className='bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 max-w-2xl overflow-hidden'>
                    <div className='px-6 pt-5 pb-4 border-b border-gray-100'>
                        <p className='font-semibold text-gray-800'>Thêm Banner mới</p>
                        <p className='text-xs text-gray-400 mt-0.5'>Chọn ảnh → cắt theo tỉ lệ 16:9 → nhập thông tin → lưu</p>
                    </div>

                    {/* === INLINE CROP STAGE === */}
                    {cropSrc ? (
                        <div>
                            {/* Cropper area */}
                            <div className='relative bg-gray-900' style={{ height: '300px' }}>
                                <InlineCropper
                                    imageSrc={cropSrc}
                                    zoom={cropZoom}
                                    onZoomChange={setCropZoom}
                                    onCropComplete={setCroppedAreaPixels}
                                />
                            </div>

                            {/* Zoom + actions in one row */}
                            <div className='flex items-center gap-3 bg-gray-50 px-5 py-3 border-t border-gray-100'>
                                <ZoomOut size={15} className='text-gray-400 flex-shrink-0' />
                                <input
                                    type='range' min={1} max={3} step={0.05}
                                    value={cropZoom}
                                    onChange={(e) => setCropZoom(Number(e.target.value))}
                                    className='flex-1 h-1.5 accent-black cursor-pointer'
                                    id='crop-zoom-slider'
                                />
                                <ZoomIn size={15} className='text-gray-400 flex-shrink-0' />
                                <span className='text-xs text-gray-500 w-9 text-right'>{cropZoom.toFixed(1)}×</span>
                                <div className='ml-3 flex gap-2 flex-shrink-0'>
                                    <button type='button' onClick={() => { setCropSrc(null); setCroppedAreaPixels(null); }}
                                        className='rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100'>
                                        Hủy
                                    </button>
                                    <button type='button' onClick={handleCropConfirm}
                                        className='flex items-center gap-1.5 rounded-lg bg-black px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800'>
                                        <Check size={13} /> Dùng ảnh này
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* === THUMBNAIL + FIELDS STAGE === */
                        <div className='p-5 flex flex-col gap-4'>
                            {/* Image picker row */}
                            <label htmlFor='image' className='cursor-pointer group flex items-center gap-4'>
                                <div className={`relative flex-shrink-0 w-[120px] h-[68px] rounded-xl overflow-hidden border-2 transition-colors ${
                                    previewUrl
                                        ? 'border-emerald-300 shadow-sm'
                                        : 'border-dashed border-gray-300 bg-gray-50 group-hover:border-black'
                                }`}>
                                    {previewUrl ? (
                                        <>
                                            <img className='w-full h-full object-cover' src={previewUrl} alt='' />
                                            <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                                                <span className='text-white text-[10px] font-semibold'>Đổi ảnh</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='flex flex-col items-center justify-center h-full text-gray-400'>
                                            <Plus size={18} className='mb-0.5' />
                                            <span className='text-[10px]'>Chọn ảnh</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {previewUrl ? (
                                        <p className='text-sm font-medium text-emerald-600'>✓ Ảnh đã cắt (16:9)</p>
                                    ) : (
                                        <p className='text-sm font-medium text-gray-700'>Chọn ảnh banner</p>
                                    )}
                                    <p className='text-xs text-gray-400 mt-0.5'>Bấm để {previewUrl ? 'đổi' : 'chọn'} · Sẽ mở khung cắt 16:9</p>
                                </div>
                                <input onChange={handleFileSelect} type='file' id='image' hidden accept='image/*' />
                            </label>

                            <div className='border-t border-gray-100' />

                            {/* Fields */}
                            <div className='grid gap-3 sm:grid-cols-2'>
                                <div>
                                    <p className='mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider'>Tiêu đề</p>
                                    <input onChange={(e) => setTitle(e.target.value)} value={title}
                                        className='w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none'
                                        type='text' placeholder='Banner khuyến mãi hè...' />
                                </div>
                                <div>
                                    <p className='mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider'>Đường dẫn (Link)</p>
                                    <input onChange={(e) => setLink(e.target.value)} value={link}
                                        className='w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none'
                                        type='text' placeholder='/collection' />
                                </div>
                                <div>
                                    <p className='mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider'>Thứ tự</p>
                                    <input onChange={(e) => setOrder(e.target.value)} value={order}
                                        className='w-28 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none'
                                        type='number' />
                                </div>
                            </div>

                            <button
                                className='w-full bg-black text-white py-2.5 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-sm'
                                type='submit'
                            >
                                Lưu Banner
                            </button>
                        </div>
                    )}
                </form>
            )}


            {/* Compact banner list */}
            <div className='w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
                {/* Header */}
                <div className='grid grid-cols-[64px_1fr_auto_80px_60px] items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500'>
                    <span>Ảnh</span>
                    <span>Tiêu đề / Link</span>
                    <span>Trạng thái</span>
                    <span className='text-center'>Thứ tự</span>
                    <span className='text-center'>Xóa</span>
                </div>

                {list.length === 0 ? (
                    <div className='px-4 py-8 text-center text-sm text-gray-400'>
                        Chưa có banner nào. Bấm "Thêm Banner" để bắt đầu.
                    </div>
                ) : (
                    list
                        .slice()
                        .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
                        .map((item, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-[64px_1fr_auto_80px_60px] items-center gap-3 border-b border-gray-100 px-4 py-2 text-sm transition-colors hover:bg-gray-50/70 ${
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                                }`}
                            >
                                {/* Thumbnail */}
                                <div className='h-10 w-16 overflow-hidden rounded-md border border-gray-100 bg-gray-100 flex-shrink-0'>
                                    <img
                                        className='h-full w-full object-cover'
                                        src={item.image}
                                        alt={item.title || ''}
                                    />
                                </div>

                                {/* Title + link */}
                                <div className='min-w-0'>
                                    <p className='truncate font-medium text-gray-800 text-sm leading-tight'>
                                        {item.title || <span className='italic text-gray-400'>Không có tiêu đề</span>}
                                    </p>
                                    {item.link && (
                                        <a
                                            href={item.link}
                                            target='_blank'
                                            rel='noreferrer'
                                            className='flex items-center gap-1 truncate text-[11px] text-blue-500 hover:underline mt-0.5'
                                        >
                                            <ExternalLink size={10} />
                                            {item.link}
                                        </a>
                                    )}
                                </div>

                                {/* Status */}
                                <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                                    item.status ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                                }`}>
                                    {item.status ? 'Hiển thị' : 'Ẩn'}
                                </span>

                                {/* Order */}
                                <span className='text-center text-xs font-medium text-gray-500'>{item.order ?? '—'}</span>

                                {/* Delete */}
                                <div className='flex justify-center'>
                                    <button
                                        onClick={() => removeBanner(item._id)}
                                        className='flex h-7 w-7 items-center justify-center rounded-full border border-transparent text-gray-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500'
                                        title='Xóa banner'
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                )}
            </div>
        </div>
        </>
    )
}

export default Banners
