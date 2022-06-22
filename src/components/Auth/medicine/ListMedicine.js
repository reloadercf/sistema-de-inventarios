/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import {getMedicine} from '../../../firebase/medicine'
import { useNavigate } from "react-router-dom";
import { Space, Table, Tag, Button, DatePicker } from 'antd';

export const ListMedicine = () => {
    const navigate = useNavigate();
    const [medicine, setMedicine]=useState(null)
    useEffect( ()=>{
        const getData = async()=>{
            return await getMedicine()
        }
        getData().then((data)=>{setMedicine(data)})
        console.log(medicine)

    },[])

      const columns = [
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
      },
      Table.EXPAND_COLUMN,
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render:(tag) => (
          <>
            <Tag color="cyan" key={tag}>
                {tag}
              </Tag>
          </>
        )
      },
      {
        title: 'Stock Number',
        dataIndex: 'stockNumber',
        key: 'stockNumber',
      },
      {
        title:'Actiones',
        key:'key',
        render: (_, record) => (
          <Space size="middle">
            <Button type="primary" onClick={()=>{
              navigate(`addmedicine/${record.key}`)
            }}>+ Medicamento</Button>
            <Button onClick={()=>{
              navigate(`addlote/${record.key}`)
            }}>+ Lote</Button>
          </Space>
        )
      },
      {
        title: 'lotes',
        dataIndex: 'lotes',
        key: 'lotes',
        render:(tags) => (
          <>
            {tags.map((tag) => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </>
        )
      },
    ]


  return (<div>

      {medicine 
      && 
      <Table 
      columns={columns} 
      expandable={{
      expandedRowRender: (record) => (
        <span
          style={{
            margin: 0,
          }}
        >
         {record.items.map((elemet,i)=><p key={i}>
          Nombre Comercial <strong>{elemet.nombreComercial} </strong>,
          Cantidad: <Tag>{elemet.cantidad} <strong>{elemet.unidadMedida}</strong></Tag>  Gramaje: <strong>{elemet.gramaje}</strong>, Presentación: <strong>{elemet.presentacion}</strong>, Caducidad:{elemet.caducidad.toDate().toLocaleString()}
          </p>)}
        </span>
      ),
    }
  }

  pagination={{
    position: ['none', 'none'],
  }}
      dataSource={medicine} 
      />}
  </div>
  )
}
