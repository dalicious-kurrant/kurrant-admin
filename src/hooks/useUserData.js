import {calendarApis} from 'api/calendar';
import {usersApis} from 'api/user';
import {useMutation, useQuery} from 'react-query';
import {scheduleFormatted} from 'utils/statusFormatter';

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
