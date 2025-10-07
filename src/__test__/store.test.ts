
import { usePipelineStore } from "@/store/store";
import { ColumnType, ItemType } from "@/type/type";

    describe('usePipeStore test', () => {
        beforeEach(() => {
            // init
        const columnsInit = [
            {id: "col1", title: "col1", items: ["item1", "item2", "item3"]},
            {id: "col2", title: "col2", items: ["item4", "item5"]},
            {id: "col3", title: "col3", items: []}
        ]
        const itemsInit = [
            {id: "item1", title: "item1", content: "item1_content_here is some message", prority: "urgent"},
            {id: "item2", title: "item2", content: "item2_content_here is some message", prority: "urgent"},
            {id: "item3", title: "item3", content: "item3_content_here is some message", prority: "urgent"},
            {id: "item4", title: "item4", content: "item4_content_here is some message", prority: "urgent"},
            {id: "item5", title: "item5", content: "item5_content_here is some message", prority: "urgent"}
        ]
            usePipelineStore.setState({ columns: columnsInit, items: itemsInit });
        });

        // test1
        it('AddCol', () => {
            const lengthOrg = usePipelineStore.getState().columns.length;
            // add
            usePipelineStore.getState().AddCol('col_test');
            // expect
            expect(usePipelineStore.getState().columns.length).toBe(lengthOrg + 1);
        });

        // test 2
        it("Add Item", () => {
            // org
            const colMatchorg = usePipelineStore.getState().columns.find((col) => col.id === "col1")
            // add
            usePipelineStore.getState().AddItem("item_test", "item_test", "medium", "col1")
            // compare
            const colMatch = usePipelineStore.getState().columns.find((col) => col.id === "col1")
            const result = colMatch?.items.some((item) => item === 'item_test')
            // expect
            expect(colMatchorg?.items.length || 0 + 1).toBe(colMatch?.items.length);
        })
        // test 3
        it("Remove item", () => {
            // remove 
            usePipelineStore.getState().RemoveItem("item1", "col1")
            // check
            const itemCheck = usePipelineStore.getState().items.some((item) => item.id === "item1")
            const colMatch = usePipelineStore.getState().columns.find((col) => col.id === "col1")
            const colCheck = colMatch?.items.some((item) => item === 'item1')
            // expect
            expect(itemCheck || colCheck).toBe(false);
        })
        // test 4
        it("Update item", () => {
            // update
            usePipelineStore.getState().UpdateItem("item1", "item_test", "item_test", "medium")
            // check
            const item = usePipelineStore.getState().items.find((item) => item.id === "item1")
            const result = item?.content === "item_test" && item.title === "item_test" && item.prority === "medium"
            // expect
            expect(result).toBe(result);
        })
        // test 5
        it("Move Item", () => {
            // move 
            usePipelineStore.getState().MoveItem("item1", "col1", "col2", 0)
            // check
            const col1 = usePipelineStore.getState().columns.find((col) => col.id === "col1")
            const col2 = usePipelineStore.getState().columns.find((col) => col.id === "col2")
            const result1 = col1?.items.indexOf("item1")
            const result2 = col2?.items.indexOf("item1")
            // expect
            expect(result1).toBe(-1);
            expect(result2).toBe(0);
        })
    });