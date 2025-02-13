import React, { useEffect, useState } from "react"
import { FaCheck } from "react-icons/fa6";
import { CheckBox } from "./CheckBox";

type fetch = {
    data: any
    sortPriority: any
    setSortPriority: any
    sortDue: any
    setSortDue: any
}

//export const TodosTable:React.FC<fetch> = ({data, fetch}) => {
export const TodosTable:React.FC<fetch> = ({data ,sortPriority, setSortPriority, sortDue, setSortDue}) => {
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
                            <td className="flex justify-center p-2">
                                <CheckBox 
                                    id={todo.id}
                                    done={todo.done}
                                />
                            </td>
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
