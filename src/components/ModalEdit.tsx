import React, { useEffect, useState } from 'react'

type types = {
    id: any
    modalOpen: any
    setModalOpen: any
    text: string
    date: any
    priority: any
}

export const ModalEdit= ({id, modalOpen, setModalOpen, text, date, priority}: types) => {

  const [editText, setEditText] = useState("")
  const [editPriority, setEditPriority] = useState("")
  const [editDate, setEditDate] = useState("")
  // Este effect acualizar el valor cuando se abre el modal
  useEffect(() => {
    if(modalOpen){
      setEditText(text)
      setEditPriority(priority)
      setEditDate(date)
    }
  }, [modalOpen, text, priority])

  const fetchUpdate = () => {
      fetch(`http://localhost:9090/todos/${id}?text=${editText}&date=${editDate}&priority=${editPriority}`, {
          method: "PUT",
          headers: {
          "Content-Type": "application/json"
          },
      })
      .then((response) => {
          if(!response.ok) throw new Error("Error deleting data")
      })
      .catch((error) => {
          console.log("Fetching error: ", error)
          alert(error)
      })
  }

  const onhandleSubmit = () => {
    fetchUpdate()
  }

  return (
    <div 
    onClick={() => setModalOpen(false)}
    className={`fixed inset-0 flex items-center justify-center ${modalOpen ? "visible bg-black/20" : "invisible"}`}>
        <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white w-fit h-fit'>
            <form action="" className='flex flex-col m-5'>
                <label htmlFor=""> Text
                    <input 
                      type="Name"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                </label>
                <label htmlFor=""> Text
                    <input 
                      type="Priority"
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value)}
                    />
                </label>
                <label htmlFor=""> Text
                    <input 
                      type="DueDate"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                    />
                </label>
                <button onClick={() => fetchUpdate()}>Edit</button>
            </form>
        </div>
    </div>
  )
}
