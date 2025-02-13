import React, { useEffect, useState } from "react"

/* type fetch = {
    data: any
    fetch: (num:number, text:string, priority:string, done:string, sort:string) => void
} */

//export const TodosTable:React.FC<fetch> = ({data, fetch}) => {
export const TodosTable = ({data,num,text,priority,setPriority,done,sort,setSort}) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>check</th>
                        <th>Name</th>
                        <th onClick={() => {
                            if(priority==""){
                                setPriority("HIGH")
                            } else if(priority=='HIGH'){
                                setPriority("LOW")
                            } else{
                                setPriority("")
                            }
                        }}>Priority</th>
                        <th onClick={() => {
                            if(sort==""){
                                setSort("due")
                            } else{
                                setSort("")
                            }
                        }}>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((todo:any) => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.text}</td>
                            <td>{todo.priority}</td>
                            <td>{todo.dueDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
