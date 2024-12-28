import { Control, Controller, FieldErrors } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { TRankingField } from "@/types/form-types"
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

interface RankingFieldProps {
  field: TRankingField
  control: Control<any>
  errors: FieldErrors
}

export function RankingField({ field, control, errors }: RankingFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      {/* <Controller */}
      {/*   name={field.id} */}
      {/*   control={control} */}
      {/*   defaultValue={field.options} */}
      {/*   rules={{ required: field.required }} */}
      {/*   render={({ field: { onChange, value } }) => ( */}
      {/*     <DragDropContext onDragEnd={(result) => { */}
      {/*       if (!result.destination) return; */}
      {/*       const items = Array.from(value); */}
      {/*       const [reorderedItem] = items.splice(result.source.index, 1); */}
      {/*       items.splice(result.destination.index, 0, reorderedItem); */}
      {/*       onChange(items); */}
      {/*     }}> */}
      {/*       <Droppable droppableId={field.id}> */}
      {/*         {(provided) => ( */}
      {/*           <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2"> */}
      {/*             {value.map((item, index) => ( */}
      {/*               <Draggable key={item} draggableId={item} index={index}> */}
      {/*                 {(provided) => ( */}
      {/*                   <li */}
      {/*                     ref={provided.innerRef} */}
      {/*                     {...provided.draggableProps} */}
      {/*                     {...provided.dragHandleProps} */}
      {/*                     className="p-2 bg-gray-100 rounded" */}
      {/*                   > */}
      {/*                     {item} */}
      {/*                   </li> */}
      {/*                 )} */}
      {/*               </Draggable> */}
      {/*             ))} */}
      {/*             {provided.placeholder} */}
      {/*           </ul> */}
      {/*         )} */}
      {/*       </Droppable> */}
      {/*     </DragDropContext> */}
      {/*   )} */}
      {/* /> */}
      {errors[field.id] && (
        <p className="text-sm text-red-500">
          {errors[field.id]?.message as string}
        </p>
      )}
    </div>
  )
}
