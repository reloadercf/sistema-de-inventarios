import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Button, Tag, Drawer, InputNumber } from 'antd';
import { deleteMedicine, updateQuantityMedicine } from '../../../../firebase/medicine'

export const TableMedicine = ({data}) => {
    const navigate = useNavigate();
    const tabList = [
        {
          key: 'basics',
          tab: 'Información básica',
        },
        {
          key: 'details',
          tab: 'Detalles',
        },
        {
            key: 'comment',
            tab: 'Comentario',
          },
      ];
      const contentList = {
        basics: <table>
                    <tbody>
                        <tr>
                            <th>Cantidad</th>
                            <th>Unidad medida</th>
                            <th>Gramaje</th>
                            <th>Presentación</th>
                            <th>Cantidad presentación</th>
                            <th>Caducidad</th>
                            <th>Lote</th>
                        </tr>
                        <tr>
                            <td><center>{data.cantidad}</center></td>
                            <td>{data.unidadMedida}</td>
                            <td>{data.gramaje}</td>
                            <td>{data.presentacion}</td>
                            <td>{data.cantidadPresentacion}</td>
                            <td>{data.caducidad.toDate().toLocaleDateString("en-US")}</td>
                            <td>
                                <Tag color="cyan">
                                {data.lote}
                                </Tag>
                            </td>
                        </tr>
                    </tbody>
                </table>,
        details: <table>
                    <tbody>
                        <tr>
                            <th>Procedencia</th>
                            <th>Ingreso</th>
                        </tr>
                        <tr>
                            <td>{data.procedencia}</td>
                            <th>{data.fechaIngreso.toDate().toLocaleDateString("en-US")}</th>
                        </tr>
                    </tbody>
                </table>,
        comment:<Card style={{ width: '100%' }}>
                    <strong>{data.comentarios}</strong>
                </Card>
      };

      const [activeTabKey1, setActiveTabKey1] = useState('basics');

      const onTab1Change = (key) => {
        setActiveTabKey1(key);
      };

      const [visible, setVisible] = useState(false);
      const [quantityExit, setQuantityExit] = useState(0);

      const showDrawer = () => {
        setVisible(true);
      };
    
      const onClose = () => {
        setVisible(false);
        setQuantityExit(0);
      };

      const onChange = (value) => {
        setQuantityExit(value);
      };

      const subtract = () =>{
        const operation=data.cantidad-quantityExit
        if(quantityExit===0){
          setVisible(false)
          console.log('no se hace nada')
        }else if(operation===0){
          deleteMedicine(data.idMedicine, data).then(success=>navigate(`success/${data.nombreComercial}/allDelivery/${quantityExit}`)).catch(err=>console.log(err))
        }else if(operation>0){
          updateQuantityMedicine(data.idMedicine, data, operation).then(success=>navigate(`success/${data.nombreComercial}/delivery/${quantityExit}`)).catch(err=>console.log(err))
        }
      }

  return (
    <div>
        <Card
        style={{
          width: '100%',
        }}
        title={<strong>{data.nombreComercial}</strong>}
        extra={<Button danger onClick={showDrawer} >Sacar Medicamento</Button>}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
      <Drawer width={720} title={`Sacar medicametos de ${data.nombreComercial} `} placement="right" onClose={onClose} visible={visible}>
        Cantidad que quieres retirar: <InputNumber min={1} max={data.cantidad} defaultValue={data.cantidad} onChange={onChange} />
        <p style={{'padding':'70px'}}>
          <Button danger type='primary' onClick={subtract}>Sacar</Button>
        </p>
      </Drawer>
        
    </div>
  )
}
