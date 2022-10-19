export const UnknownPage = () => {
  const back = () => {
    window.location.replace('/');
  };
  return (
    <div id='oopss'>
      <div id='error-text'>
        <span>404</span>
        <p>PAGINA NO ENCONTRADA</p>
        <p class='hmpg'>
          <button onClick={back} class='back'>
            VOLVER AL INICIO
          </button>
        </p>
      </div>
    </div>
  );
};
