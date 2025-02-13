import React from 'react'

export const Search = () => {
  return (
    <form className='p-2 border-2 flex flex-col'>
        <label className='my-2'>Name 
            <input type="text" className='border-2' />
        </label>
        <label className='my-2'>Priority 
            <input type="text" className='border-2' />
        </label>
        <label className='my-2'>State 
            <input type="text" className='border-2' />
        </label>
        <button className='my-2'>Search</button>
    </form>
  )
}
