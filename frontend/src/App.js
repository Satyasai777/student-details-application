import {BrowserRouter,Routes,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from './components/Home';
import CreateStudent from './components/CreateStudent';
import UpdateStudent from './components/UpdateStudent';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path='/create' element={<CreateStudent/>} />
      <Route path='/update/:id' element={<UpdateStudent />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;