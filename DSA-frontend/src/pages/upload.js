import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import axios from "axios";
import "../cssfile/upload.css";
import { ChangeEvent, useRef } from "react";
import { ClipLoader } from "react-spinners";
import {useLocation, useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

const LoadingCircle = () => {
  return (
    <div className="flex justify-center text-white bg-black rounded-xl w-48 position-absolute   items-center t-0 l-0">
      loading..
      <div className="border-t-4 border-blue-500 border-solid rounded-full w-8 h-8 animate-spin" />
    </div>
  );
};
function Rendertable({ data, name }) {
  if (data.length !== 0) {
    data = data.present;
  }
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLL NUMBER</TableColumn>
        <TableColumn>ATTENDANCE</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((student, index) => (
          <TableRow key={index}>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.rollnumber}</TableCell>
            <TableCell>
              {student.attendance == 1 ? "Present" : "Absent"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
export default function Upload() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const course = params.get("course");
  const strength = params.get("strength");
  const batch = params.get("batch");

  const [isLoading, setIsLoading] = useState(false);
  const [date, setdate] = useState();
  const fileUploader = useRef();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [Allpresent, setAllPresent] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  function StagingArea({ data, name }) {
    return (
      <div className="rounded-md bg-purple-100">
        <div className="flex flex-col gap-2 border-2 sm:gap-2">
          {data.length === 0 ? (
            <p className="text-sm text-zinc-400 ">*Add files to display</p>
          ) : (
            data.map((item, index) => (
              <div
                key={index}
                className="flex flex-row gap-2 bg-purple-200 rounded-sm  items-center"
              >
                <p className="w-48 text-sm">{item.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  function fileSubmit() {
    console.log("Inside the function");
    if (selectedFile.length === 0) {
      alert("Enter atleast one image");
      return;
    }
    if (date) {
      setIsLoading(true);
      const formData = new FormData();
      console.log(date);
      console.log("Selected file early"); console.log(selectedFile);
      selectedFile.forEach((file) => formData.append("files", file));
      console.log("Selected file later"); console.log(selectedFile);
      setAllPresent([]);
      const tokenString = localStorage.getItem('token');

      if (!tokenString) {
        navigate('/login');
        return;
      }
      const token= JSON.parse(tokenString);
      console.log(token.token);
      console.log(formData);
      // fetch("http://localhost:8080/api/uploadfiles", {
      //   method: 'POST',
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     "dates": date,
      //     "classname": course,
      //     "token": token.token,
      //   },
      //   body: formData,
      // })
      //     .then(response => response.json())
      //     .then((data) => {
      //       setAllPresent(data);
      //       console.log(Allpresent);
      //       setIsLoading(false);
      //     })
      //     .catch((error) => {
      //       console.error("Error:", error);
      //     });
      axios
          .post("http://127.0.0.1:8080/api/uploadfiles", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "dates": date,
              "classname": course
            },
          })
          .then((response) => {
            setAllPresent(response.data);
            console.log(Allpresent);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
    } else {
      alert("Enter a date");
    }
  }
  const getresult = () => {
    // write an api request to change the page and get all the data of the class on that date,
    // if there is no data return alert that no result exists.
  };

  function toggleSidebar() {
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <>
      <div className="navbar w-full mt-4 absolute top-0 left-0 bg-transparent object-top h-[50px] rounded-none ">
        <div className="flex flex-row space-x-20 justify-center mx-auto ">
          <div
            className="toggle-button align-left text-xl text-white hover:text-slate-500 self-start "
            onClick={toggleSidebar}
          >
            ☰
          </div>
          <a
            className="text-xl font-normal text-white hover:text-slate-500 "
            href="/home"
          >
            HOME
          </a>
          <a
            className="text-xl font-normal  text-white hover:text-slate-500 "
            href="/myclass"
          >
            MYCLASS
          </a>
          <a
            className="text-xl font-normal text-white  hover:text-slate-500 "
            href="/about"
          >
            ABOUT
          </a>
          <a
            className="text-xl font-normal text-white  hover:text-slate-500 "
            href="/result"
          >
            MYRESULT
          </a>
        </div>
      </div>
      <div className="mt-[75%]">
        {isLoading && <LoadingCircle />}
        <div className="flex flex-row space-x-[20%]  justify-center  items-center mt-8">
          <div className="flex flex-col ">
            <div className="font-thin text-white text-center">course</div>
            <div className="text-7xl  border-black text-white   ">{course}</div>
          </div>
          <div className="flex flex-col ">
            <div className="font-thin text-white text-center">strength</div>
            <div className="text-7xl  border-black text-white  ">
              {strength}
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="font-thin text-white text-center">batch</div>
            <div className="text-7xl  border-black text-white ">{batch}</div>
          </div>
        </div>
        <div className="mt-4 sm:max-w-lg w-full mt-2 h-[660px] mb-24 p-10 bg-white rounded-xl z-10 custom-box-shadow-upload">
          <h2 className="mt-5 text-3xl text-center font-bold text-gray-900">
            Upload Your Files Here
          </h2>
          <form className="mt-8 space-y-3" >
            <div className="grid grid-cols-1 space-y-2">
              <label
                onClick={() => fileUploader.current.click()}
                htmlFor="file-input"
                className="text-sm font-bold text-gray-500 tracking-wide"
              >
                Click to Upload a File
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center overflow-y-auto">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm">Drag and drop</span> files here{" "}
                      <br /> or{" "}
                      <a href="" id="" className="text-blue-600 hover:underline">
                        select a file
                      </a>{" "}
                      from your computer
                    </p>
                  </div>
                  <input
                    className="overflow-y-auto"
                    accept=".png, .jpg, .jpeg"
                    hidden
                    type="file"
                    multiple
                    ref={fileUploader}
                    onChange={(e) => {
                      const files = e.target.files;
                      const newSelectedFiles = [];
                      for (let i = 0; i < files.length; i++) {
                        newSelectedFiles.push(files[i]);
                      }

                      setSelectedFile([...selectedFile, ...newSelectedFiles]);
                    }}
                  />
                  <StagingArea data={selectedFile} name="file" />

                  {/* <button  onPress={() => fileUploader.current.click()}></button> */}
                  {/* <span className="file-upload-icon">+</span> */}
                </label>
              </div>
            </div>
            <button
              onClick={fileSubmit}
              className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                        font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
              Submit
            </button>
          </form>
          <section className="date-picker block flex justify-center content-center ">
            <label
              htmlFor="date-input"
              className="hover:hover:bg-blue-900 align-center"
            >
              Choose a Date:
            </label>
            <input
              value={date}
              onChange={(e) => {
                setdate(e.target.value);
                console.log(date);
              }}
              type="date"
              id="date-input"
              className="block"
            />
          </section>
        </div>

        {/* <div className="bg-slate-300 mt-2  overflow-y-auto min-h-[350px]">
          <Rendertable data={Allpresent} name="present"/>
          </div> */}

        <div
          className={`sidebar rounded-none ${sidebarVisible ? "show" : ""}`}
          id="sidebar"
        >
          <span className="close-button" onClick={toggleSidebar}>
            ✖
          </span>
          <div className="date-picker ">
            <label htmlFor="chosen-date " className="hover:bg-blue-900">
              Choose a Date:
            </label>
            <input type="date" id="chosen-date" onChange={handleDateChange} />
            {selectedDate && (
              <button
                className="mt-2 hover:bg-purple-900 bg-purple-800 text-white rounded-xl font-medium w-24"
                onClick={getresult}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
