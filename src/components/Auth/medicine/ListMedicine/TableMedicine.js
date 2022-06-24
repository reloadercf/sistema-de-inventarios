import { useState } from 'react';
import { Card, Button, Tag } from 'antd';

export const TableMedicine = ({data}) => {
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
                            <th>Caducidad</th>
                            <th>Lote</th>
                        </tr>
                        <tr>
                            <td><center>{data.cantidad}</center></td>
                            <td>{data.unidadMedida}</td>
                            <td>{data.gramaje}</td>
                            <td>{data.presentacion}</td>
                            <td>{data.caducidad.toDate().toLocaleDateString("en-US")}</td>
                            <td>
                                <Tag color="geekblue">
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
  return (
    <div>
        <Card
        style={{
          width: '100%',
        }}
        title={<strong>{data.nombreComercial}</strong>}
        extra={<Button danger href="#">Sacar Medicamento</Button>}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
        
    </div>
  )
}
