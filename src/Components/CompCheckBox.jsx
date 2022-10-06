export const CustomRoundedCheckbox = ({ onClick, isChecked, title }) => {
  return (
    <div className='custom-rounded-checkbox approved-checkbox'>
      <h2 className='noStyle'>{title}</h2>
      <input type='checkbox' checked={isChecked} onClick={onClick} />
      <span onClick={onClick} tabIndex={1} />
    </div>
  );
};
