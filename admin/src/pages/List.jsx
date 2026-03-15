import React, { useEffect, useState } from 'react'

const List = () => {
  const [products, setProducts] = useState([])

  // Placeholder data — replace with API call
  useEffect(() => {
    setProducts([
      { id: 1, name: 'Slim Fit T-Shirt', category: 'Men', price: 25 },
      { id: 2, name: 'Floral Dress', category: 'Women', price: 40 },
      { id: 3, name: 'Kids Hoodie', category: 'Kids', price: 30 },
    ])
  }, [])

  const handleRemove = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className='p-6 w-full'>
      <p className='mb-4 font-semibold text-lg'>All Products List</p>

      {/* Table Header */}
      <div className='hidden md:grid grid-cols-[1fr_1fr_1fr_1fr] items-center py-2 px-4 bg-gray-100 text-sm font-medium border border-gray-200 rounded-t'>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className='text-center'>Action</span>
      </div>

      {/* Table Rows */}
      <div className='flex flex-col'>
        {products.length === 0 && (
          <p className='text-center text-gray-400 py-10'>No products found.</p>
        )}
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`grid grid-cols-[1fr_1fr_1fr_1fr] items-center py-3 px-4 border border-t-0 border-gray-200 text-sm
              ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <span>{product.name}</span>
            <span>{product.category}</span>
            <span>${product.price}</span>
            <div className='flex justify-center'>
              <button
                onClick={() => handleRemove(product.id)}
                className='text-red-500 hover:text-red-700 font-medium text-xs border border-red-300 hover:border-red-500 rounded px-3 py-1 transition-colors'
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
