import { faCheckCircle, faEye, faScrewdriverWrench, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Options = (liderUser) => {
    return (
        <>
            <div className='txtColors'>
                <b>COLORES:</b>
                <div className='colores'>
                    <div className='coloresTable'>
                        <div className='rojo'></div>
                        <p>CREADO</p>
                        <div className='verde'></div>
                        <p>REPARADO</p>
                    </div>
                    <div className='coloresTable'>
                        <div className='amarillo'></div>
                        <p>NOTIFICADO</p>

                        <div className='azul'></div>
                        <p>VERIFICADO</p>
                    </div>
                </div>
            </div>
            {liderUser !== null && (
                <div className='txtOptions'>
                    <b>Opciones:</b>
                    <div className='colores'>
                        <div className='coloresTable'>
                            <div>
                                <FontAwesomeIcon className='linkMedia' icon={faEye} />
                            </div>
                            <p>NOTIFICAR</p>
                            <div>
                                <FontAwesomeIcon
                                    className='linkMedia'
                                    icon={faScrewdriverWrench}
                                />
                            </div>
                            <p>REPARAR</p>
                        </div>
                        <div className='coloresTable'>
                            <div>
                                <FontAwesomeIcon className='linkMedia' icon={faCheckCircle} />
                            </div>
                            <p>VERIFICAR</p>
                            <div>
                                <FontAwesomeIcon className='linkMedia' icon={faTrash} />
                            </div>
                            <p>BORRAR</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
