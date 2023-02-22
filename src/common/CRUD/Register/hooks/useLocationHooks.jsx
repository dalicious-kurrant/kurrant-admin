import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const useLocationHooks = ({handleClose}) => {
  const {pathname} = useLocation();

  useEffect(() => {
    // if (
    //   !CRUDAvaliableList.map(value => {
    //     return `/main/${value}`;
    //   }).includes(pathname)
    // ) {
    //   handleClose();
    // }
  }, [pathname]);

  return {pathname};
};
export default useLocationHooks;
