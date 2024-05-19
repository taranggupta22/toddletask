import React, { useState } from "react";
import ResourceList from "./ResourceList";
import { useDrag, useDrop } from "react-dnd";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const Module = ({
  module,
  deleteModule,
  renameModule,
  setModules,
  moveModule,
  index,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(module.name);

  const [{ isDragging }, drag] = useDrag({
    type: "MODULE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "MODULE",
    hover(item) {
      if (item.index !== index) {
        moveModule(item.index, index);
        item.index = index;
      }
    },
  });

  const handleRename = () => {
    if (isEditing) {
      renameModule(module.id, newName);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`module bg-white shadow-md rounded-md p-4 mb-4 transition-opacity duration-300 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="module-header flex justify-between items-center mb-4">
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleRename}
            className="border border-gray-300 rounded px-2 py-1 w-[400px]"
          />
        ) : (
          <h3 className="text-xl font-bold">{module.name}</h3>
        )}
        <div className="flex space-x-2">
          <FaEdit
            onClick={handleRename}
            className="cursor-pointer text-blue-500 hover:text-blue-700"
          />
          <FaTrashAlt
            onClick={() => deleteModule(module.id)}
            className="cursor-pointer text-red-500 hover:text-red-700"
          />
        </div>
      </div>
      <ResourceList
        resources={module.resources}
        moduleId={module.id}
        setModules={setModules}
      />
    </div>
  );
};

export default Module;
