import {FormProvider} from 'react-hook-form';

const Form = ({children, form}) => {
  return <FormProvider {...form}>{children}</FormProvider>;
};

export default Form;
