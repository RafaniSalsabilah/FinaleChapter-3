import React,{ useState } from 'react'
import { RendToDo } from './RendToDo'
import { HiSearch } from 'react-icons/hi'
import { FaBook } from 'react-icons/fa'

export const ToDoList = () => {
    let [data, setData] = useState([
        { 'id': 1, 'task': 'Nyuci mobil', 'complete': true }, 
        { 'id': 2, 'task': 'Memberi makan kucing', 'complete': true }, 
        { 'id': 3, 'task': 'Olahraga 10 menit', 'complete': false }, 
        { 'id': 4, 'task': 'Sarapan sereal', 'complete': true }, 
        { 'id': 5, 'task': 'Belanja harian', 'complete': false }, 
        { 'id': 6, 'task': 'Ngeprint tugas', 'complete': true }, 
        { 'id': 7, 'task': 'Bayar tagihan bulanan', 'complete': true }, 
        { 'id': 8, 'task': 'Berangkat kuliah', 'complete': false }, 
        { 'id': 9, 'task': 'Les bahasa Inggris', 'complete': true }, 
        { 'id': 10, 'task': 'Ke rumah Sabrina', 'complete': false}
    ])

    const deleteTask = (taskId) => {
        const updatedData = data.filter((task) => task.id !== taskId)
        setData(updatedData)
        // console.log(updatedData)
    }

    const deleteCompletedTasks = () => {
        const confirmed = window.confirm('Apakah Anda yakin ingin menghapus semua task yang telah selesai?')
        if (confirmed) {
            const updatedData = data.filter((task) => !task.complete)
            setData(updatedData)
        } 
    }

    const deleteAllTasks = () => {
        const confirmed = window.confirm('Apakah Anda yakin ingin menghapus semua task?')
        if (confirmed) {
            setData([])
        } 
    }

    const [newTask, setNewTask] = useState('')

    const [showNewTaskInput, setShowNewTaskInput] = useState(false)

    const addNewTask = () => {
        if (newTask.trim() === '') {
          return
        }
        const newId = Math.max(...data.map((task) => task.id), 0) + 1
        const newTaskObj = { id: newId, task: newTask, complete: false }
        setData([...data, newTaskObj])
        setNewTask('')
        setShowNewTaskInput(false)
        window.confirm('Apakah Anda yakin ingin menambahkan task ini?')
    }

    const [searchQuery, setSearchQuery] = useState('')

    const searchTasks = () => {
        return data.filter((value) =>
          value.task.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }

    const [filter, setFilter] = useState('all')

    const renderList = () => {
        let filteredData = data
        if (filter === 'done') {
            filteredData = data.filter((task) => task.complete)
        } else if (filter === 'todo') {
            filteredData = data.filter((task) => !task.complete)
        }

        if (searchQuery) {
            filteredData = searchTasks();
          }

        return filteredData.map((value)=>{
            return <RendToDo key={value.id} data={value} onDelete={() => deleteTask(value.id)}/>
        })
    }

    const hi = {color : 'white'}

    const fa = { color: 'white' }

  return (
    <div>
        {showNewTaskInput ? (<>
            <div>
                <div className='flex justify-center items-center font-bold text-4xl pt-[1rem]'>To Do Input</div>
                <div className='flex justify-center items-center'>
                    <div className='border-2 w-[61rem]rounded mt-[1rem] pl-[.5rem] pr-[.5rem] pt-[.5rem] max-sm:w-[37.5rem]'>
                        <div className='mb-[.5rem] flex flex-row items-center pt-[.5rem] pb-[.5rem]'> 
                            <button className='bg-cyan-500 w-[2.2rem] h-[2.2rem] text-2xl rounded pl-[.35rem] max-sm:pr-[.3rem]' style={fa} onClick={addNewTask}><FaBook/></button>
                            <div className='w-[58.5rem] border-2 rounded h-[2rem]'>
                                <input className='w-full mt-[.1rem]' value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
                            </div>
                        </div>
                        <div className='flex pb-[.5rem]'>
                            <button className='w-full bg-cyan-500 rounded text-white h-[2rem]' onClick={addNewTask}>Submit</button>
                        </div>
                    </div>
                </div>
            </div> 
        </>
            ) : (
                <div>
                    <div className='flex justify-center items-center font-bold text-4xl pt-[1rem]'>To Do Search</div>
                    <div className='flex justify-center items-center'>
                        <div className='border-2 w-[61rem] rounded mt-[1rem] pl-[.5rem] pr-[.5rem] pt-[.5rem] space-y-2 max-sm:w-[36.5rem]'>
                            <div className='mb-[.5rem] flex pt-[.5rem] pb-[.5rem] flex-col'> 
                                <div className='flex flex-row'>
                                    <button className='mr-[.1rem] bg-cyan-500 w-[2rem] h-[2rem] text-3xl rounded' style={hi} onClick={searchTasks}><HiSearch/></button>
                                    <div className='border-2 rounded w-[33rem] h-[2rem] max-sm:w-[18.5rem]'><input className='w-full mt-[.1rem]' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/></div>
                                </div>
                                <div className='flex flex-row'>
                                    <div className='w-3/4'>
                                        <button className='w-[35rem] mt-[.5rem] bg-cyan-500 rounded text-white h-[2rem] max-sm:w-[20.5rem]' onClick={searchTasks}>Search</button>
                                    </div>
                                    <button className='w-[20rem] mt-[.5rem] bg-cyan-500 rounded text-white h-[2rem] max-sm:w-[13rem]' onClick={() => setShowNewTaskInput(true)}>Add new Task</button>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center font-bold text-4xl pt-[1rem]'>To Do List</div>
                    <div className='flex justify-center items-center'>
                        <div className='w-[61rem] rounded mt-[1rem] grid gap-x-8 gap-y-4 grid-cols-3 max-sm:w-[36.5rem]'>
                            <button className={`bg-cyan-500 rounded text-white h-8 ${filter === 'all' ? 'bg-cyan-500' : ''}`} onClick={() => setFilter('all')}>All</button>
                            <button className={`bg-cyan-500 rounded text-white h-8 ${filter === 'all' ? 'bg-cyan-500' : ''}`} onClick={() => setFilter('done')}>Done</button>
                            <button className={`bg-cyan-500 rounded text-white h-8 ${filter === 'all' ? 'bg-cyan-500' : ''}`} onClick={() => setFilter('todo')}>ToDo</button>
                        </div>
                    </div>
                        
                        <div className='mt-[2rem] mb-[.5rem] flex justify-center items-center flex-col space-y-2'>{renderList()}</div>
                        <div className='flex justify-center items-center'>
                            <div className='w-[61rem] rounded mt-[1rem] grid gap-4 grid-cols-2 mb-[2rem] max-sm:w-[36.7rem]'>
                                <button className='bg-red-500 rounded text-white h-8' onClick={deleteCompletedTasks}>Delete Done Task</button>
                                <button className='bg-red-500 rounded text-white h-8' onClick={deleteAllTasks}>Delete All Task</button>
                            </div>
                        </div>
                        
                </div>    
            )
        }
    </div>
    
  )
}
