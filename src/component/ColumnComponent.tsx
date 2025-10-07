import { usePipelineStore } from '@/store/store'
import { ColumnType } from '@/type/type';
import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import ItemComponent from './ItemComponent';
import AddItemComponent from './AddItemComponent';

function ColumnComponent({col}:{col: ColumnType}) {

  return (
        <Droppable key={col.id} droppableId={col.id} direction="vertical"> 
            {(provided) => (
                <div>
                    <div                                
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className='py-5 px-5 w-[350px] border-2 border-amber-200 rounded-2xl bg-gradient-to-b from-rose-50 via-orange-100 to-amber-100'
                    >   
                        {/* col info */}
                        <div className='flex items-end gap-5 pb-5'>
                            <div className='font-extrabold text-2xl text-amber-700'>{col.title}</div>
                            <div className='font-light text-sm text-amber-600'>Total {col.items.length}</div>
                        </div>
                        {/* items : max-h-[400px]  +  overflow-y-auto*/}
                        <div className='flex flex-col gap-4 '>
                        {
                            col.items.map((item, index) => <ItemComponent itemId={item} index={index} colId={col.id} />)
                        }
                        </div>
                        {provided.placeholder}   
                    </div>
                    {/* add new items  */}
                    <AddItemComponent colId={col.id} />  
                </div>              
            )}
        </Droppable>   
  )
}

export default ColumnComponent