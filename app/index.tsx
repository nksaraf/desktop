import React from "react";
import "./theme";
import { css } from "twind/css";
import { Project as ProjectType, getProjects, openInVsCode } from "./index.api";
import { useMutation, useQuery } from "./apiless";
import { WithClient } from "./client";
import * as si from "react-icons/si";
import { DndContext } from "@dnd-kit/core";
import type { PrismaClient } from "@prisma/client";
import {
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function App() {
  return (
    <WithClient>
      <div
        className={`h-screen p-3 w-screen bg-gray-900 text-white ${css({
          // @ts-ignore
          "--tw-bg-opacity": 0.2,
        })}`}
      >
        <Projects />
      </div>
    </WithClient>
  );
}

const useDB = (fn: (db: PrismaClient) => void) => {};

//
function Projects() {
  const { data } = useQuery(getProjects);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  let items = (data ?? []).map((proj) => proj.name);

  // function handleDragEnd(event) {
  //   const { active, over } = event;

  //   if (active.id !== over.id) {
  //     setItems((items) => {
  //       const oldIndex = items.indexOf(active.id);
  //       const newIndex = items.indexOf(over.id);

  //       return arrayMove(items, oldIndex, newIndex);
  //     });
  //   }
  // }

  return (
    <DndContext sensors={sensors}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col">
          {items.map((id, index) => (
            <Project key={id} id={id} project={data[index]} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function Project({ project, id }) {
  const mutation = useMutation(openInVsCode);

  return (
    <div className="flex cursor-pointer flex-row gap-1 hover:bg-gray-900 rounded-lg py-1 transition-all group">
      <div className="pt-1 pl-1">
        <button
          className="px-3 py-3 transition-all hover:bg-black rounded-full "
          onClick={() => {
            mutation.mutate(project.dir);
          }}
        >
          <si.SiVisualstudiocode className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-col">
        <pre className="text-lg bold">{project.name}</pre>
        <pre className="text-sm text-gray-400 weight-bold">
          @{project.pkg.version}
        </pre>
      </div>
    </div>
  );
}
