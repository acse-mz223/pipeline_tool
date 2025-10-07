
export interface ItemType {
    id: string;
    title: string;
    content: string;
    prority: string;
}

export interface ColumnType {
    id: string;
    title: string;
    items: string[]
}

export const proritiesOption = [
    {prority: "urgent", value: "urgent"},
    {prority: "high", value: "high"},
    {prority: "medium", value: "medium"},
    {prority: "low", value: "low"},
]