import React,{ useState } from 'react'
import { BiSolidPencil, BiSolidSave } from "react-icons/bi"
import { IoMdTrash } from "react-icons/io"

export const RendToDo = (props) => {

const [Task, setTask] = useState(props.data.task)
const [Check, setCheck] = useState(props.data.complete)
const [OnEdit, setOnEdit] = useState(false)
const bi = {color : 'rgb(252, 175, 20)'}
const io = {color : 'red'}

const handleDelete = () => {
  const confirmed = window.confirm("Apakah Anda yakin ingin menghapus task ini?")
  if (confirmed) {
    props.onDelete()
  }
}

const [ConfirmationActive, /*setConfirmationActive*/] = useState(false)
const handleEdit = () => {
  setOnEdit(!OnEdit)
  if (OnEdit && !ConfirmationActive) {
    window.confirm("Apakah Anda yakin ingin menyimpan perubahan?")
  }
}

  return (
    <div className={`space-x-2 ${ Check ? "line-through text-red-600 decoration-red-600":""}`}>
      <div className='border-2 flex rounded'>
        <div className='py-[.5rem] w-[50.5rem] flex justify-center flex-col pl-[.5rem] text-lg font-medium max-sm:w-[26rem] ml-[1rem] mr-[1rem]'>
          { OnEdit ? <input className='border-2' value={Task} onChange={(e)=>{setTask(e.target.value)}}/> :  <span>{Task}</span> }
        </div>
        <div className='w-1/6 flex pl-[4rem] justify-center items-center gap-2'>
          <div className='flex'><input className='justify-center items-center w-[.9rem] h-[.9rem]' checked={Check} type='checkbox' onChange={(e)=>{setCheck(!Check)}}/></div>
          <div className='text-xl' style={bi}><button onClick={handleEdit}> {OnEdit ? <BiSolidSave/>: <BiSolidPencil/> }</button></div>
          <div className='text-xl' style={io}><button onClick={handleDelete}> {props.onDelete ? <IoMdTrash/> : ""}</button></div>
        </div>
      </div>
    </div>
  )
}
