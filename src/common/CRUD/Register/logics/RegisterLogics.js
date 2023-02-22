export const makeInitialInput = data => {
  let initialInput = {};
  Object.keys(data).map(value => {
    initialInput[value] = '';
  });

  return initialInput;
};

export const tellAlertLogic = statusName => {
  switch (statusName) {
    case 'notFulfilled':
      return <h1>작성하신 곳에 혹시 빈칸이 있나 확인해보세요...</h1>;
    case 'doneRegister':
      return <h1>추가되었습니다 </h1>;
    case 'doneEdit':
      return <h1>수정되었습니다 </h1>;
    default:
      return;
  }
};

export const handleSubmitLogic = (
  input,
  fieldsInput,
  registerStatus,
  setSubmitStatus,
  submitMutate,
  editMutate,
  handleClose,
) => {
  const fieldsArray = fieldsInput.map(value => input[value.fieldName]);

  if (registerStatus === 'register') {
    if (fieldsArray.includes('')) {
      setSubmitStatus('notFulfilled');
      return;
    }
    setSubmitStatus('doneRegister');
    submitMutate(input);
  } else if (registerStatus === 'edit') {
    if (fieldsArray.includes('')) {
      setSubmitStatus('notFulfilled');
      return;
    }

    setSubmitStatus('doneEdit');
    editMutate(input);

    handleClose();
  }
};
