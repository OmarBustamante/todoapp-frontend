import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

type types = {
    id: any
    modalOpen: any
    setModalOpen: any
    text: string
    date: any
    priority: any
    setReload: any
}

export const ModalEdit= ({id, modalOpen, setModalOpen, text, date, priority, setReload}: types) => {

  const [editText, setEditText] = useState("")
  const [editPriority, setEditPriority] = useState("")
  const [editDate, setEditDate] = useState("")
  const [openPriority, setOpenPriority] = useState(false)
  // Este effect acualizar el valor cuando se abre el modal
  useEffect(() => {
    if(modalOpen){
      setEditText(text)
      setEditPriority(priority)
      setEditDate(date.split("T")[0])
    } else{
      setEditText("")
      setEditPriority("")
      setEditDate("")
    }
  }, [modalOpen, text, priority])

  const fetchUpdate = () => {
    let url = ""
    editDate == undefined ? url = `http://localhost:9090/todos/${id}?text=${editText}&priority=${editPriority}`
    : url = `http://localhost:9090/todos/${id}?text=${editText}&date=${editDate}T00:00:00&priority=${editPriority}` 
    fetch(url, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
    })
    .then((response) => {
        if(!response.ok) throw new Error("Error updating data")
    })
    .catch((error) => {
        console.log("Fetching error: ", error)
        alert(error)
    })
    setModalOpen(false)
    setReload(true)
  }

  return (
    <div 
    onClick={() => setModalOpen(false)}
    className={`fixed inset-0 flex items-center justify-center ${modalOpen ? "visible bg-black/20" : "invisible"}`}>
        <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white w-fit h-fit p-5'>
            <div className='flex flex-col m-5'>
                <label className='mb-2'> Name
                    <input 
                      className='border-2 ml-8'
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                </label>
                <div className='flex'>
                  <label>Priority</label>
                  {openPriority ? <div className='border-2 w-46 ml-5 flex flex-col'>
                    <button className='hover:bg-gray-300' onClick={() => {setEditPriority("HIGH"); setOpenPriority(false)}}>HIGH</button>
                    <button className='hover:bg-gray-300' onClick={() => {setEditPriority("MEDIUM"); setOpenPriority(false)}}>MEDIUM</button>
                    <button className='hover:bg-gray-300' onClick={() => {setEditPriority("LOW"); setOpenPriority(false)}}>LOW</button>
                  </div> 
                  : <input 
                    className='border-2 ml-5'
                    type="text"
                    value={editPriority}
                    readOnly
                    onChange={(e) => setEditPriority(e.target.value)}
                  />}
                  <button className='bg-gray-400 w-5 border-2' onClick={() => {setOpenPriority(!openPriority)}}>
                    {openPriority ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                <label> DueDate</label>
                <input 
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                />
                <button className='hover:bg-gray-400 bg-gray-200 mt-5' onClick={() => setEditDate("0000-01-01")}>Clear Date</button>
                <button className='hover:bg-amber-500 bg-amber-300 mt-5' onClick={() => fetchUpdate()}>Edit</button>
            </div>
        </div>
    </div>
  )
}
