import { useState,useEffect } from "react";
import {Routes,Route} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getRol } from "../firebase/auth";

import { Dashboard } from "./Auth/Dashboard";
import { RegisterMedicine } from "./Auth/medicine/RegisterMedicine";
import { ListMedicine } from "./Auth/medicine/ListMedicine/ListMedicine";
import { AddMedicine } from "./Auth/medicine/AddMedicine";
import { AddLotes } from "./Auth/medicine/ListMedicine/Lotes/AddLotes"
import { Login } from "./noAuth/Login";
import {Bienvenida} from "./Bienvenida"
import { Error } from "./Error";


export const Paths = () => {
  const [isAuth, setIsAuth] = useState(null);

  const auth = getAuth();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getRol(user.uid).then((rol)=>{setIsAuth({...user, rol:rol.rol})})
      } else {
        setIsAuth(null)
      }
    });
  },[])


  return (
    <Routes>
        {isAuth?
        <>{isAuth.rol==='visitor'?
        <Route path="/" element={<Bienvenida />} />:
        isAuth.rol==='admin'?
        <Route path="/" element={<Dashboard />} >
          <Route path="/" element={<ListMedicine />} />
          <Route path="/new" element={<RegisterMedicine />} />
          <Route path="/addmedicine/:idMed" element={<AddMedicine />} />
          <Route path="/addlote/:idMed" element={<AddLotes />} />
        </Route>:
        <Route path="/" element={<Error />} />
      }
        </>
        :
         <Route path="/" element={<Login />} />
         }
  </Routes>
  )
}
