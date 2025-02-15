import React, { useState } from 'react'

type types = {
  modalOpen: any
  setModalOpen: any
}

export const ModalNew = ({modalOpen, setModalOpen}: types) => {
  const [newText, setNewText] = useState("")
  const [newPriority, setNewPriority] = useState("")
  const [newDate, setNewDate] = useState("")


  const fetchNew = () => {
    fetch(`http://localhost:9090/todos`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "id": null,
          "text": newText,
          "dueDate": newDate,
          "done": false,
          "doneDate": null,
          "priority": newPriority,
          "creationDate": null
        }),
    })
    .then((response) => {
        if(!response.ok) throw new Error("Error deleting data")
    })
    .catch((error) => {
        console.log("Fetching error: ", error)
        alert(error)
    })
  }
  return (
    <div 
    onClick={() => setModalOpen(false)}
    className={`fixed inset-0 flex items-center justify-center ${modalOpen ? "visible bg-black/20" : "invisible"}`}>
        <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white w-fit h-fit'>
            <form action="" className='flex flex-col m-5'>
                <label htmlFor=""> Name
                    <input 
                      type="Name"
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                    />
                </label>
                <label htmlFor=""> Priority
                    <input 
                      type="Priority"
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value)}
                    />
                </label>
                <label htmlFor=""> DueDate
                    <input 
                      type="DueDate"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                    />
                </label>
                <button onClick={() => fetchNew()}>Post</button>
            </form>
        </div>
    </div>
  )
}
