import { useState } from 'react'
import { FaCheck } from "react-icons/fa6";

type types = {
  id: number
  done: boolean
  setReload: any
}

export const CheckBox = ({id, done, setReload}: types) => {
  const [check, setCheck] = useState(done);

  const fetchDone = () => {
    fetch(`http://localhost:9090/todos/${id}/done`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
          if(!response.ok) throw new Error("Error obtaining data")
          /* return response.json() */
      })
      .catch((error) => {
          console.log("Fetching error: ", error)
          alert(error)
      })
  }
  
  const fetchUndone = () => {
    fetch(`http://localhost:9090/todos/${id}/undone`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
          if(!response.ok) throw new Error("Error obtaining data")
          /* return response.json() */
      })
      .catch((error) => {
          console.log("Fetching error: ", error)
          alert(error)
      })
  }
  
  return (
    <div className="border-2 w-5 h-5"
    onClick={() => {
      if(check){
        fetchUndone()
      } else{
        fetchDone()
      }
      setCheck(!check)
      setReload(true)
    }}>
        {check ? <FaCheck color="green" /> : <></>}
    </div>
  )
}
