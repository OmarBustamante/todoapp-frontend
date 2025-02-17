import React, { useState } from "react"
import { CheckBox } from "./CheckBox";
import { ModalEdit } from "./ModalEdit";
import { LuChevronsLeftRight, LuChevronDown, LuChevronUp } from "react-icons/lu"

type fetch = {
    data: any
    sortPriority: any
    setSortPriority: any
    sortDue: any
    setSortDue: any
    setTodoDelete: any
    setReload : any
}

//export const TodosTable:React.FC<fetch> = ({data, fetch}) => {
export const TodosTable:React.FC<fetch> = ({data ,sortPriority, setSortPriority, sortDue, setSortDue, setTodoDelete, setReload}) => {

    const [modalOpen, setModalOpen] = useState(false)

    const [editId, setEditId] = useState()
    const [editText, setEditText] = useState("")
    const [editDate, setEditDate] = useState("")
    const [editPriority, setEditPriority] = useState()

    const fetchDelete = (id:number) => {
        fetch(`http://localhost:9090/todos/${id}`, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json"
            },
        })
        .then((response) => {
            if(!response.ok) throw new Error("Error deleting data")
            /* return response.json() */
        })
        .catch((error) => {
            console.log("Fetching error: ", error)
            alert(error)
        })

        setReload(true)
    }

    const formatDate = (date: string) => {
        return date.split("T")[0];
    }

    const openEdit = (id:any, text:any, date:any, priority:any) =>{
        setEditId(id)
        setEditText(text)
        setEditDate(date)
        setEditPriority(priority)
        setModalOpen(true)
    }
    
    //Time to due
    let currentDate = new Date()
    let currentTime = currentDate.getTime()
    const getTimeToDue = (date: Date) => {
        date = new Date(date)
        let time = date.getTime() - currentTime
        let days = Math.floor(time / (1000*60*60*24))

        return(days)
    }


    return (
        <div className="w-full">
            <table className="w-full text-center">
                <thead>
                    <tr>
                        <th>Done</th>
                        <th className="">Name</th>
                        <th className="cursor-default"
                            onClick={() => { 
                            sortPriority=="" ? setSortPriority("high") : sortPriority=="high" ? setSortPriority("low") : setSortPriority("")
                        }}><div className="flex justify-center items-center">Priority{sortPriority=="" ? <LuChevronsLeftRight /> : sortPriority=="high" ? <LuChevronUp /> : <LuChevronDown />}</div></th>
                        <th className="cursor-default"
                            onClick={() => { 
                            sortDue=="" ? setSortDue("due") : sortDue=="due" ? setSortDue("far") : setSortDue("")
                        }}><div className="flex justify-center items-center">Due Date{sortDue=="" ? <LuChevronsLeftRight /> : sortDue=="due" ? <LuChevronUp /> : <LuChevronDown />}</div></th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((todo:any) => (
                        // fila de datos en la tabla
                        <tr key={todo.id} className={`${(todo.dueDate == null || todo.dueDate == "0000-01-01T00:00:00" || todo.done == true)? "" : getTimeToDue(todo.dueDate) < 7 ? "bg-red-100" : getTimeToDue(todo.dueDate) < 14 ? "bg-yellow-100" : "bg-green-100"}`}>
                            <td className="flex justify-center p-2">
                                <CheckBox 
                                    id={todo.id}
                                    done={todo.done}
                                    setReload={setReload}
                                />
                            </td>
                            <td className={`max-w-[100px] text-left overflow-scroll whitespace-nowrap ${todo.done == true ? "line-through" : ""}`}>{todo.text}</td>
                            <td className="">{todo.priority}</td>
                            <td className="">{todo.dueDate == null ? <>-</> : todo.dueDate == "0000-01-01T00:00:00" ? <>-</> : formatDate(todo.dueDate)}</td>
                            <td className="flex justify-center">
                                <button className="border-1 px-2 py-1 bg-yellow-300 hover:bg-yellow-500 mr-1" onClick={() => openEdit(todo.id, todo.text, todo.dueDate, todo.priority)}>Edit</button> 
                                / 
                                <button className="border-1 px-2 py-1 ml-1 bg-red-400 hover:bg-red-600" onClick={() => {
                                    fetchDelete(todo.id)
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalEdit
                id = {editId}
                modalOpen = {modalOpen}
                setModalOpen = {setModalOpen} 
                text = {editText}
                date = {editDate}
                priority = {editPriority}
                setReload = {setReload}
            />
        </div>
    )
}
