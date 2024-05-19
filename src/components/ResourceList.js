import React from "react";
import Resource from "./Resource";
import { useDrop } from "react-dnd";
import { FaPlus } from "react-icons/fa";

const ResourceList = ({ resources, moduleId, setModules }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "RESOURCE",
    drop: (item) => moveResource(item.id, moduleId),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const moveResource = (resourceId, targetModuleId) => {
    setModules((prevModules) => {
      const sourceModuleIndex = prevModules.findIndex((m) =>
        m.resources.some((r) => r.id === resourceId)
      );
      const targetModuleIndex = prevModules.findIndex(
        (m) => m.id === targetModuleId
      );

      const sourceModule = { ...prevModules[sourceModuleIndex] };
      const targetModule = { ...prevModules[targetModuleIndex] };

      const resource = sourceModule.resources.find((r) => r.id === resourceId);
      sourceModule.resources = sourceModule.resources.filter(
        (r) => r.id !== resourceId
      );
      targetModule.resources.push(resource);

      const newModules = [...prevModules];
      newModules[sourceModuleIndex] = sourceModule;
      newModules[targetModuleIndex] = targetModule;

      return newModules;
    });
  };

  const handleAddResource = (type) => {
    const resourceName = prompt(`Enter ${type} name`);
    if (!resourceName) return;

    if (type === "link") {
      const url = prompt("Enter the link URL");
      const newResource = {
        id: Date.now(),
        name: resourceName,
        type,
        url,
        file: null,
      };
      setModules((prevModules) =>
        prevModules.map((module) =>
          module.id === moduleId
            ? { ...module, resources: [...module.resources, newResource] }
            : module
        )
      );
    } else if (type === "file") {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".pdf";
      fileInput.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const newResource = {
            id: Date.now(),
            name: resourceName,
            type,
            url: "",
            file: reader.result,
          };
          setModules((prevModules) =>
            prevModules.map((module) =>
              module.id === moduleId
                ? { ...module, resources: [...module.resources, newResource] }
                : module
            )
          );
        };
        reader.readAsDataURL(file);
      };
      fileInput.click();
    }
  };

  return (
    <div ref={drop} className="resource-list">
      <div className="resource-list-header">
        <button onClick={() => handleAddResource("file")}>
          <FaPlus /> Add PDF
        </button>
        <button onClick={() => handleAddResource("link")}>
          <FaPlus /> Add Link
        </button>
      </div>
      {resources.map((resource) => (
        <Resource
          key={resource.id}
          resource={resource}
          moduleId={moduleId}
          setModules={setModules}
        />
      ))}
    </div>
  );
};

export default ResourceList;
