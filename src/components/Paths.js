import { useState } from "react";
import {Routes,Route} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Dashboard } from "./Auth/Dashboard";
import { RegisterMedicine } from "./Auth/medicine/RegisterMedicine";
import { ListMedicine } from "./Auth/medicine/ListMedicine";
import { AddMedicine } from "./Auth/medicine/AddMedicine";
import { AddLotes } from "./Auth/medicine/AddLotes"
import { Login } from "./noAuth/Login";

export const Paths = () => {
  const [isAuth, setIsAuth] = useState(null);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
  if (user) {
    setIsAuth(user)
  } else {
    setIsAuth(null)
  }
});

  return (
    <Routes>
        {isAuth?<Route path="/" element={<Dashboard />} >
          <Route path="/" element={<ListMedicine />} />
          <Route path="/new" element={<RegisterMedicine />} />
          <Route path="/addmedicine/:idMed" element={<AddMedicine />} />
          <Route path="/addlote/:idMed" element={<AddLotes />} />
        </Route>:
         <Route path="/" element={<Login />} />}
  </Routes>
  )
}
