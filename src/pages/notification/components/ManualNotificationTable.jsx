import {
  usePostManualNotification,
} from 'hooks/useNotification';
import {useAtom} from 'jotai';
import {
  Button,
  Dropdown,
  Table,
  TextArea,
} from 'semantic-ui-react';
import {TableWrapper} from 'style/common.style';
import styled from 'styled-components';
import {notificationAtom} from '../store';

const pageOption = [
  {key: 'Home', text: '홈', value: 'Home'},
  {key: 'BUY_MEAL_PAGE', text: '식단 구매', value: 'BUY_MEAL_PAGE'},
  {
    key: 'P_MAIN__MYPAGE__WRITTENREVIEW',
    text: '리뷰 작성',
    value: 'P_MAIN__MYPAGE__WRITTENREVIEW',
  },
  {key: 'S_MAIN__REVIEW', text: '리뷰 관리', value: 'S_MAIN__REVIEW'},
  {
    key: 'P__MY_PAGE__PUBLIC_NOTICE',
    text: '전체 공지사항',
    value: 'P__MY_PAGE__PUBLIC_NOTICE',
  },
  {
    key: 'P__MY_PAGE__SPOT_NOTICE',
    text: '스팟 공지사항',
    value: 'P__MY_PAGE__SPOT_NOTICE',
  },
];

const ManualNotificationTable = () => {
  const [notificationData, setNotificationData] = useAtom(notificationAtom);
  const {mutateAsync: postNotification} = usePostManualNotification();
  const postPushAlram = async () => {
    const notify = notificationData.map(noti => {
      return {
        type: noti.type.value,
        groupIds: noti.groupIds
          ? noti.groupIds.map(group => {
              return group.value;
            })
          : null,
        spotIds: noti.spotIds
          ? noti.spotIds.map(spot => {
              return spot.value;
            })
          : null,
        userIds: noti.userIds
          ? noti.userIds.map(user => {
              return user.value;
            })
          : null,
        message: noti.message,
        page: noti.page,
      };
    });
    try {
      await postNotification(notify);
      alert('푸시알림이 발송 되었습니다.');
      setNotificationData([]);
    } catch (error) {
      alert(error.toString());
    }
  };
  return (
    <TableWrapper>
      <ListTitle>발송 대기 리스트</ListTitle>
      <ButtonContainer>
        <Button color="twitter" onClick={postPushAlram}>
          발송
        </Button>
      </ButtonContainer>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>타입</Table.HeaderCell>
            <Table.HeaderCell>스팟</Table.HeaderCell>
            <Table.HeaderCell>상세스팟</Table.HeaderCell>
            <Table.HeaderCell>유저</Table.HeaderCell>
            <Table.HeaderCell>이메일</Table.HeaderCell>
            <Table.HeaderCell>메시지</Table.HeaderCell>
            <Table.HeaderCell>화면전환</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {notificationData.map(v => {
            return (
              <Table.Row key={v.id}>
                <Table.Cell width={2}>{v.type.text}</Table.Cell>
                <Table.Cell width={v.type.value === 1 ? 2 : 1}>
                  {v?.groupIds
                    ? v?.groupIds
                        ?.map(v => {
                          return v.text;
                        })
                        .join(',')
                    : '전체'}
                </Table.Cell>
                <Table.Cell width={v.type.value === 2 ? 2 : 1}>
                  {v?.spotIds
                    ? v?.spotIds
                        ?.map(v => {
                          return v.text;
                        })
                        .join(',')
                    : '전체'}
                </Table.Cell>
                <Table.Cell width={v.type.value === 3 ? 2 : 1}>
                  {v?.userIds
                    ? v?.userIds
                        ?.map(v => {
                          return v.text;
                        })
                        .join(',')
                    : '전체'}
                </Table.Cell>
                <Table.Cell width={v.type.value === 3 ? 2 : 1}>
                  <EmailContainer>
                    {v?.userIds
                      ? v?.userIds?.map(user => {
                          return (
                            <EmailText key={user.value + user.key}>
                              {user.key}
                            </EmailText>
                          );
                        })
                      : '전체'}
                  </EmailContainer>
                </Table.Cell>
                <Table.Cell width={4}>
                  <TextArea
                    rows={3}
                    maxLength="1000"
                    defaultValue={v.message}
                    style={{
                      width: '100%',
                      border: '1px solid #eee',
                      padding: 10,
                      borderRadius: 10,
                      resize: 'none',
                      fontSize: 14,
                    }}
                    onInput={(e, data) => {
                      setNotificationData(
                        notificationData.map(notifi => {
                          if (notifi.id === v.id) {
                            return {...notifi, message: data.value};
                          }
                          return notifi;
                        }),
                      );
                    }}
                  />
                </Table.Cell>
                <Table.Cell width={2}>
                  <Dropdown
                    placeholder="페이지"
                    fluid
                    selection
                    search
                    options={pageOption}
                    value={v.page}
                    onChange={(e, data) => {
                      setNotificationData(
                        notificationData.map(notifi => {
                          if (notifi.id === v.id) {
                            return {...notifi, page: data.value};
                          }
                          return notifi;
                        }),
                      );
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </TableWrapper>
  );
};

export default ManualNotificationTable;

const EmailText = styled.div`
  padding: 2px;
  padding-left: 5px;
  padding-right: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #eee;
`;
const EmailContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
const ListTitle = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
`;
