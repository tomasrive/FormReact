import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DivOrdenDetallada, OrdenReparacion } from '../elements/Formularios';

export const OrdenDetallada = () => {
  const [data, setData] = useState([]);
  const { tabla, id } = useParams();

  const URI = `http://192.168.11.139:4001/api/procesos/forms/${tabla}`;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(URI);

      setData(res.data.filter((datos) => datos.id === id)[0]);
    } catch (error) {
      console.log(error);
      alert(
        'BASE DE DATOS NO RESPONDE O SE ENCUENTRA APAGADA, POR FAVOR COMUNICARSE CON EL AREA'
      );
    }
  };

  return (
    <>
      <DivOrdenDetallada>
        <h1>DETALLES DE MOTIVOS DE DENEGACION:</h1>
        <div className='divGrid'>
          <h4>ID de la orden:</h4>
          <h5>{id}</h5>
        </div>
        <OrdenReparacion validate={data.estado}>
          <div>
            <h4>Primer lider que denego</h4>
            <h5>{data.primerLiderDenegado}</h5>
            <h4>Primer motivo de denegacion</h4>
            <h5>{data.primerMotivoDenegado}</h5>
            <h4>Primer fecha denegada</h4>
            <h5>{data.primeraFechaDenegado}</h5>
            <h4>Primer hora denegada</h4>
            <h5>{data.primeraHoraDenegado}</h5>
            <h4>Primer fecha notificado</h4>
            <h5>{data.primeraFechaVisualizado}</h5>
            <h4>Primer hora notificado</h4>
            <h5>{data.primeraHoraVisualizado}</h5>
          </div>
          <div>
            <h4>Primer persona notificada</h4>
            <h5>{data.primerRecibe}</h5>
            <h4>Primer fecha reparado</h4>
            <h5>{data.primeraFechaReparado}</h5>
            <h4>Primer hora reparado</h4>
            <h5>{data.primeraHoraReparado}</h5>
            <h4>Primer persona que reparo</h4>
            <h5>{data.primerRepara}</h5>
            <h4>Primera observacion al reparar</h4>
            <h5>{data.primerObservacionesReparar}</h5>
          </div>

          {data.segundaHoraDenegado && (
            <>
              <div>
                <h4>Segundo lider que denego</h4>
                <h5>{data.segundoLiderDenegado}</h5>
                <h4>Segunda motivo de denegacion</h4>
                <h5>{data.segundoMotivoDenegado}</h5>
                <h4>Segunda fecha denegada</h4>
                <h5>{data.segundaFechaDenegado}</h5>
                <h4>Segunda hora denegada</h4>
                <h5>{data.segundaHoraDenegado}</h5>
                <h4>Segunda fecha notificado</h4>
                <h5>{data.segundaFechaVisualizado}</h5>
                <h4>Segunda hora notificado</h4>
                <h5>{data.segundaHoraVisualizado}</h5>
              </div>
              <div>
                <h4>Segunda persona notificada</h4>
                <h5>{data.segundaRecibe}</h5>
                <h4>Segunda fecha reparado</h4>
                <h5>{data.segundaFechaReparado}</h5>
                <h4>Segunda hora reparado</h4>
                <h5>{data.segundaHoraReparado}</h5>
                <h4>Segunda persona que reparo</h4>
                <h5>{data.segundoRepara}</h5>
                <h4>Segunda observacion al reparar</h4>
                <h5>{data.segundoObservacionesReparar}</h5>
              </div>
            </>
          )}
        </OrdenReparacion>
      </DivOrdenDetallada>
    </>
  );
};
