import { ColumnType, ItemType } from "@/type/type";
import { create } from "zustand";

// type
interface PipelineStoreType {
    columns: ColumnType[];
    items: ItemType[];
    isediting: boolean;
    setIsediting: (editState: boolean) => void;
    editId: string;
    setEditId: (itemId: string) => void;  
    AddCol: (title: string) => void;
    AddItem: (itemTitle: string, itemContent: string, itemPrority: string, colId: string) => void;
    RemoveItem: (itemId: string, colId: string) => void;
    UpdateItem: (itemId: string, itemTitle: string, itemContent: string, itemPrority: string) => void;
    MoveItem: (itemId: string, fromColId: string, toColId: string, index: number) => void

}

// init
const columnsInit: ColumnType[] = [
    {id: "col1", title: "col1", items: ["item1", "item2", "item3"]},
    {id: "col2", title: "col2", items: ["item4", "item5"]},
    {id: "col3", title: "col3", items: []}
]
const itemsInit: ItemType[] = [
    {id: "item1", title: "item1", content: "item1_content_here is some message", prority: "urgent"},
    {id: "item2", title: "item2", content: "item2_content_here is some message", prority: "urgent"},
    {id: "item3", title: "item3", content: "item3_content_here is some message", prority: "urgent"},
    {id: "item4", title: "item4", content: "item4_content_here is some message", prority: "urgent"},
    {id: "item5", title: "item5", content: "item5_content_here is some message", prority: "urgent"}
]

// store
export const usePipelineStore = create((set, get): PipelineStoreType => ({
    // object
    columns:  columnsInit,
    items: itemsInit,
    // state
    isediting: false,
    setIsediting: (editState) => {
        set({isediting: editState})
    },
    editId: "none",
    setEditId: (itemId) => {
        set({editId: itemId})
    },
    // function - col
    AddCol: (title) => {
        // new 
        const newCol = {id: Date.now().toString(), title: title, items: []}
        // update
        set({columns: [...get().columns, newCol]})
    },
    // function - items(add + remove + update + move)
    AddItem: (itemTitle, itemContent, itemPrority, colId) => {
        // new 
        const newItem = {id: Date.now().toString(), title: itemTitle, content: itemContent, prority: itemPrority}
        // update
        const newCols = get().columns.map((col) => {
            if (col.id === colId) {
                col.items.push(newItem.id)
            }
            return col
        })

        set({items: [...get().items, newItem], columns: newCols})
    },
    RemoveItem: (itemId, colId) => {
        // remove 
        const newItems = get().items.filter((item) => item.id != itemId)
        const newCols = get().columns.map((col) => {
            if (col.id === colId) {
                const colNewItems = col.items.filter((item) => item != itemId)
                col.items = colNewItems
            }
            return col
        })
        // update
         set({items: newItems, columns: newCols})
    },
    UpdateItem: (itemId, itemTitle, itemContent, itemPrority) => {
        // new items
        const newItems = get().items.map((item) => {
            if (item.id === itemId) {
                item.title = itemTitle,
                item.content = itemContent,
                item.prority = itemPrority
            }
            return item
        })
        // update
        set({items: newItems})
    },
    MoveItem: (itemId, fromColId, toColId, index) => {
        // print
        console.log("move:", itemId, fromColId, toColId, index)
        // remove from old 
        let newCol = get().columns.map((col) => {
            if (col.id === fromColId) {
                const newItems = col.items.filter((item) => item != itemId)
                col.items = newItems
            }
            return col
        })
        // add into new
        newCol = newCol.map((col) => {
            if (col.id === toColId) {
                col.items = [...col.items.slice(0, index), itemId, ...col.items.slice(index)]
            }
            return col
        })        
        // update
        set({columns: newCol})
    }

}))