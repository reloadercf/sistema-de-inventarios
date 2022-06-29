/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Space, Table, Tag, Button } from 'antd';

import {getMedicine} from '../../../../firebase/medicine'

import { TableMedicine } from './TableMedicine';

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
         {record.items.map((elemet,i)=><TableMedicine data={elemet} key={i} />)}
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
