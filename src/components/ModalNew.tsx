import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

type types = {
  modalOpen: any
  setModalOpen: any
  setReload: any
}

export const ModalNew = ({modalOpen, setModalOpen, setReload}: types) => {
  const [newText, setNewText] = useState("")
  const [newPriority, setNewPriority] = useState("")
  const [newDate, setNewDate] = useState("")

  const [openPriority, setOpenPriority] = useState(false)


  const fetchNew = () => {
    if(newText == "" || newPriority ==""){
      alert("The fields name and priority cannot be empty")
    } else{
      fetch(`http://localhost:9090/todos`, {
          method: "POST",
          headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "id": null,
            "text": newText,
            "dueDate": newDate!="" ? newDate + "T00:00:00" : "",
            "done": false,
            "doneDate": null,
            "priority": newPriority,
            "creationDate": null
          }),
      })
      .then((response) => {
          if(!response.ok) throw new Error("Error posting data, check the fields are correct")
      })
      .catch((error) => {
          console.log("Fetching error: ", error)
          alert(error)
      })
      setModalOpen(false)
      setReload(true)
    }
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
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                    />
                </label>
                <div className='flex'>
                  <label>Priority</label>
                  {openPriority ? <div className='border-2 w-46 ml-5 flex flex-col'>
                    <button className='hover:bg-gray-300' onClick={() => {setNewPriority("HIGH"); setOpenPriority(false)}}>HIGH</button>
                    <button className='hover:bg-gray-300' onClick={() => {setNewPriority("MEDIUM"); setOpenPriority(false)}}>MEDIUM</button>
                    <button className='hover:bg-gray-300' onClick={() => {setNewPriority("LOW"); setOpenPriority(false)}}>LOW</button>
                  </div> 
                  : <input 
                    className='border-2 ml-5'
                    type="text"
                    value={newPriority}
                    readOnly
                    onChange={(e) => setNewPriority(e.target.value)}
                  />}
                  <button className='bg-gray-400 w-5 border-2' onClick={() => {setOpenPriority(!openPriority)}}>
                    {openPriority ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                <label> DueDate</label>
                <input 
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
                <button onClick={() => fetchNew()}>Post</button>
            </div>
        </div>
    </div>
  )
}
