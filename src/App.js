import Login from "./Login";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from "./Register";
import Home from "./Home";
// import MovieForm from "./MovieForm";
// import MoviesPage from "./MoviesPage";
import AddMovies from "./AddMovies";



function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path='/add-Movie' element={<AddMovies/>} ></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
