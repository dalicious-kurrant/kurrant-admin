import RadioGroup from './RadioGroup';
import RadioInput from './RadioInput';

const Radio = ({setChange, name, inputList = []}) => {
  return (
    <>
      <fieldset>
        <RadioGroup>
          {inputList.map((v, i) => {
            return (
              <RadioInput
                key={i}
                name={name}
                value={v.value}
                onChange={e => {
                  setChange(e);
                }}
                defaultChecked={v.defaultChecked}>
                {v.title}
              </RadioInput>
            );
          })}
        </RadioGroup>
      </fieldset>
    </>
  );
};
export default Radio;
