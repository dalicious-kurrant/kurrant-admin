import {
  useGetAutoNotificationType,
  useUpdateAutoMessage,
  useUpdateAutoStatus,
  useUpdateAutoUrl,
} from 'hooks/useNotification';
import {useEffect, useState} from 'react';
import {
  Button,
  Dropdown,
  Table,
  TableHeader,
  TextArea,
} from 'semantic-ui-react';
import {TableWrapper} from 'style/common.style';
import styled from 'styled-components';

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

const AutoNotificationTable = () => {
  const {data: autoNotifiList} = useGetAutoNotificationType();
  const [autoData, setAutoData] = useState();
  const {mutateAsync: updateMessage} = useUpdateAutoMessage();
  const {mutateAsync: updateStatus} = useUpdateAutoStatus();
  const {mutateAsync: updateUrl} = useUpdateAutoUrl();

  useEffect(() => {
    if (autoNotifiList?.data) {
      setAutoData(
        autoNotifiList?.data.map(v => {
          return {...v, isEdit: false};
        }),
      );
    }
  }, [autoNotifiList]);
  return (
    <TableWrapper>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>상태</Table.HeaderCell>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>조건</Table.HeaderCell>
            <Table.HeaderCell>메시지</Table.HeaderCell>
            <Table.HeaderCell>화면전환</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {autoData?.map(v => {
            console.log(v);
            return (
              <Table.Row key={v.id}>
                <Table.Cell width={2}>
                  <Button
                    color={v.status === 1 ? 'green' : 'grey'}
                    onClick={async () => {
                      await updateStatus({
                        id: v.id,
                        status: v.status === 0 ? 1 : 0,
                      });
                      setAutoData(
                        autoData.map(auto => {
                          if (auto.id === v.id) {
                            return {...auto, status: v.status === 0 ? 1 : 0};
                          }
                          return auto;
                        }),
                      );
                    }}>
                    {v.status === 1 ? '활성' : '비활성'}
                  </Button>
                </Table.Cell>
                <Table.Cell width={1}>{v.id}</Table.Cell>
                <Table.Cell width={3}>{v.condition}</Table.Cell>
                <Table.Cell>
                  <TextContainerBox>
                    <TextContainer>
                      {v.isEdit ? (
                        <TextArea
                          rows={1}
                          maxLength="1000"
                          defaultValue={v.message}
                          style={{
                            minWidth: 300,
                            border: '1px solid #eee',
                            padding: 10,
                            borderRadius: 10,
                            resize: 'none',
                            fontSize: 14,
                          }}
                          onInput={(e, data) => {
                            setAutoData(
                              autoData.map(auto => {
                                if (auto.id === v.id) {
                                  return {...auto, message: data.value};
                                }
                                return auto;
                              }),
                            );
                          }}
                        />
                      ) : (
                        <TextBox>{v.message}</TextBox>
                      )}
                    </TextContainer>
                    <Button
                      onClick={async () => {
                        if (v.isEdit) {
                          await updateMessage({
                            id: v.id,
                            message: v.message,
                          });
                        }
                        setAutoData(
                          autoData.map(auto => {
                            if (auto.id === v.id) {
                              return {
                                ...auto,
                                isEdit: !auto.isEdit,
                              };
                            }
                            return auto;
                          }),
                        );
                      }}>
                      {v.isEdit ? '저장' : '수정'}
                    </Button>
                  </TextContainerBox>
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    placeholder="페이지"
                    fluid
                    selection
                    search
                    options={pageOption}
                    value={v.url}
                    onChange={async (e, data) => {
                      await updateUrl({
                        id: v.id,
                        url: data.value,
                      });
                      setAutoData(
                        autoData.map(auto => {
                          if (auto.id === v.id) {
                            return {...auto, url: data.value};
                          }
                          return auto;
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

export default AutoNotificationTable;

const TextContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const TextContainerBox = styled.div`
  display: flex;
  gap: 20px;
`;
const TextBox = styled.div`
  min-width: 300px;
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
`;
