import React, { useEffect, useState } from "react"
import { CheckBox } from "./CheckBox";
import { ModalEdit } from "./ModalEdit";

type fetch = {
    data: any
    sortPriority: any
    setSortPriority: any
    sortDue: any
    setSortDue: any
    setTodoDelete: any
}

//export const TodosTable:React.FC<fetch> = ({data, fetch}) => {
export const TodosTable:React.FC<fetch> = ({data ,sortPriority, setSortPriority, sortDue, setSortDue, setTodoDelete}) => {

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

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>check</th>
                        <th>Name</th>
                        <th onClick={() => { 
                            sortPriority=="" ? setSortPriority("high") : sortPriority=="high" ? setSortPriority("low") : setSortPriority("")
                        }}>Priority</th>
                        <th onClick={() => { 
                            sortDue=="" ? setSortDue("due") : sortDue=="due" ? setSortDue("far") : setSortDue("")
                        }}>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((todo:any) => (
                        // fila de datos en la tabla
                        <tr key={todo.id}>
                            <td className="flex justify-center p-2">
                                <CheckBox 
                                    id={todo.id}
                                    done={todo.done}
                                />
                            </td>
                            <td>{todo.text}</td>
                            <td>{todo.priority}</td>
                            <td>{todo.dueDate == null ? <>-</> : formatDate(todo.dueDate)}</td>
                            <td className="flex">
                                <p onClick={() => openEdit(todo.id, todo.text, todo.dueDate, todo.priority)}>Edit</p> 
                                / 
                                <p onClick={() => {
                                    fetchDelete(todo.id)
                                    setTodoDelete(true)
                                }}>Delete</p>
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
            />
        </div>
    )
}
