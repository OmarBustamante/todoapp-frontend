import { useState, useEffect } from 'react'
import './App.css'
import { Search } from './components/Search'
import { TodosTable } from './components/TodosTable'

function App() {
  const [allData, setAllData] = useState([])
  const [page, setPage] = useState([]);
  
  useEffect(() => {
      fetchAll()
      fetchPage(1)
  }, []);

  const fetchAll = () => {
    fetch("http://localhost:9090/todos")
      .then((response) => {
          if(!response.ok) throw new Error("Error obtaining data")
          return response.json()
      })
      .then((allData) => {
          setAllData(allData)
      })
      .catch((error) => {
          console.log("Fetching error: ", error)
          alert(error)
      })
  }

  const fetchPage = (num:number) => {
    fetch("http://localhost:9090/todos/page/" + num)
      .then((response) => {
          if(!response.ok) throw new Error("Error obtaining data")
          return response.json()
      })
      .then((page) => {
          setPage(page)
      })
      .catch((error) => {
          console.log("Fetching error: ", error)
          alert(error)
      })
  } 

  return (
    <>
      <div className=' m-15'>
        <Search />
        <button>New</button>
        <TodosTable data = {page} />
        <div>
          <button onClick={() => fetchPage(1)}>1</button>
          <button onClick={() => fetchPage(2)}>2</button>
        </div>
        <div>Data</div>
      </div>
    </>
  )
}

export default App
