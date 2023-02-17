import {useEffect, useState} from 'react';

const useSelect = selectBox => {
  const [clickSelectedBox, setClickSelectedBox] = useState(false);

  useEffect(() => {
    const handleSelect = e => {
      if (!e.target) return;

      if (!selectBox.current?.contains(e.target)) {
        setClickSelectedBox(false);
      }
    };
    document.addEventListener('click', handleSelect);
    return () => document.removeEventListener('click', handleSelect);
  }, [selectBox]);
  return [clickSelectedBox, setClickSelectedBox];
};

export default useSelect;
