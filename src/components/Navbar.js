import React, { useState } from "react";
import { FaPlus, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { CiLink } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";

const Navbar = ({ isMenu, setCreateModule, addModule }) => {
  const [isUp, setIsUp] = useState(false);

  return (
    <div className=" flex flex-row justify-evenly items-center ">
      <div className=" text-lg font-bold">Course Builder</div>
      <div>
        <button
          className="flex flex-row items-center bg-red-800 text-white rounded-md px-4 py-2 gap-2"
          onClick={() => setIsUp(!isUp)}
        >
          <FaPlus />
          <p>Add</p>
          {isUp ? <FaAngleDown /> : <FaAngleUp />}
        </button>
        {isUp && (
          <div className="bg-white text-black shadow-md w-full flex flex-col items-start px-0">
            <button
              className="flex flex-row items-center gap-2 hover:bg-slate-100 m-0 p-2 w-full"
              onClick={addModule}
            >
              <IoMenu />
              <p>Create module</p>
            </button>
            <button className="flex flex-row items-center gap-2 hover:bg-slate-100 m-0 p-2 w-full">
              <CiLink />
              <p>Add a link</p>
            </button>
            <button className="flex flex-row items-center gap-2 hover:bg-slate-100 m-0 p-2 w-full">
              <MdOutlineFileUpload />
              <p>Upload</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
