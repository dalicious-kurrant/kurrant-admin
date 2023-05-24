import styled from 'styled-components';
import Filter from './components/Filter';
import {TableWrapper} from 'style/common.style';
import {Table} from 'semantic-ui-react';
import {useState} from 'react';
import ModalComponent from './components/Modal';

const MySpotZone = () => {
  const [nowData, setNowData] = useState();
  const [showModifyOpenModal, setShowModifyOpenModal] = useState(false);

  const data = [
    {
      spotId: 1,
      name: '양재2동_A',
      si: '서울시',
      gu: '서초구',
      dong: '양재2동',
      zipcode: [3343, 444, 2222],
      status: '오픈대기',
      openDate: 20230422,
      closeDate: 20342222,
      morning: ['05:00', '05:00', '05:00'],
      lunch: ['12:00', '12:00', '12:00'],
      dinner: ['23:00', '23:00', '23:00'],
      user: 200,
    },
    {
      spotId: 2,
      name: '양재2동_B',
      si: '서울시',
      gu: '서초구',
      dong: '양재2동',
      zipcode: [3343, 444, 2222],
      status: '오픈',
      openDate: 20230422,
      closeDate: 20342222,
      morning: ['05:00', '05:00', '05:00'],
      lunch: ['12:00', '12:00', '12:00'],
      dinner: ['23:00', '23:00', '23:00'],
      user: 200,
    },
  ];
  return (
    <Wrap>
      <Filter />
      <div style={{marginTop: 24}}>
        <TableWrapper>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">
                  <input type="checkbox" />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">스팟 ID</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  마이스팟 존 이름
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">시/도</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">군/구</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">동/읍/리</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">우편번호</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  오픈 시작날짜
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  오픈 마감 날짜
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  오픈 마감 날짜
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  아침 시간
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  점심 시간
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  저녁 시간
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  이용자 수
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((el, idx) => {
                console.log(el);
                return (
                  <Table.Row
                    style={{cursor: 'pointer'}}
                    key={idx}
                    onClick={() => {
                      setShowModifyOpenModal(true);
                      setNowData(el);
                    }}>
                    <Table.Cell
                      textAlign="center"
                      onClick={e => e.stopPropagation()}>
                      <input type="checkbox" />
                    </Table.Cell>
                    <Table.Cell textAlign="center">{el.spotId}</Table.Cell>
                    <Table.Cell textAlign="center">{el.name}</Table.Cell>
                    <Table.Cell textAlign="center">{el.si}</Table.Cell>
                    <Table.Cell textAlign="center">{el.gu}</Table.Cell>
                    <Table.Cell textAlign="center">{el.dong}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {el.zipcode.join(',')}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{el.status}</Table.Cell>
                    <Table.Cell textAlign="center">{el.openDate}</Table.Cell>
                    <Table.Cell textAlign="center">{el.openDate}</Table.Cell>
                    <Table.Cell textAlign="center">{el.closeDate}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {el.morning.join(',')}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {el.lunch.join(',')}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {el.dinner.join(',')}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{el.user}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </TableWrapper>
      </div>
      {showModifyOpenModal && (
        <ModalComponent
          data={nowData}
          title={'마이스팟 존 정보 변경'}
          button={'수정'}
          open={showModifyOpenModal}
          setOpen={setShowModifyOpenModal}
        />
      )}
    </Wrap>
  );
};

export default MySpotZone;

const Wrap = styled.div`
  margin-top: 24px;
`;
