import { useState ,useEffect} from "react";
import "../cssfile/result.css"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Radio, RadioGroup} from "@nextui-org/react";

import { useLocation } from "react-router-dom";
import {json, Link, useNavigate} from "react-router-dom";

function Rendertable({data,func}){
  const [Name,setname]=useState("j");
  const [pres,setpres]=useState(0);
  const [rollnum,setrollnum]=useState("");
  const [selectionBehavior, setSelectionBehavior] = useState("toggle");
  
  // if(data.length !== 0){
  //   data = data.present
  // }
  return (
    <>
    <Table id = "tables"
    aria-label="Rows actions table example with dynamic content"
    selectionBehavior={selectionBehavior}
    onRowAction={(key) =>{setpres(23);setname(data[key].name) ;func(data[key].name,data[key].roll_num,23);}}>
    <TableHeader>
      <TableColumn >NAME</TableColumn>
      <TableColumn>ROLL NUMBER</TableColumn>
      <TableColumn>ATTENDANCE</TableColumn>
    </TableHeader>
    <TableBody>
    {(data).map((student, index) => (
          <TableRow className="hover:" key={index}>
            <TableCell > {student.name}</TableCell>
            <TableCell>{student.roll_num}</TableCell>
            <TableCell>{student.status===true ? 'Present' : 'Absent'}</TableCell>
          </TableRow>
        ))}
      
    </TableBody>
  </Table>
  
</>
  )}
export default function Result(){
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const date = params.get("date");
  const [data,setdata]=useState([])
  const [Date,setDate]=useState(null);
  const [Total,setTotal]=useState("100");
  const [Studentname,setStudentname]=useState("ybhinav");
  const [Studentattendance,setStudentattendance]=useState("35");
  const [classname,setclassname]=useState(null);

  // write an api request to get the information of Total(student present), Student name and there attendance.
  const handleDateChange = (e) => {
    setDate(e.target.value);
  }
  const handleclassname = (e) => {
    setclassname(e.target.value);
  }
  function handlerowclick(Name,roll,pres){
    //send a api request to get the overall attendance of the student of that class.
    const tokenString = localStorage.getItem('token');
    if (!tokenString) {
      navigate('/login');
      return;
    }
    const token= JSON.parse(tokenString);
    // Fetch fixtures data from the backend when the component mounts
    fetch('http://localhost:8080/api/count', {
      method: 'GET',
      headers: {
        'token': token.token,
        'roll_num': roll,
        'classname': classname,
      },
    }) //
        .then((response) => response.json())
        .then((data) => {
          // Set the fixtures state with the received data
          setStudentattendance(data.present)
          setTotal(data.total)
          console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching attendance:', error);
        });
    setStudentname(Name);
  }
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (showAlert) {
      alert('double click the student row to show information of that student');
      setShowAlert(false); // Set showAlert to false to prevent showing the alert again.
    }
  }, [showAlert]);
 const handleAttendance = () => {
   const tokenString = localStorage.getItem('token');
    if (Date === null || classname === null){
      return;
    }
   if (!tokenString) {
     navigate('/login');
     return;
   }
   const token= JSON.parse(tokenString);
   console.log(token.token);
   console.log(Date);
   // Fetch fixtures data from the backend when the component mounts
   fetch('http://localhost:8080/api/attendance', {
     method: 'GET',
     headers: {
       'token': token.token,
       'dates': Date,
       'classname': classname,
     },
   }) //
       .then((response) => response.json())
       .then((data) => {
         // Set the fixtures state with the received data
         setdata(data);
         console.log(data);
       })
       .catch((error) => {
         console.error('Error fetching attendance:', error);
       });
  }
    
    return (
        <>
    <nav className="navMenu">
    <a href="/home">Home</a>
    <a href="/myclass">MyClass</a>
    <a href="/about">About</a>  
    <a href="/result">MyResult</a>
    </nav>
      {/* <div class="center">
          <div class="article-card">
            <label htmlFor="chosen-date " className="">Choose a Date: </label>
            <input type="date" id="chosen-date" onChange={handleDateChange}/>
            <button className="">Display Result</button>
        </div>
      </div> */}
<div className="center-container">
  <div className="center">
    <div className="article-card">
      <label htmlFor="chosen-date" className="">Choose a Date: </label>
      <input type="date" id="chosen-date" onChange={handleDateChange} />
      <label htmlFor="chosen-date" className="">Choose The Class </label>
      <input type="text" placeholder="Enter course" id="chosen-date" onChange={handleclassname} />
      <button id="buttoner" className="mt-4" onClick={handleAttendance}>Display Result</button>
    </div>

  </div>
</div>
  
  <div className="flex flex-row space-x-4 items-center">
    <div className="flex flex-col mt-25">
      <div id = "flex" className="flex flex-row bg-white rounded-md border-2 border-purple-300 w-full h-fit p-2 justify-center ">
        <div className="flex flex-col items-center w-full border-r-2">
          <p className="font-bold text-xl">DATE</p>
          <div className="text-3xl">{Date}</div>

        </div>
        <div className="flex flex-col items-center border-l-2 w-full">
          <p className="font-bold text-xl">Student info</p>
          <div className="text-xl">{Studentname}</div>
          <div>{Studentattendance} days present  out of {Total} days.</div>
          
        </div>
      </div>
      <div className="self-center max-w-1/2 overflow-y-auto min-h-[350px]">
   
    <div className="styled-table overflow-y-auto min-h-[350px]">
          <Rendertable data={data} func={handlerowclick} name="present"/>
          </div>

    </div>
    
    </div>
    {/* <div className="h-full flex-wrap  w-1/2 flex h-full flex-col items-center content-center ">
    <div className="slider-container ">
      <div className="slider">
        <div className="slide">
          <img src="unnamed.png" alt="Image 1" />
        </div>
        <div className="slide">
          <img src="unnamed.png" alt="Image 2" />
        </div>
        <div className="slide">
          <img src="unnamed.png" alt="Image 3" />
        </div>
      </div>
    </div>
    <div className="flex mt-2  flex-row w-full max-w-[400px] items-center place-content-between ">
    <button className="text-xl font-bold text-purple bg-slate-400 self-left h-fit rounded-md p-2 hover:bg-slate-500 hover:shadow-lg ">Previous</button>
    <button className="text-xl font-bold text-purple bg-slate-400  h-fit rounded-md p-2 hover:bg-slate-500 hover:shadow-lg">Next</button>
    </div>
    </div> */}
  </div>
    
</>

    )

}