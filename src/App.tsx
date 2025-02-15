import { useState, useEffect } from 'react'
import './App.css'
import { Search } from './components/Search'
import { TodosTable } from './components/TodosTable'
import { ModalNew } from './components/ModalNew'


function App() {
  const [allData, setAllData] = useState([])
  const [page, setPage] = useState([]);
  //Parametro para el filtro del fetch
  const [num, setNum] = useState(1)
  const [text, setText] = useState("")
  const [priority, setPriority] = useState("")
  const [done, setDone] = useState("")
  //parametro sort
  const [sortPriority, setSortPriority] = useState("")
  const [sortDue, setSortDue] = useState("")
  const [sort, setSort] = useState("")

  const [todoDelete, setTodoDelete] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  
  useEffect(() => {
      setTodoDelete(false)
      fetchAll()
      fetchPage(num,text,priority,done,sort)
  }, [num,text,priority,done,sort,todoDelete]);

  //Effect establece el sort
  useEffect(() => {
    if(sortPriority == "high" && sortDue == "due") {
      setSort("dueHigh")
    } else if(sortPriority == "low" && sortDue == "due"){
      setSort("dueLow")
    } else if(sortPriority == "high" && sortDue == "far"){
      setSort("farHigh")
    } else if(sortPriority == "low" && sortDue == "far"){
      setSort("farLow")
    }  else{
      sortPriority!="" ? setSort(sortPriority) : sortDue!="" ? setSort(sortDue) : setSort("")
    }
  },[sortPriority, sortDue])

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
          if(error == "SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input"){
            alert("No task found")
          } else{
            console.log("Fetching error: ", error)
            alert(error)
          }
      })
  } 

  return (
    <>
      <div className=' m-15'>
        <Search 
          text={text}
          setText={setText}
          priority={priority}
          setPriority={setPriority}
          done={done}
          setDone={setDone}
        />
        <button onClick={() => setModalOpen(true)}>New</button>
        <TodosTable 
          data = {page} 
          sortPriority = {sortPriority}
          setSortPriority = {setSortPriority}
          sortDue = {sortDue}
          setSortDue = {setSortDue}
          setTodoDelete = {setTodoDelete}
        />
        <div>
          <button onClick={() => setNum(1)}>1</button>
          <button onClick={() => setNum(2)}>2</button>
          <button onClick={() => setNum(3)}>3</button>
        </div>
        <div>Data</div>
        <ModalNew
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </div>
    </>
  )
}

export default App
