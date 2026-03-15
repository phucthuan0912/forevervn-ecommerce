import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Add = () => {
  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const toggleSize = (size) => {
    setSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ name, description, price, category, subCategory, bestseller, sizes, image })
    alert('Product added! (connect to backend)')
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full items-start gap-4 p-6'>

      {/* Upload Image */}
      <div>
        <p className='mb-2 font-medium'>Upload Image</p>
        <label htmlFor='image' className='cursor-pointer'>
          <img
            className='w-28 h-28 object-cover border-2 border-dashed border-gray-300 rounded-md'
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt='upload'
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type='file'
            id='image'
            hidden
            accept='image/*'
          />
        </label>
      </div>

      {/* Product Name */}
      <div className='w-full max-w-[500px]'>
        <p className='mb-2 font-medium'>Product Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-pink-400'
          type='text'
          placeholder='Enter product name'
          required
        />
      </div>

      {/* Description */}
      <div className='w-full max-w-[500px]'>
        <p className='mb-2 font-medium'>Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-pink-400 resize-none'
          rows={4}
          placeholder='Write product description here'
          required
        />
      </div>

      {/* Category, Sub-category, Price */}
      <div className='flex flex-wrap gap-4 w-full max-w-[500px]'>
        <div className='flex-1 min-w-[120px]'>
          <p className='mb-2 font-medium'>Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none'
          >
            <option value='Men'>Men</option>
            <option value='Women'>Women</option>
            <option value='Kids'>Kids</option>
          </select>
        </div>

        <div className='flex-1 min-w-[120px]'>
          <p className='mb-2 font-medium'>Sub Category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className='w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none'
          >
            <option value='Topwear'>Topwear</option>
            <option value='Bottomwear'>Bottomwear</option>
            <option value='Winterwear'>Winterwear</option>
          </select>
        </div>

        <div className='flex-1 min-w-[120px]'>
          <p className='mb-2 font-medium'>Price</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-pink-400'
            type='number'
            placeholder='$25'
            min={0}
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className='mb-2 font-medium'>Product Sizes</p>
        <div className='flex gap-2 flex-wrap'>
          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <span
              key={size}
              onClick={() => toggleSize(size)}
              className={`cursor-pointer px-4 py-1 rounded border text-sm font-medium transition-colors
                ${sizes.includes(size)
                  ? 'bg-pink-500 text-white border-pink-500'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:border-pink-400'}`}
            >
              {size}
            </span>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          id='bestseller'
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
          className='w-4 h-4 accent-pink-500'
        />
        <label htmlFor='bestseller' className='text-sm font-medium cursor-pointer'>
          Add to Bestseller
        </label>
      </div>

      {/* Submit */}
      <button
        type='submit'
        className='bg-pink-500 hover:bg-pink-600 transition-colors text-white rounded px-8 py-2 text-sm font-medium shadow-sm'
      >
        ADD PRODUCT
      </button>

    </form>
  )
}

export default Add
