import React,{ useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { getOneMedicine, updateAddLotes } from '../../../firebase/medicine'

import { Typography,notification } from 'antd';

export const AddLotes = () => {
    const params = useParams();
    const {idMed} = params;
    const navigate = useNavigate();
    const [newLote, setNewLote] =useState('')
    const [currentMedicine, setCurrentMedicine]=useState(null)
    
    useEffect( ()=>{
        const getData = async()=>{
            return await getOneMedicine(idMed)
        }
        getData().then((data)=>{setCurrentMedicine(data)})

    },[])

    const { Title } = Typography;
    const openNotificationWithIcon = () => {
        notification['success']({
          message: 'Éxito al guardar el nuevo lote',
          description:`Se guardo ${newLote}`,
        });
      };

  return (
    <div>
        {currentMedicine&&<Title level={2}>Agrega un lote para {currentMedicine.name}</Title>}
        <input placeholder='numero de lote' value={newLote} onChange={(e)=>{
            setNewLote(e.target.value)
        }}/>
        <button onClick={()=>{
            updateAddLotes(idMed, currentMedicine.lotes, newLote)
            .then((succes)=>{
                openNotificationWithIcon()
                navigate('/')})
        }}>Guardar Lote</button>
    </div>
  )
}
