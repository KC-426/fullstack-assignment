import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Post from "./pages/Post";
import About from "./pages/About"
import Contact from "./pages/Contact"
import AddPost from "./pages/AddPost"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<Post />} />
          <Route path="/about" element={<About />} />
          <Route  path="/contact" element= {<Contact />}/>
          <Route  path="/add_post" element= {<AddPost />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
