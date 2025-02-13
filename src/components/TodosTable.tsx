
export const TodosTable = ({data}:any) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>check</th>
                        <th>Name</th>
                        <th>Priority</th>
                        <th>Due Date</th>
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
