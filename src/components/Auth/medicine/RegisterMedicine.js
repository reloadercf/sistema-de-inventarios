import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import {addMedicine} from '../../../firebase/medicine'
import today from '../../../helpers/today'

export const RegisterMedicine = () => {

  let navigate = useNavigate();

  const [medicine, setMedicine]=useState({
    name:'',
    stockNumber:'',
    lotes:[],
    items:[],
    historial:[`Se creo este medicamento ${today()}`]
  })

  const handleName=(e)=>{
    setMedicine((currentMedicine)=>{return{...currentMedicine, name:e.target.value}})
  }

  const handleStock=(e)=>{
    setMedicine((currentMedicine)=>{return{...currentMedicine, stockNumber:e.target.value}})
  }
  const handleRegisterMedicine =async()=>{
   await addMedicine(medicine)
    .then((success)=>{navigate("/", { replace: true })})
    .catch((err)=>{console.log(err)})
  }

  return (
    <div>
      <br/>
      <br/>
      <input onChange={handleName} value={medicine.name} placeholder='nombre generico'/>
      <input onChange={handleStock} value={medicine.stockNumber} placeholder='numero inventario'/>
      <br/>
      <br/>
      <button onClick={handleRegisterMedicine}>Guardar</button>
    </div>
  )
}
