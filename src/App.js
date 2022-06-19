import {
  BrowserRouter,
} from "react-router-dom";
import { Paths } from "./components/Paths";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Paths />
    </BrowserRouter>
  );
}

export default App;
