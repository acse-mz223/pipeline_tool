import { usePipelineStore } from '@/store/store'
import { proritiesOption } from '@/type/type'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function AddItemComponent({colId}: {colId: string}) {
  // state
  const AddItem = usePipelineStore(s => s.AddItem)  
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [prority, setPrority] = useState(proritiesOption[0].value)
  // func
  const submitFunc = () => {
    // critira
    if (title.trim().length === 0) {
      toast.error("Item Title can't be empty!")
      return
    }
    // add
    AddItem(title, content, prority, colId)
    toast.success('Successfully Item Added!')
    setTitle("")
    setContent("")
    setPrority(proritiesOption[0].value)
  }
  // return  
  return (
    <div className='flex flex-col gap-4 mt-5 p-5 min-w-[300px] max-w-[400px] border-2 border-amber-200 rounded-2xl bg-gradient-to-b from-rose-50 via-orange-100 to-amber-100'>
        <input onChange={(e) => {setTitle(e.target.value)}} value={title} className='text-sm border-2 border-dashed border-amber-400 rounded-2xl p-2' placeholder='Enter New Item Title'></input>
        <input onChange={(e) => {setContent(e.target.value)}} value={content} className='text-sm border-2 border-dashed border-amber-400 rounded-2xl p-2' placeholder='Enter New Item Content(optional)'></input>
        <select onChange={(e) => {setPrority(e.target.value)}} value={prority} className='text-sm border-2 border-dashed border-amber-400 rounded-2xl p-2'>
            {proritiesOption.map((pro) => <option value={pro.value}>{pro.value}</option>)}
        </select>
        <button onClick={submitFunc} className='p-1 rounded-full bg-amber-500 hover:bg-amber-400 ml-auto'><Plus></Plus></button>
    </div>
  )
}

export default AddItemComponent