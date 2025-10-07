import { usePipelineStore } from '@/store/store'
import { ItemType, proritiesOption } from '@/type/type'
import { Check, SquarePen, X } from 'lucide-react'
import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import toast from 'react-hot-toast'

function ItemComponent({itemId, index, colId}: {itemId:string, index:number, colId: string}) {
  // store
  const items = usePipelineStore(s => s.items)
  const RemoveItem = usePipelineStore(s => s.RemoveItem)
  const UpdateItem = usePipelineStore(s => s.UpdateItem)
  const {isediting, setIsediting, editId, setEditId} = usePipelineStore()
  // match item
  const item = items.find((item) => item.id === itemId) 
  // state
  const [title, setTitle] = useState(item?.title)
  const [content, setContent] = useState(item?.content)
  const [prority, setPrority] = useState(item?.prority)  
  // delete func
  const deleteFunc = () => {
    // confirm 
    // delete
    RemoveItem(itemId, colId)
    toast.success('Item removed successfully!')
  }
  // save Func
  const saveFunc = () => {
    // critira
    if (title?.trim().length === 0) {
      toast.error("Item Title can't be empty!")
      return
    }
    // uodate
    UpdateItem(itemId, title || "", content|| "", prority || "")
    toast.success('Successfully Item Updated!')
    setTitle(item?.title)
    setContent(item?.content)
    setPrority(item?.prority)   
    setIsediting(false) 
  }
  // return 
  return (
    <Draggable key={item?.id} draggableId={item?.id || ""} index={index} isDragDisabled={isediting}>  
      {(provided) => (
          <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps} 
          > { isediting && editId === itemId?
            <div className='flex flex-col gap-2 border-2 border-dashed border-amber-400 rounded-2xl px-5 py-5 cursor-pointer relative'>
              <input onChange={(e) => {setTitle(e.target.value)}} value={title} className='text-sm border-2 border-dashed border-amber-400 rounded-2xl py-1 px-2' placeholder='Enter New Item Title'></input>
              <textarea onChange={(e) => {setContent(e.target.value)}} value={content} className='text-sm border-2 border-dashed border-amber-400 rounded-2xl py-1 px-2' placeholder='Enter New Item Content(optional)'></textarea>
              <select onChange={(e) => {setPrority(e.target.value)}} value={prority} className='text-sm border-2 border-dashed border-amber-400 rounded-2xl py-1 px-2'>
                  {proritiesOption.map((pro) => <option value={pro.value}>{pro.value}</option>)}
              </select>
              <button onClick={saveFunc} className='absolute -top-2 -right-2 p-1 rounded-full bg-amber-500 hover:bg-amber-400 ml-auto'><Check className='size-5'></Check></button>
            </div>
            :<div className=' border-2 border-dashed border-amber-400 rounded-2xl px-5 py-5 cursor-pointer relative'>
              <div className='flex flex-row gap-2 items-center'>
                <div className='text-lg font-bold text-amber-700'>{item?.title}</div>
                <SquarePen onClick={() => {setIsediting(true); setEditId(itemId)}} className='h-4 w-4 text-amber-700/50 hover:text-orange-700/80'></SquarePen>
              </div>
              <div className='text-sm font-medium wrap-anywhere'>{item?.content}</div>
              <div className='text-sm absolute -top-2 -left-2  text-white bg-amber-600 px-2 py-1 rounded-xl'>{item?.prority}</div>
              <div onClick={deleteFunc} className='text-sm absolute -top-2 -right-2 bg-amber-300 p-1 rounded-full hover:bg-amber-400'><X></X></div>
            </div>
            }  
          </div>
      )}
    </Draggable>
  )
}

export default ItemComponent