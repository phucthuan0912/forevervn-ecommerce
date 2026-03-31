import orderModel from '../models/orderModel.js';
import productModel from '../models/productModel.js';

const getDashboardStats = async (req, res) => {
    try {
        const orders = await orderModel.find({ status: { $ne: 'Cancelled' } });
        const products = await productModel.find({});

        // Calculate Revenue Stats
        const now = new Date();
        const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfYear = new Date(now.getFullYear(), 0, 1);

        let weeklyRevenue = 0;
        let monthlyRevenue = 0;
        let yearlyRevenue = 0;
        let totalRevenue = 0;

        const revenueData = orders.reduce((acc, order) => {
            const orderDate = new Date(order.date);
            const amount = Number(order.amount) || 0;

            totalRevenue += amount;
            if (orderDate >= startOfWeek) weeklyRevenue += amount;
            if (orderDate >= startOfMonth) monthlyRevenue += amount;
            if (orderDate >= startOfYear) yearlyRevenue += amount;

            // Group by month for chart (last 12 months)
            const monthYear = `${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;
            acc[monthYear] = (acc[monthYear] || 0) + amount;
            return acc;
        }, {});

        // Format revenue chart data
        const chartData = Object.keys(revenueData).map(key => ({
            name: key,
            revenue: revenueData[key]
        })).sort((a, b) => {
             const [m1, y1] = a.name.split('/').map(Number);
             const [m2, y2] = b.name.split('/').map(Number);
             return y1 !== y2 ? y1 - y2 : m1 - m2;
        }).slice(-12);

        // Calculate Category Distribution
        const categoryStats = products.reduce((acc, prod) => {
            acc[prod.category] = (acc[prod.category] || 0) + 1;
            return acc;
        }, {});

        const categoryData = Object.keys(categoryStats).map(name => ({
            name,
            value: categoryStats[name]
        }));

        // Calculate SubCategory Distribution
        const subCategoryStats = products.reduce((acc, prod) => {
            acc[prod.subCategory] = (acc[prod.subCategory] || 0) + 1;
            return acc;
        }, {});

        const subCategoryData = Object.keys(subCategoryStats).map(name => ({
            name,
            value: subCategoryStats[name]
        }));

        res.json({
            success: true,
            stats: {
                totalRevenue,
                weeklyRevenue,
                monthlyRevenue,
                yearlyRevenue,
                totalOrders: orders.length,
                totalProducts: products.length
            },
            charts: {
                revenue: chartData,
                categories: categoryData,
                subCategories: subCategoryData
            }
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { getDashboardStats };
