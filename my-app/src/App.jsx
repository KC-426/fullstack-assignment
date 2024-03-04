// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './style/App.css'
// import Signup from './pages/Signup'
// import Header from './components/Header'
// import Post from "./pages/Post"

// function App() {

//   return (
//     <>
//     <Header />
//     {/* <Signup /> */}
//     {/* <Post /> */}
//     </>
//   )
// }

// export default App


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Post from "./pages/Post";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<Post />} />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
