import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const Resource = ({ resource, moduleId, setModules }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(resource.name);

  const [{ isDragging }, drag] = useDrag({
    type: "RESOURCE",
    item: { id: resource.id, moduleId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleRename = () => {
    if (isEditing) {
      setModules((prevModules) =>
        prevModules.map((module) =>
          module.id === moduleId
            ? {
                ...module,
                resources: module.resources.map((res) =>
                  res.id === resource.id ? { ...res, name: newName } : res
                ),
              }
            : module
        )
      );
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              resources: module.resources.filter(
                (res) => res.id !== resource.id
              ),
            }
          : module
      )
    );
  };

  return (
    <div
      ref={drag}
      className="resource"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleRename}
        />
      ) : (
        <p>
          {resource.type === "link" ? (
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              {resource.name}
            </a>
          ) : (
            <a href={resource.file} target="_blank" rel="noopener noreferrer">
              {resource.name}
            </a>
          )}
        </p>
      )}
      <FaEdit onClick={handleRename} />
      <FaTrashAlt onClick={handleDelete} />
    </div>
  );
};

export default Resource;
