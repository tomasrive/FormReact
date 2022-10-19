import { useEffect, useState } from 'react';
import {
  BotonInicioTabla,
  ContenedorBotonInicio,
} from '../../../elements/styledComponents';
import axios from 'axios';
import { CompModal, Options, Table, ButtonSesion } from '../../';
import { useOptions } from '../../../hooks';

const URI = 'http://192.168.11.139:4001/api/procesos/forms/maquinas';

export const CompTableInyectoras = () => {
  const [data, setData] = useState([]);

  const { dataModal, modal, stateModal, setStateModal, deleteSession } =
    useOptions();

  const LiderUser = sessionStorage.getItem('LiderUser');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(URI);
      setData(res.data);
    } catch (error) {
      console.log(error);
      alert(
        'BASE DE DATOS NO RESPONDE O SE ENCUENTRA APAGADA, POR FAVOR COMUNICARSE CON EL AREA'
      );
    }
    setInterval(() => {
      window.location.reload();
    }, 600000);
  };

  const deleteRow = async (dataTable) => {
    try {
      await axios.delete(URI + '/' + dataTable.id);
      window.location.reload();
    } catch (error) {
      alert('No se pudo eliminar la orden');
    }
  };

  data.sort((a, b) => {
    const creadoA = a.fechaCreado + a.horaCreado;
    const creadoB = b.fechaCreado + b.horaCreado;

    const categoriaA = a.categoria;
    const categoriaB = b.categoria;

    const verificadoA = a.horaVerificado + a.horaVerificado;

    if (verificadoA) {
      return 1;
    }
    if (creadoA > creadoB) {
      return -1;
    } else {
      if (categoriaA > categoriaB) {
        return -1;
      }
    }

    return 0;
  });

  return (
    <>
      <CompModal
        state={stateModal}
        setState={setStateModal}
        dataTable={dataModal}
      />

      <h1 className='titleTop'>
        TABLA DE ORDENES DE REPARACION (MANTENIMIENTO INYECTORAS)
      </h1>

      <Options liderUser={LiderUser} />

      <ButtonSesion liderUser={LiderUser} deleteSession={deleteSession} />

      <Table
        data={data}
        liderUser={LiderUser}
        deleteRow={deleteRow}
        modal={modal}
      />

      <div className='noStyleDiv'>
        {LiderUser !== null && (
          <a className='noStyle' href='/FormCreateInyectoras'>
            <ContenedorBotonInicio>
              <BotonInicioTabla type='submit' validate='valid'>
                Crear orden de reparacion: Mantenimiento Inyectoras
              </BotonInicioTabla>
            </ContenedorBotonInicio>
          </a>
        )}
      </div>
    </>
  );
};
