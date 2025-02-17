import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
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
  const [searchPriority, setSearchPriority] = useState("ALL")
  const [searchState, setSearchState] = useState("ALL")
  
  const [openPriority, setOpenPriority] = useState(false)
  const [openState, setOpenState] = useState(false)

  const onSearch = () => {
    if(searchPriority == "ALL") {
      setPriority("")
    } else{
      setPriority(searchPriority)
    }

    if(searchState == "Done"){
      setDone("true")
    } else if(searchState == "Undone"){
      setDone("false")
    } else{
      setDone("")
    }
    setText(searchText)
  }

  return (
    <div className='p-2 border-2 flex flex-col w-full justify-between'>
      <label htmlFor="">Name
        <input type="text" className='ml-5 border-2 w-[85%]' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      </label>
      <div className='flex'>
        <div className='flex flex-col justify-between mt-2'>
          <label htmlFor="" className='mb-2 flex'>Priority
            {openPriority ? <div className='border-2 w-52 ml-3 flex flex-col'>
              <button className='hover:bg-gray-300' onClick={() => {setSearchPriority("ALL"); setOpenPriority(false)}}>ALL</button>
              <button className='hover:bg-gray-300' onClick={() => {setSearchPriority("HIGH"); setOpenPriority(false)}}>HIGH</button>
              <button className='hover:bg-gray-300' onClick={() => {setSearchPriority("MEDIUM"); setOpenPriority(false)}}>MEDIUM</button>
              <button className='hover:bg-gray-300' onClick={() => {setSearchPriority("LOW"); setOpenPriority(false)}}>LOW</button>
            </div> 
            : <input type="text" className='border-2 w-52 ml-3' value={searchPriority} onChange={(e) => setSearchPriority(e.target.value)} />}
            <button className='bg-gray-400 w-5 border-2' onClick={() => setOpenPriority(!openPriority)}>
              {openPriority ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </label>
          <label htmlFor="" className='flex'>State
            {openState ? <div className='border-2 w-52 ml-6 flex flex-col'>
              <button className='hover:bg-gray-300' onClick={() => {setSearchState("ALL"); setOpenState(false)}}>ALL</button>
              <button className='hover:bg-gray-300' onClick={() => {setSearchState("Done"); setOpenState(false)}}>Done</button>
              <button className='hover:bg-gray-300' onClick={() => {setSearchState("Undone"); setOpenState(false)}}>Undone</button>
            </div>
            : <input type="text" className='border-2 w-52 ml-6' value={searchState} onChange={(e) => setSearchState(e.target.value)} />}
            <button className='bg-gray-400 w-5 border-2' onClick={() => setOpenState(!openState)}>
              {openPriority ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </label>
        </div>
        <div className='flex items-end ml-36'>
          <button className='my-2 bg-amber-400 hover:bg-amber-600 py-1 px-2 border-1' onClick={() => onSearch()} >Search</button>
        </div>
        </div>
    </div>
  )
}
