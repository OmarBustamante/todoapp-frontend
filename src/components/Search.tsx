import React, { useState } from 'react'

type types = {
  text: String
  setText: any
  priority: String
  setPriority: any
  done: any
  setDone: any
}

export const Search:React.FC<types> = ({setText, setPriority, setDone}) => {

  const [searchText, setSearchText] = useState("")
  const [searchPriority, setSearchPriority] = useState("")
  const [searchState, setSearchState] = useState("")

  const onSearch = () => {
    setText(searchText)
    setPriority(searchPriority)
    setDone(searchState)
  }

  return (
    <div className='p-2 border-2 flex flex-col'>
        <label className='my-2'>Name 
            <input type="text" className='border-2' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </label>
        <label className='my-2'>Priority 
            <input type="text" className='border-2' value={searchPriority} onChange={(e) => setSearchPriority(e.target.value)} />
        </label>
        <label className='my-2'>State 
            <input type="text" className='border-2' value={searchState} onChange={(e) => setSearchState(e.target.value)} />
        </label>
        <button className='my-2 bg-amber-400' onClick={() => onSearch()} >Search</button>
    </div>
  )
}
