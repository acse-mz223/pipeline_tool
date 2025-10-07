# Pipeline tool
A drag and drop pipeline tool (as a kanban board) with multiple columns. Construced by Next.js, React, Zustand, lucide, etc.

## 📝 Table of Contents

- [Basic Function](#function)
- [Project Structure](#structure)
- [Getting Started](#getting_started)
- [Tech & Approach](#approach)
- [State managemant](#state)
- [Twist Features](#twist)
- [Testing](#testing)
- [Authors](#authors)


## 🧐 Basic Funciton <a name = "function"></a>

- Drag and drop items into different columns
- Drag and drop items to chang sequence in same column
- Add new items for each column
- Add new column into current board (Have tittle constrain: No duplicate title)
- Delete current items 
- Update current items (**Cant drag any items while editing**)

## 📁 Project Structure <a name = "structure"></a>

```
src/
├─ app/
│ └─ page.tsx # Main board page
├─ component/
│ ├─ AddColumnComponent.tsx
│ ├─ AddItemComponent.tsx
│ ├─ ColumnComponent.tsx
│ └─ ItemComponent.tsx
├─ store/
│ └─ store.ts # Zustand global state
├─ type/
│ └─ type.ts # TypeScript type definitions
└─ __test__/
  └─ store.test.ts # 
```

## 🏁 Getting Started <a name = "getting_started"></a>

```bash
# Download the code from github
git clone https://github.com/acse-mz223/pipeline_tool.git
cd pipeline_tool

# Install dependency
npm install 

# Run code on server
npm run dev

#open browser
http://localhost:3000
```

## 🎈 Approach <a name="approach"></a>

1. **Decide the tech stack** 
  - **Language:** TypeScript
  - **Framework:** [Next.js](https://nextjs.org/) (App Router)  
  - **UI Library:** [React](https://react.dev/)  
  - **Styling:** [Tailwind CSS](https://tailwindcss.com/)  
  - **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)  
  - **Drag & Drop:** [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)  
  - **Icons:** [Lucide React](https://lucide.dev/)  
  - **Notifications:** [react-hot-toast](https://react-hot-toast.com/)  
  
2. **design structure**  
Split the board into modular components:  
  - `ColumnComponent` → handles each column  
  - `ItemComponent` → renders draggable task cards  
  - `AddColumnComponent` & `AddItemComponent` → handle user input  

3. **Data structure: normalized global state:**  
   - Each column stores **only item IDs**, not full objects.  
   - Item details are kept in a separate `item` array in the store.  
   - This design can simplify item reordering and avoids deeply nested state trees.

4. **Drag & drop interactions:**  
   - Implemented using `react-beautiful-dnd` with `DragDropContext`.  
   - Columns act as **droppable areas**, and tasks are **draggable**.  


## 🚀 State managemant -- Zustand <a name = "state"></a>
  - Zustand was chosen for its minimal API and excellent performance.  
  - Each action (add, remove, move, update) is clearly defined in the store, keeping logic centralized.

## ✨ Twist Feature <a name = "twist"></a>
### **1. Dynamic column creation**
Users can add custom columns to current. 
There is a naming constrain, so client can not use duplicated name.

### **2. Inline item creation with priority levels** 
There are 4 priorty for each item which are `urgent`, `high`, `medium`, `low`. Client can choose priorty by their need. 

### **3. Smooth drag-and-drop reordering** 
Smooth dnd across columns, backed by clean state updates.  

### **4. gradient-themed UI** 
Both functional and visually distinct.


## 🔧 Test <a name = "testing"></a>

Currently, this project has a **Unit tests** for Zustand store logic using Jest

To tests :
```bash
# Run tests
npm test
```


## ✍️ Authors <a name = "authors"></a>

- Moyu Zhang
