import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    console.log(products);
      // Lấy 20 sản phẩm mới nhất
    useEffect(() => {
    setLatestProducts(products.slice(0, 20)); // đổi 10 → 20
    }, [products])
  return (
    <div className='my-10'>
        <div className="text-center py-8 text-3xl font-medium">
            <Title text1="Latest" text2="Collection"/>
        </div>
        {/* Description */}
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 text-center mb-12'>
                Khám phá những sản phẩm mới nhất trong bộ sưu tập của chúng tôi.
                Phong cách hiện đại, chất lượng cao, giá cả hợp lý.
            </p>

            {/* Product Grid  latestCollection gọi 20 lần productItem*/ }
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProducts.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
    </div>
  )
}

export default LatestCollection