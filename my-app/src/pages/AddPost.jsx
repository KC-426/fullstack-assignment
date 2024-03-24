import { TextField } from "@mui/material";
import Layout from "../components/Layout";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];

export default function About() {
  const [postName, setPostName] = useState("");
  const [postBy, setPostBy] = useState("");
  const [about, setAbout] = useState("");
  const [file, setFile] = useState(null)

  const handleAddPost = async (e) => {
    e.preventDefault();

    try {
      const url = `http://localhost:3000/post/create_post`;
      const response = await axios.post(
        url,
        { postName, postBy, about },
        { withCredentials: true }
      );
      console.log(response);

      if (response.data.success) {
        setPostName("");
        setPostBy("");
        setAbout("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Layout>
        <div className="main_container">
          <h1 className="font-bold text-2xl text-center text-gray-600">
            Here you can add your posts.
          </h1>

          <form onSubmit={handleAddPost}>
            <div className="mt-14">
              <TextField
                id="outlined-basic"
                color="primary"
                label="Post name"
                variant="outlined"
                fullWidth
                value={postName}
                onChange={(e) => {
                  setPostName(e.target.value);
                }}
              />
            </div>

            <div className="mt-6">
              <TextField
                id="outlined-basic"
                color="primary"
                label="Posted By"
                variant="outlined"
                fullWidth
                value={postBy}
                onChange={(e) => {
                  setPostBy(e.target.value);
                }}
              />
            </div>

            <div className="mt-6">
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                style={{ height: "220px" }}
                value={about}
                onChange={setAbout}
              />
            </div>

            {/* <div className="mt-16">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div> */}

            <div className="mt-20 flex justify-end text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none w-40 ">
              <button>Add Post</button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}
