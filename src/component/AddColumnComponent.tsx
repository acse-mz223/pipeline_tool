import { usePipelineStore } from '@/store/store'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function AddColumnComponent() { 
  // state
  const AddCol = usePipelineStore(s => s.AddCol)  
  const columns = usePipelineStore(s => s.columns)
  const [title, setTitle] = useState("")
  // func
  const submitFunc = () => {
    // critira
    if (title.trim().length === 0) {
      toast.error("Col Title can't be empty!")
      return
    }
    if (columns.some((col) => col.title === title.trim())) {
    toast.error("Col Title should be unique!")
      return
    }

    // add
    AddCol(title)
    toast.success('Successfully Col Added!')
    setTitle("")
  }
  // return  
  return (
    <div className='flex flex-col gap-4 p-5 min-w-[300px] max-w-[400px] border-2 border-amber-200 rounded-2xl bg-gradient-to-b from-rose-50 via-orange-100 to-amber-100'>
        <input onChange={(e) => {setTitle(e.target.value)}} value={title} className='border-2 border-dashed border-amber-400 rounded-2xl p-2' placeholder='Enter New Col Title'></input>
        <button onClick={submitFunc} className='p-1 rounded-full bg-amber-500 hover:bg-amber-400 ml-auto'><Plus></Plus></button>
    </div>
  )
}

export default AddColumnComponent