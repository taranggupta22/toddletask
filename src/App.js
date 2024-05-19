import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ModuleList from "./components/ModuleList";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [modules, setModules] = useState([]);
  const [createModule, setCreateModule] = useState(false);

  const addModule = () => {
    const newModule = {
      id: Date.now(),
      name: `Module ${modules.length + 1}`,
      resources: [],
    };
    setModules([...modules, newModule]);
  };

  const deleteModule = (id) => {
    setModules(modules.filter((module) => module.id !== id));
  };

  const renameModule = (id, newName) => {
    setModules(
      modules.map((module) =>
        module.id === id ? { ...module, name: newName } : module
      )
    );
  };

  const moveModule = (dragIndex, hoverIndex) => {
    const dragModule = modules[dragIndex];
    const updatedModules = [...modules];
    updatedModules.splice(dragIndex, 1);
    updatedModules.splice(hoverIndex, 0, dragModule);
    setModules(updatedModules);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Navbar addModule={addModule} />
        <ModuleList
          modules={modules}
          deleteModule={deleteModule}
          renameModule={renameModule}
          setModules={setModules}
          moveModule={moveModule}
        />
        {/* <ModuleList
          modules={modules}
          deleteModule={deleteModule}
          renameModule={renameModule}
          setModules={setModules}
          moveModule={moveModule}
        /> */}
      </div>
    </DndProvider>
  );
}

export default App;
