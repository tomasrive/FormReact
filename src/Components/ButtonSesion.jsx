import { BotonInicio, ContenedorBotonCentrado } from "../elements/Formularios"

export const ButtonSesion = ({ liderUser, deleteSession }) => {
    return (
        <ContenedorBotonCentrado>
            {liderUser !== null && (
                <div>
                    <BotonInicio
                        type='submit'
                        onClick={deleteSession}
                        validate='denied'
                    >
                        <a
                            className='noStyle'
                            href='http://192.168.11.139:3000/inyeccion'
                        >
                            Cerrar Sesion
                        </a>
                    </BotonInicio>
                </div>
            )}

            <a href='http://192.168.11.139:3000/inyeccion'>
                {liderUser !== null ? (
                    <BotonInicio type='submit'>Atras</BotonInicio>
                ) : (
                    <BotonInicio type='submit' validate='valid'>
                        Iniciar sesion
                    </BotonInicio>
                )}
            </a>
        </ContenedorBotonCentrado>
    )
}
