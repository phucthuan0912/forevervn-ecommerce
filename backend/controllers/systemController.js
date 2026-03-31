import categoryModel from '../models/categoryModel.js';
import subCategoryModel from '../models/subCategoryModel.js';
import productModel from '../models/productModel.js';
import bannerModel from '../models/bannerModel.js';
import reviewModel from '../models/reviewModel.js';
import appConfigModel from '../models/appConfigModel.js';
import voucherModel from '../models/voucherModel.js';
import logAction from '../utils/logger.js';
// --- System Configuration ---
const getAppConfig = async (req, res) => {
    try {
        let config = await appConfigModel.findOne();
        if (!config) {
            config = new appConfigModel({ deliveryFee: 30000 });
            await config.save();
        }
        res.json({ success: true, config });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateAppConfig = async (req, res) => {
    try {
        const { deliveryFee } = req.body;
        let config = await appConfigModel.findOne();
        if (!config) {
            config = new appConfigModel({ deliveryFee });
        } else {
            config.deliveryFee = deliveryFee;
        }
        await config.save();

        if (req.adminEmail) {
            await logAction(req.adminEmail, req.adminName, 'SYSTEM_UPDATE', `Updated delivery fee to ${deliveryFee}`, null);
        }

        res.json({ success: true, message: 'Settings updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// --- Voucher Management ---
const addVoucher = async (req, res) => {
    try {
        const { code, discountPercent, description, showAsHot, isActive } = req.body;
        const voucher = new voucherModel({
            code,
            discountPercent,
            description,
            showAsHot,
            isActive,
            date: Date.now()
        });
        await voucher.save();

        if (req.adminEmail) {
            await logAction(req.adminEmail, req.adminName, 'VOUCHER_ADD', `Added voucher ${code}`, voucher._id);
        }

        res.json({ success: true, message: 'Voucher added' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const listVouchers = async (req, res) => {
    try {
        const vouchers = await voucherModel.find({}).sort({ date: -1 });
        res.json({ success: true, vouchers });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateVoucher = async (req, res) => {
    try {
        const { id, code, discountPercent, description, showAsHot, isActive } = req.body;
        await voucherModel.findByIdAndUpdate(id, {
            code,
            discountPercent,
            description,
            showAsHot,
            isActive
        });

        if (req.adminEmail) {
            await logAction(req.adminEmail, req.adminName, 'VOUCHER_UPDATE', `Updated voucher ${code || id}`, id);
        }

        res.json({ success: true, message: 'Voucher updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const deleteVoucher = async (req, res) => {
    try {
        const { id } = req.body;
        await voucherModel.findByIdAndDelete(id);

        if (req.adminEmail) {
            await logAction(req.adminEmail, req.adminName, 'VOUCHER_DELETE', `Deleted voucher ${id}`, id);
        }

        res.json({ success: true, message: 'Voucher deleted' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// --- Database Seeding/Reset ---
const resetCategories = async (req, res) => {
    try {
        // 1. Delete ALL existing data for a clean slate
        await Promise.all([
            categoryModel.deleteMany({}),
            subCategoryModel.deleteMany({}),
            productModel.deleteMany({}),
            bannerModel.deleteMany({}),
            reviewModel.deleteMany({})
        ]);

        const structure = [
            {
                name: 'Nam',
                subs: ['Áo thun', 'Áo Polo', 'Áo sơ mi', 'Quần Jeans', 'Quần Tây/Khaki', 'Đồ thể thao Enthusiast']
            },
            {
                name: 'Nữ',
                subs: ['Váy & Đầm', 'Áo kiểu & Croptop', 'Chân váy', 'Quần Nữ', 'Đồ lót & Đồ ngủ']
            },
            {
                name: 'Trẻ em',
                subs: ['Đồ bé trai', 'Đồ bé gái']
            },
            {
                name: 'Phụ kiện',
                subs: ['Túi xách & Balo', 'Giày dép', 'Đồng hồ & Kính mắt']
            }
        ];

        for (const catData of structure) {
            const category = new categoryModel({
                name: catData.name,
                image: "", 
                status: true
            });
            await category.save();

            for (const subName of catData.subs) {
                const subCategory = new subCategoryModel({
                    name: subName,
                    categoryId: category._id,
                    status: true
                });
                await subCategory.save();
            }
        }

        if (req.adminEmail) {
            await logAction(req.adminEmail, req.adminName, 'SYSTEM_RESET', 'Resetted categories to professional fashion structure', null);
        }

        res.json({ success: true, message: 'Categories resetted to professional fashion structure' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { getAppConfig, updateAppConfig, addVoucher, listVouchers, updateVoucher, deleteVoucher, resetCategories };
