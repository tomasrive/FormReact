import { faCheckCircle, faEye, faPlus, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { DivOpciones, TR } from "../elements/Formularios"

export const CompRow = ({ dataTable, liderSesion, modal }) => {

    return (
        <>
            <TR key={dataTable.id} validate={dataTable.estado}>
                <td>
                    {dataTable.fechaCreado}
                    <hr />
                    {dataTable.horaCreado}
                </td>
                {dataTable.tabla === '/maquinas/'
                    ?
                    <td>{dataTable.maquinas}</td>
                    :
                    <td>{dataTable.molde}</td>
                }

                <td>{dataTable.lider}</td>
                <td>{dataTable.descripcion}</td>
                <td>
                    {dataTable.fechaVisualizado}
                    <hr />
                    {dataTable.horaVisualizado}
                </td>
                <td>
                    {dataTable.fechaReparado}
                    <hr />
                    {dataTable.horaReparado}
                </td>
                <td>
                    {dataTable.fechaVerificado}
                    <hr />
                    {dataTable.horaVerificado}
                </td>
                <td>
                    <DivOpciones validate={dataTable.estado}>
                        {liderSesion !== null ? (
                            <>
                                <Link
                                    to={`/FormVisualizar${dataTable.tabla}${dataTable.id}`}
                                    title='Visualizar'
                                >
                                    <FontAwesomeIcon className='linkMedia' icon={faEye} />
                                </Link>

                                <Link
                                    to={`/FormReparar/${dataTable.tabla}/${dataTable.id}`}
                                    title='Reparar'
                                >
                                    <FontAwesomeIcon
                                        className='linkMedia'
                                        icon={faScrewdriverWrench}
                                    />
                                </Link>
                                <Link
                                    to={`/FormVerificado/${dataTable.tabla}/${dataTable.id}`}
                                    title='Verificar'
                                >
                                    <FontAwesomeIcon
                                        className='linkMedia'
                                        icon={faCheckCircle}
                                    />
                                </Link>
                            </>
                        ) : (
                            <></>
                        )}

                        <button
                            onClick={() => modal(dataTable)}
                            className='btnTable'
                            title='Abrir orden completa'
                        >
                            <FontAwesomeIcon className='linkMedia' icon={faPlus} />
                        </button>
                    </DivOpciones>
                </td>
                <td>{dataTable.estado.toUpperCase()}</td>
            </TR>
        </>
    )
}