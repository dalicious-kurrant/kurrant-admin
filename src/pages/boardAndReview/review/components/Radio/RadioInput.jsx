const RadioInput = ({
  children,
  value,
  name,
  defaultChecked,
  disabled,
  onChange,
}) => {
  return (
    <label>
      <input
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={e => {
          onChange(e);
        }}
      />
      {children}
    </label>
  );
};
export default RadioInput;
