import React  from 'react';
import {dndList} from './ts/DnDList';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { DroppableProvided, DraggableProvided, DropResult } from 'react-beautiful-dnd';
import {useState} from 'react';

import './css/DnD.css';

function DnD(){
  const [list,setList] = useState(dndList);

  type DragEnd = (event:DropResult) => void;

  const dragEnd:DragEnd = (event) => {
    if(event.destination){
      const draggableId = (event).draggableId;
      const items = Array.from(list);
      const index_num = items.findIndex((val,index) => {
        if(Number(draggableId) === val.id){
          return true;
        }
      });

      const [dragItem] = items.splice(index_num,1);
      items.splice(event.destination.index,0,dragItem);
      
      setList(items);

    }else {
      alert('枠内にドロップしてください');
    }
  }
  

  return (
    <div className="dnd wrap">
      ドラッグ&ドロップ<span className="file-name">(DnD.tsx)</span>
      <DragDropContext onDragEnd={(e)=>dragEnd(e)}>
        <Droppable droppableId="dnd-list" type="droppableItem">
          {(provided:DroppableProvided) => (
            <ul className="dnd-area" ref={provided.innerRef} {...provided.droppableProps}>
              {list.map((item, index) => (
                <Draggable draggableId={item.id.toString()} key={item.id.toString()} index={index}>
                  {(draggableProvided:DraggableProvided) => (
                    <li
                      className="dnd-item"
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      {item.name}
                    </li>
                  )}
                </Draggable>
                )
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default DnD;
