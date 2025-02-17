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
  const [reload, setReload] = useState(false)

  // Actualiza tabla
  useEffect(() => {
      setTodoDelete(false)
      setReload(false)
      fetchAll()
      fetchPage(num,text,priority,done,sort)
  }, [num,text,priority,done,sort,todoDelete,reload]);

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

  //Pagination
  const pagination = []
  let numPages = allData.length / 10
  if(allData.length % 10 !== 0){
    numPages++
  }
  for (let i = 1; i <= numPages; i++) {
    pagination.push(<button className={`w-5 h-fit m-1 border-1 hover:bg-gray-200 ${num == i ? "bg-gray-300" : ""}`} onClick={() => setNum(i)}>{i}</button>)
  }

  // Metrics
  let timeTotal = 0
  let timeHigh = 0
  let timeMed = 0
  let timeLow = 0
  let contadorTotal = 0
  let contadorHigh = 0
  let contadorMed = 0
  let contadorLow = 0

  allData.forEach((todo: any) => {
    if(todo.done){
      let createDate = new Date(todo.creationDate)
      let doneDate = new Date(todo.doneDate)

      contadorTotal++
      let time = doneDate.getTime() - createDate.getTime()

      timeTotal += time
  
      switch(todo.priority){
        case "HIGH":
          contadorHigh++
          timeHigh += time
          break;
        case "MEDIUM":
          contadorMed++
          timeMed += time
          break;
        case "LOW":
          contadorLow++
          timeLow += time
          break;
        default:
          break;
      }
      
    }
  })

  const formatTime = (time: number) => {
    const days = Math.floor(time / (1000*60*60*24))
    const hours = Math.floor((time % (1000*60*60*24)) / (1000*60*60))
    const minutes = Math.floor((time % (1000*60*60)) / (1000*60))

    return `${days}Days ${hours}Hours ${minutes}Minutes`
  } 

  return (
    <>
      <div className='mt-10 mx-auto flex flex-col w-[50%]'>
        <Search 
          text={text}
          setText={setText}
          priority={priority}
          setPriority={setPriority}
          done={done}
          setDone={setDone}
        />
        <div className='my-5'>
          <button className=' bg-green-500 hover:bg-green-700 p-2 border-2' onClick={() => setModalOpen(true)}>+ New To Do</button>
        </div>
        <TodosTable 
          data = {page} 
          sortPriority = {sortPriority}
          setSortPriority = {setSortPriority}
          sortDue = {sortDue}
          setSortDue = {setSortDue}
          setTodoDelete = {setTodoDelete}
          setReload = {setReload}
        />
        <div className='my-8 text-center'>
          <button className={`w-5 h-fit m-1 border-1 hover:bg-gray-200`} onClick={() => setNum(1)}>{"<<"}</button>
          <button className={`w-5 h-fit m-1 border-1 hover:bg-gray-200`} onClick={() => {num != 1 ? setNum(num -1) : setNum(1)}}>{"<"}</button>
          {pagination}
          <button className={`w-5 h-fit m-1 border-1 hover:bg-gray-200`} onClick={() => {num != Math.floor(numPages) ? setNum(num +1) : setNum(Math.floor(numPages))}}>{">"}</button>
          <button className={`w-5 h-fit m-1 border-1 hover:bg-gray-200`} onClick={() => setNum(Math.floor(numPages))}>{">>"}</button>
        </div>
        <div className='border-2 w-full flex justify-between p-5'>
          <div>
            <h2 className='font-bold'>Average time to finish tasks:</h2>
            <div>Total: {contadorTotal == 0 ? formatTime(0) : formatTime(timeTotal / contadorTotal)}</div>
          </div>
          <div className=''>
            <h2 className='font-bold'>Average time to finish tasks by priority: </h2>
            <p>High: {contadorHigh == 0 ? formatTime(0) : formatTime(timeHigh / contadorHigh)}</p>
            <p>Medium: {contadorMed == 0 ? formatTime(0): formatTime(timeMed / contadorMed)}</p>
            <p>Low: {contadorLow == 0 ? formatTime(0) : formatTime(timeLow / contadorLow)}</p>
          </div>
        </div>
        <ModalNew
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setReload={setReload}
        />
      </div>
    </>
  )
}

export default App
