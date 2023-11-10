import React from "react";
import "../cssfile/addstudent.css"

function AddStudent(){
    return(<>
        <nav className="navMenu">
            <a href="/home">Home</a>
            <a href="/myclass">MyClass</a>
            <a href="/about">About</a>
            <a href="/result">MyResult</a>
          </nav>
          <div className="relative mt-64 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative items-center">
  <div className="absolute inset-0 z-0" />
  <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
    <div className="text-center">
      <h2 className="mt-5 text-3xl font-bold text-gray-900">Add Student</h2>
    </div>
    <form className="mt-8 space-y-3" action="#" method="POST">
      <div className="grid grid-cols-1 space-y-2">
        <label className="text-sm font-bold text-gray-500 tracking-wide">
          Name
        </label>
        <input
          className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          type=""
          placeholder=" "
        />
      </div>
      <div className="grid grid-cols-1 space-y-2">
        <label className="text-sm font-bold text-gray-500 tracking-wide">
          Roll Number
        </label>
        <input
          className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          type=""
          placeholder=" "
        />
      </div>
      <div className="grid grid-cols-1 space-y-2">
        <label className="text-sm font-bold text-gray-500 tracking-wide">
          Attach Photo
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
            <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
              <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                <img className="has-mask h-36 object-center" />
              </div>
              <p className="pointer-none text-gray-500 ">
                <span className="text-sm">Drag and drop</span> files here <br />{" "}
                or{" "}
                <a href="" id="" className="text-blue-600 hover:underline">
                  select a file
                </a>{" "}
                from your computer
              </p>
            </div>
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>
      <p className="text-sm text-gray-300">
        <span>File type: png, jpg, jpeg of images</span>
      </p>
      <div>
        <button
          type="submit"
          className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                              font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
        >
          Add Student
        </button>
      </div>
    </form>
  </div>
</div>

    </>);
}

export default AddStudent;