import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import {addMedicine} from '../../../firebase/medicine'


export const RegisterMedicine = () => {

  let navigate = useNavigate();

  const [medicine, setMedicine]=useState({
    name:'',
    lotes:[],
    items:[],
  })

  const handleName=(e)=>{
    setMedicine((currentMedicine)=>{return{...currentMedicine, name:e.target.value}})
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
      <br/>
      <br/>
      <button onClick={handleRegisterMedicine}>Guardar</button>
    </div>
  )
}
