import DeleteModal from '../components/modal/DeleteModal';
import React, {createContext, useContext, useMemo, useState} from 'react';

const ModalContext = createContext({
  // eslint-disable-next-line
  onActive: () => {},
  active: false,
});

export const ModalProvider = ({children}) => {
  const [active, setActive] = useState(false);
  const [chkData, setChkData] = useState([]);

  const onActive = () => {
    setActive(true);
  };

  const onClose = () => {
    setActive(false);
  };

  const alertModalValue = useMemo(
    () => ({
      active,
      onActive,
      chkData,
      setChkData,
    }),
    [active, chkData],
  );
  return (
    <ModalContext.Provider value={alertModalValue}>
      {children}
      <DeleteModal
        active={active}
        onClose={onClose}
        chkData={chkData}
        setChkData={setChkData}
      />
    </ModalContext.Provider>
  );
};

export default function useModal() {
  return useContext(ModalContext);
}
