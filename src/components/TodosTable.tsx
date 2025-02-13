import React, { useEffect, useState } from "react"

/* type fetch = {
    data: any
    fetch: (num:number, text:string, priority:string, done:string, sort:string) => void
} */

//export const TodosTable:React.FC<fetch> = ({data, fetch}) => {
export const TodosTable = ({data,sortPriority,setSortPriority, sortDue, setSortDue}) => {
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
