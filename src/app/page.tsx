"use client"

import AddColumnComponent from '@/component/AddColumnComponent';
import ColumnComponent from '@/component/ColumnComponent';
import { usePipelineStore } from '@/store/store';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  // store
  const columns = usePipelineStore((s) => s.columns)
  const MoveItem = usePipelineStore((s) => s.MoveItem)
  console.log("columns:", columns)

  // reutrn     
  // drag end func
  const handleDragEnd = (result: DropResult) => {
    console.log(result)
    // critiria
    if (!result.destination) return 
    // move 
    MoveItem(result.draggableId, result.source.droppableId, result.destination.droppableId, result.destination.index)
  }
  // return 
  return (
    <div className="px-5 md:px-10 py-10 h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 transition-all duration-500">
      <div className="w-full flex justify-center pb-10 text-2xl font-extrabold text-amber-700">Pipeline tool</div>
      <div className='flex h-full flex-row items-start gap-5 md:gap-10 overflow-x-auto'>
        <DragDropContext onDragEnd={handleDragEnd}>
          {/* column */}
          {
            columns.map((col) => <ColumnComponent col={col} />)
          }
          {/* add col */}
          <AddColumnComponent />
        </DragDropContext>
        <div><Toaster/></div>
      </div>
    </div>
  )
}
