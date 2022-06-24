import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { getOneMedicine, updateAddMedicine } from '../../../firebase/medicine'

import {
    Typography, notification, Select, Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
} from 'antd';

// nombrecomercial
// presentacion
// cantidad presentacion eje 30 tab
// gramage
// unidad de medida
// fecha de caducidad
// fecha de ingreso
// procedencia
// unidades

export const AddMedicine = () => {
    const params = useParams();
    const { idMed } = params;
    const navigate = useNavigate();

    const [currentMedicine, setCurrentMedicine] = useState(null)

    useEffect(() => {
        const getData = async () => {
            return await getOneMedicine(idMed)
        }
        getData().then((data) => { setCurrentMedicine(data) })

    }, [])

    const { Title } = Typography;

    const openNotificationWithIcon = (nombreComercial) => {
        notification['success']({
            message: 'Medicamento agregado',
            description: `Se guardo ${nombreComercial} `,
        });
    };

    const { Option } = Select;
    const { TextArea } = Input;

    const onFinish = (values) => {
        updateAddMedicine(idMed, currentMedicine.items, values)
        .then((success)=>{
            openNotificationWithIcon(values.nombreComercial)
            navigate('/')
        })
        .catch(err=>console.log(err))
        ;
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const dateFormat = 'DD/MM/YYYY';

    return (
        <div>
            {currentMedicine && <Title level={2}>Agrega unidades a {currentMedicine.name}</Title>}
            <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
                <Form.Item rules={[{ required: true, message: 'Porfavor llena este campo!' }]}
                    label="nombre comercial"
                    name="nombreComercial">
                    <Input />
                </Form.Item>

                <Form.Item rules={[{ required: true, message: 'Porfavor llena este campo!' }]}
                    label="cantidad"
                    name="cantidad">
                    <InputNumber min={1} />
                </Form.Item>

                <Form.Item rules={[{ required: true, message: 'Porfavor llena este campo!' }]}
                    label="presentacion"
                    name="presentacion">
                    <Select>
                        <Option value="tableta">tableta</Option>
                        <Option value="ampolleta">ampolleta</Option>
                        <Option value="capsula">capsula</Option>
                        <Option value="gragea">gragea</Option>
                        <Option value="liquido">liquido</Option>
                        <Option value="polvo">polvo</Option>
                        <Option value="gel">gel</Option>
                        <Option value="otra">otra</Option>
                    </Select>
                </Form.Item>

                <Form.Item rules={[{ required: true, message: 'Porfavor llena este campo!' }]}
                    label="Lote"
                    name="Lote">
                    <Select>
                        {currentMedicine && currentMedicine.lotes.map((lote, i) => <Option value={lote} key={i} >{lote}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item rules={[{ required: true, message: 'Porfavor llena este campo!' }]}
                    label="gramaje"
                    name="gramaje">
                    <Input />
                </Form.Item>

                <Form.Item rules={[{ required: true, message: 'Porfavor llena este campo!' }]}
                    label="unidad de medida"
                    name="unidadMedida">
                    <Select>
                        <Option value="caja">caja</Option>
                        <Option value="frasco">frasco</Option>
                        <Option value="botella">botella</Option>
                        <Option value="sobre">sobre</Option>
                    </Select>
                </Form.Item>

                <Form.Item rules={[{ required: true, message: 'Porfavor llena este campo!' }]}
                    label="fecha de caducidad"
                    name="caducidad">
                    <DatePicker format={dateFormat}/>
                </Form.Item>

                <Form.Item rules={[{ required: true, message: 'Porfavor llena este campo!' }]}
                    label="fecha de ingreso"
                    name="fechaIngreso">
                    <DatePicker format={dateFormat}/>
                </Form.Item>

                <Form.Item rules={[{ required: true, message: 'Porfavor llena este campo!' }]}
                    label="procedencia"
                    name="procedencia">
                    <Select>
                        <Option value="donación">donación</Option>
                        <Option value="requisición">requisición</Option>
                        <Option value="Hospital General">Hospital General</Option>
                        <Option value="Villa Ocaranza">Villa Ocaranza</Option>
                        <Option value="otros">otros</Option>
                    </Select>
                </Form.Item>

                <Form.Item 
                    label="comentarios"
                    name="comentarios">
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}
                    label="">
                    <Button type="primary" htmlType="submit" size={'large'}>
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
