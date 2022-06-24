import React,{ useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { getOneMedicine, updateAddLotes, deleteLote } from '../../../../../firebase/medicine'

import { Typography,notification, Button, Table, Space, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

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

    const confirm = (element) => {
        Modal.confirm({
          title: 'Confirm',
          icon: <ExclamationCircleOutlined />,
          content: `Quieres borrar ${element}`,
          okText: 'Borrar',
          cancelText: 'No borrar',
          onOk() {
            deleteLote(idMed,element).then(success=>navigate('/'));
          },
        });
      };

    const openNotificationWithIcon = () => {
        notification['success']({
          message: 'Éxito al guardar el nuevo lote',
          description:`Se guardo ${newLote}`,
        });
      };

      const columns = [
        {
          title: 'Lote',
          dataIndex: '',
          key:''
        },
        {
          title: 'Opciones',
          key:'',
          render: (_, record) => (
            <Space size="middle">
              <Button danger type="primary" onClick={()=>{
                confirm(record)
              }}>Borrar Lote</Button>
              
            </Space>
          )
        }]

        

  return (
    <div>
        {currentMedicine&&<Title level={2}>Agrega un lote para {currentMedicine.name}</Title>}
        <input placeholder='numero de lote' value={newLote} onChange={(e)=>{
            setNewLote(e.target.value)
        }}/>
        <Button type='primary' onClick={()=>{
            updateAddLotes(idMed, currentMedicine.lotes, newLote)
            .then((succes)=>{
                openNotificationWithIcon()
                navigate('/')})
        }}>Guardar Lote</Button>
        <br/>
        {currentMedicine&&<>
            <Table columns={columns} dataSource={currentMedicine.lotes} />
        </>}
    </div>
  )
}
