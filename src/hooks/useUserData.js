import {usersApis} from 'api/user';
import {useMutation} from 'react-query';

export function useSaveUserData() {
  return useMutation(
    data => {
      return usersApis.userPostData(data);
    },
    {
      onError: err => {
        alert(err.response.data.message);
      },
    },
  );
}

