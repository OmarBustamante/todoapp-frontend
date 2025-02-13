import { useState, useEffect } from 'react'
import './App.css'
import { Search } from './components/Search'
import { TodosTable } from './components/TodosTable'

function App() {
  const [allData, setAllData] = useState([])
  const [page, setPage] = useState([]);
  //Parametro para el filtro del fetch
  const [num, setNum] = useState(1)
  const [text, setText] = useState("")
  const [priority, setPriority] = useState("")
  const [done, setDone] = useState("")
  const [sort, setSort] = useState("")
  
  useEffect(() => {
      fetchAll()
      fetchPage(num,text,priority,done,sort)
  }, [num,text,priority,done,sort]);

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

  const fetchPage = (num:number, text:string, priority:string, done:string, sort:string) => {
    fetch("http://localhost:9090/todos/page/" + num + "?text=" + text + "&priority=" + priority + "&done="+ done + "&sort=" + sort)
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
        <TodosTable 
          data = {page} 
          num = {num}
          text = {text}
          priority = {priority}
          setPriority = {setPriority}
          done = {done}
          sort = {sort}
          setSort = {setSort}
        />
        <div>
          <button onClick={() => fetchPage(1,'','','','')}>1</button>
          <button onClick={() => fetchPage(2,'','','','')}>2</button>
          <button onClick={() => fetchPage(1,'','HIGH','','')}>HIGH</button>
          <button onClick={() => fetchPage(1,'','','true','')}>TRUE</button>
          <button onClick={() => fetchPage(1,'','','','low')}>low</button>
        </div>
        <div>Data</div>
      </div>
    </>
  )
}

export default App
