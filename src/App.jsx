import axios from "axios";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter} from "react-router-dom";
import { Toaster,toast } from "react-hot-toast";
import './App.css'
function App() {
  axios.defaults.baseURL = 'http://localhost:8080';

  return (
  <>
  <Toaster/>
     <BrowserRouter>
     
       <AppRoutes/>
    </BrowserRouter>
    </>
     )
}

export default App