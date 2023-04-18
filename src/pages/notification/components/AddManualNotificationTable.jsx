import {
  useGetManualNotificationGroup,
  useGetManualNotificationSpot,
  useGetManualNotificationType,
  useGetManualNotificationUser,
} from 'hooks/useNotification';
import {useAtom} from 'jotai';
import {useEffect, useRef, useState} from 'react';
import {
  Button,
  Dropdown,
  Input,
  Table,
  TableHeader,
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

const AddManualNotificationTable = () => {
  const [optionsType, setOptionsType] = useState([]);
  const [selectType, setSelectType] = useState(0);
  const [optionsGroup, setOptionsGroup] = useState([]);
  const [selectGroup, setSelectGroup] = useState([]);
  const [optionsPage, setOptionsPage] = useState(pageOption);
  const [selectPage, setSelectPage] = useState('Home');
  const [message, setMessage] = useState();
  const [notificationData, setNotificationData] = useAtom(notificationAtom);
  const {data: typeInfo} = useGetManualNotificationType(0);
  const {data: typeDataInfo, refetch: typeRefetch} =
    useGetManualNotificationSpot(selectType);
  useEffect(() => {
    console.log(typeInfo);
    if (typeInfo?.data)
      setOptionsType(
        typeInfo?.data.map(v => {
          return {key: v.type, text: v.type, value: v.code};
        }),
      );
  }, [typeInfo]);
  useEffect(() => {
    if (typeDataInfo?.data)
      setOptionsGroup(
        typeDataInfo?.data.map(v => {
          return {
            key: v.email ? v.email : v.id,
            text: v.name,
            value: v.id,
          };
        }),
      );
  }, [typeDataInfo]);
  useEffect(() => {
    if (selectType) {
      typeRefetch();
    }
  }, [selectType, typeRefetch]);
  return (
    <Conotainer>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>타입</Table.HeaderCell>
            {selectType === 1 && <Table.HeaderCell>스팟</Table.HeaderCell>}
            {selectType === 2 && <Table.HeaderCell>상세스팟</Table.HeaderCell>}
            {selectType === 3 && <Table.HeaderCell>유저</Table.HeaderCell>}
            {selectType === 3 && <Table.HeaderCell>이메일</Table.HeaderCell>}
            <Table.HeaderCell>메시지 (한글 35자)</Table.HeaderCell>
            <Table.HeaderCell>화면전환</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={2}>
              <Dropdown
                placeholder="타입"
                fluid
                selection
                search
                options={optionsType}
                value={selectType}
                onChange={(e, data) => {
                  setSelectGroup([]);
                  setSelectType(data.value);
                }}
              />
            </Table.Cell>
            {selectType === 1 && (
              <Table.Cell width={4}>
                <Dropdown
                  placeholder="스팟"
                  fluid
                  multiple
                  selection
                  search
                  options={optionsGroup}
                  value={selectGroup}
                  onChange={(e, data) => {
                    setSelectGroup(data.value);
                  }}
                />
              </Table.Cell>
            )}
            {selectType === 2 && (
              <Table.Cell width={4}>
                {' '}
                <Dropdown
                  placeholder="상세스팟"
                  fluid
                  multiple
                  selection
                  search
                  options={optionsGroup}
                  value={selectGroup}
                  onChange={(e, data) => {
                    setSelectGroup(data.value);
                  }}
                />
              </Table.Cell>
            )}
            {selectType === 3 && (
              <Table.Cell width={4}>
                {' '}
                <Dropdown
                  placeholder="유저"
                  fluid
                  multiple
                  selection
                  search
                  options={optionsGroup}
                  value={selectGroup}
                  onChange={(e, data) => {
                    setSelectGroup(data.value);
                  }}
                />
              </Table.Cell>
            )}
            {selectType === 3 && (
              <Table.Cell width={4}>
                <EmailContainer>
                  {selectGroup.map(user => {
                    const data = optionsGroup.find(v => v.value === user);
                    return (
                      <EmailText key={data.value + data.key}>
                        {data.key}
                      </EmailText>
                    );
                  })}
                </EmailContainer>
              </Table.Cell>
            )}
            <Table.Cell>
              <TextArea
                rows={3}
                maxLength="35"
                style={{
                  width: '100%',
                  border: '1px solid #eee',
                  padding: 10,
                  borderRadius: 10,
                  resize: 'none',
                  fontSize: 14,
                }}
                value={message}
                onInput={(e, data) => {
                  setMessage(data.value);
                }}
              />
            </Table.Cell>
            <Table.Cell>
              {' '}
              <Dropdown
                placeholder="페이지"
                fluid
                selection
                search
                options={optionsPage}
                value={selectPage}
                onChange={(e, data) => {
                  setSelectPage(data.value);
                }}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <ButtonContainer>
        <Button
          color="green"
          onClick={() => {
            setNotificationData([
              ...notificationData,
              {
                id: notificationData.length + 1,
                type: optionsType.find(v => v.value === selectType),
                groupIds:
                  selectType === 1
                    ? selectGroup.map(group => {
                        const data = optionsGroup.find(v => v.value === group);
                        return data;
                      })
                    : null,
                spotIds:
                  selectType === 2
                    ? selectGroup.map(spot => {
                        const data = optionsGroup.find(v => v.value === spot);
                        return data;
                      })
                    : null,
                userIds:
                  selectType === 3
                    ? selectGroup.map(user => {
                        const data = optionsGroup.find(v => v.value === user);
                        return data;
                      })
                    : null,
                message: message,
                page: selectPage,
              },
            ]);
            setSelectType(0);
            setSelectGroup([]);
            setSelectPage('Home');
            setMessage('');
          }}>
          추가
        </Button>
      </ButtonContainer>
    </Conotainer>
  );
};

export default AddManualNotificationTable;

const Conotainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;
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
  justify-content: flex-end;
`;
