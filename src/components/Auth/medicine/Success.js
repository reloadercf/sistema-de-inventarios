import { useParams, useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

export const Success = () => {
  const params = useParams();
  const { medicine, kind, quantity  } = params;
  const navigate = useNavigate();
  
  return (
    <Result
    status="success"
    title={`Salida de ${medicine}  exitosa`}
    subTitle={kind==='delivery'?`Se registro una salida de la cantida de ${quantity} correspondiente a ${medicine}`:`Se registro una salida TOTAL por la cantida de ${quantity} correspondiente a ${medicine}`}
    extra={[
      <Button type="primary" key="success" onClick={()=>{navigate('/')}}>
        Regresar a ver los medicamentos
      </Button>
    ]}
  />
  )
}
