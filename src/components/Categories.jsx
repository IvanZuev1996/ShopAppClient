import React from 'react'
import '../styles/Categories.css'
import {categories} from '../data.js'
import CategoryItem from './CategoryItem'

const Categories = () => {
  return (
    <div className='categories-container'>
      {categories.map(item => 
        <CategoryItem item={item} key={item.id}/>
      )}
    </div>
  )
}

export default Categories
