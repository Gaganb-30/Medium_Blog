import type { SignupInput } from "@gagan_30/medium-common";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";



const Auth = ({type} : {type : "signup" | "signin"}) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name : "",
    email : "",
    password : "",
  })
  const navigate = useNavigate();
  async function sendRequest(){
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
      const jwt = res.data.jwt;
      localStorage.setItem("token", `Bearer ${jwt}`);
      navigate("/blogs");
    } catch (error) {
      alert("Error while signing up");
      console.log(error);
    }
  }
  return (
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
          <div>
            <div className="px-10">
              <div className="font-extrabold text-3xl">
                {type ===  "signup" ? "Create a new Account" : "Log in to existing account"}
              </div>
              <div className="text-slate-400 text-center">
                {type ===  "signup" ?"Already have an account?" : "Dont have an account?" }
                <Link to={type ===  "signup" ? "/signin" : "/signup"} className="underline pl-2">
                  {type ===  "signup" ? "Sign in" : "Sign up"}
                </Link>
              </div>
            </div>

            <div className="pt-2">
              {type === "signup" && <LabelledInput label="Name" placeholder="Enter your name" onChange={(e) => {
                setPostInputs(c => ({
                  ...c,
                  name : e.target.value
                }))
              }}/>}
              <LabelledInput label="E-mail" placeholder="Enter your email" onChange={(e) => {
                setPostInputs(c => ({
                  ...c,
                  email : e.target.value
                }))
              }}/>
              <LabelledInput label="Password" type='password' placeholder="Enter your password" onChange={(e) => {
                setPostInputs(c => ({
                  ...c,
                  password : e.target.value
                }))
              }}/>
              <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"? "Sign Up" : "Sign In"}</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Auth;


interface LabelledInputType{
  label : string;
  placeholder : string;
  onChange : (e : ChangeEvent<HTMLInputElement>) => void;
  type? : string;
}
function LabelledInput({label, placeholder, onChange, type} : LabelledInputType){
  return <div>
    <div>
            <label className="block mb-2 text-sm text-gray-900 pt-4 font-semibold">{label}</label>
            <input type={type || "text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required onChange={onChange}/>
        </div>
  </div>
}
