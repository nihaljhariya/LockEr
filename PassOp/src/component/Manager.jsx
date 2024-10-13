import { useRef, useState, useEffect } from "react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import PasswordCell from "./Password";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPass = () => {
    passwordRef.current.type = "text";

    if (ref.current.src.includes("Icons/EyeClose.png")) {
      ref.current.src = "Icons/EyeOpen.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "Icons/EyeClose.png";
      passwordRef.current.type = "password";
    }
  };

  const savePass = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      setForm({ site: "", password: "", username: "" });
      toast.success("Saved Successfully !", {
        position: "bottom-left",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Site , UserName & Password can not be Empty!!", {
        position: "bottom-left",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const deletePass = (id) => {
    let c = confirm("Do You Want to delete..?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
  };

  const editPass = (id) => {
    setForm(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast.success("Copied !", {
      position: "bottom-left",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

      <div className="py-3  md:mycontainer min-h-[81.2vh]  ">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-orange-700"> &lt;</span>

          <span className="text-white">Lock</span>
          <span className="text-orange-700">Er/&gt;</span>
        </h1>

        <p className="text-white text-lg  text-center">
          Your Own Password Manager
        </p>

        <div className="text-white flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website "
            className="rounded-full border border-green-400 w-full text-black p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username "
              className="rounded-full border border-green-400 w-full text-black p-4 py-1"
              type="text"
              name="username"
              id="username"
            />

            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password "
                className="rounded-full border border-green-400 w-full text-black p-4 py-1"
                type="text"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[7px]  cursor-pointer "
                onClick={showPass}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={35}
                  src="Icons/EyeOpen.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePass}
            className=" flex justify-center gap-1 border text-white items-center bg-slate-700 hover:bg-slate-600  rounded-full px-4 py-2 w-fit"
          >
            {" "}
            Add User
            <span>
              {" "}
              <i class=" mx-2 fa-solid fa-user-plus"></i>
            </span>
          </button>
        </div>
        {/* Table Content  */}
        <div className="passwords">
          <h2 className="font-bold text-white text-xl py-4 text-center">
            <span className="text-orange-700">&lt;</span>Your Passwor
            <span className="text-orange-700">ds/&gt;</span>
          </h2>
          {passwordArray.length === 0 && (
            <div className="font-bold text-white text-3xl py-4 text-center">
              {" "}
              No passwords to show !!{" "}
            </div>
          )}
          {passwordArray.length != 0 && (
            <table
              className=" text-white table-auto w-full 
                                                       px-5 bg-gray-700 bg-opacity-50 rounded-lg overflow-hidden "
            >
              <thead className="bg-slate-900 ">
                <tr>
                  <th className="py-2 bg-orange-700">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2 bg-orange-700">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border border-black text-center w-32">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <i
                          onClick={() => copyText(item.site)}
                          className=" cursor-pointer px-2 w-5 fa-regular fa-copy"
                        ></i>
                      </td>
                      <td className=" py-2 border border-black text-center w-32">
                        {item.username}{" "}
                        <i
                          onClick={() => copyText(item.username)}
                          className=" cursor-pointer px-2 w-5 fa-regular fa-copy"
                        ></i>
                      </td>
                      {/* <td
                        
                        className="  py-2 border border-black text-center w-32"
                      >
                        {item.password}{" "}
                        <i  
                          onClick={() => copyText(item.password)}
                          className=" cursor-pointer px-2 w-5 fa-regular fa-copy"
                        ></i>
                      </td> */}
                      <td className="py-2 border border-black text-center w-32">
                        <span>
                          {item.isVisible ? item.password : "••••••••"}
                        </span>


                        {/* new Eye */}
                     

                        {/* Copy Icon */}
                        <i
                          onClick={() => copyText(item.password)}
                          className="cursor-pointer px-2 w-5 fa-regular fa-copy"
                          title="Copy Password"
                          aria-label="Copy Password"
                        ></i>
                      </td>
                      <td className=" py-2 border border-black text-center w-32">
                        <span>
                          <i
                            onClick={() => {
                              editPass(item.id);
                            }}
                            className=" cursor-pointer fa-regular fa-pen-to-square"
                          ></i>
                        </span>
                        <span>
                          {" "}
                          <i
                            onClick={() => {
                              deletePass(item.id);
                            }}
                            className=" cursor-pointer px-2 fa-regular fa-trash-can"
                          ></i>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
