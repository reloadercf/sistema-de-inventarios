import {Routes,Route} from "react-router-dom";

import { Dashboard } from "./Auth/Dashboard";
import { RegisterMedicine } from "./Auth/medicine/RegisterMedicine";
import { ListMedicine } from "./Auth/medicine/ListMedicine";
import { AddMedicine } from "./Auth/medicine/AddMedicine";
import { AddLotes } from "./Auth/medicine/AddLotes"

export const Paths = () => {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />} >
          <Route path="/" element={<ListMedicine />} />
          <Route path="/new" element={<RegisterMedicine />} />
          <Route path="/addmedicine/:idMed" element={<AddMedicine />} />
          <Route path="/addlote/:idMed" element={<AddLotes />} />
        </Route>
  </Routes>
  )
}
