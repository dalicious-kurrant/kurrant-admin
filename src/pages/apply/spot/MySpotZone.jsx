import {PageWrapper} from 'style/common.style';
import Filter from './components/Filter';
import {Pagination, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {useEffect, useRef, useState} from 'react';
import ModalComponent from './components/Modal';
import {useGetMySpotList} from 'hooks/useMySpot';
import {useAtom} from 'jotai';
import {
  MySpotCityAtom,
  MySpotCountyAtom,
  MySpotVillageAtom,
  MySpotZipcodeAtom,
  checkListAtom,
  spotPageAtom,
} from 'utils/store';

const MySpotZone = () => {
  const el = useRef();
  const [checkItems, setCheckItems] = useAtom(checkListAtom);
  const [showModifyOpenModal, setShowModifyOpenModal] = useState(false);
  const [nowData, setNowData] = useState();
  const [click, setClick] = useState(false);
  const [page, setPage] = useAtom(spotPageAtom);
  const [totalPage, setTotalPage] = useState(0);

  const [selectCity] = useAtom(MySpotCityAtom);
  const [selectCounty] = useAtom(MySpotCountyAtom);
  const [selectVillage] = useAtom(MySpotVillageAtom);
  const [selectZipcode] = useAtom(MySpotZipcodeAtom);

  const {data: mySpotData, refetch: spotListRefetch} = useGetMySpotList(
    page,
    selectCity,
    selectCounty,
    selectVillage,
    selectZipcode,
  );

  const closeUser = e => {
    if (click && el.current && !el.current.contains(e.target)) setClick(false);
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter(el => el !== id));
    }
  };

  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      mySpotData?.data?.items?.forEach(el => idArray.push(el.id));

      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  useEffect(() => {
    if (mySpotData) {
      setTotalPage(mySpotData?.data?.total);
    }
  }, [mySpotData, mySpotData?.data?.total]);

  useEffect(() => {
    spotListRefetch();
  }, [
    spotListRefetch,
    page,
    selectCity,
    selectCounty,
    selectVillage,
    selectZipcode,
  ]);

  useEffect(() => {
    window.addEventListener('click', closeUser);
    return () => {
      window.removeEventListener('click', closeUser);
    };
  }, [click, el.current]);
  return (
    <Wrap ref={el}>
      <Filter setClick={setClick} click={click} />
      <Pagination
        ellipsisItem={null}
        defaultActivePage={page}
        totalPages={totalPage}
        boundaryRange={1}
        onPageChange={(e, data) => {
          setPage(data.activePage);
        }}
      />
      <div style={{width: '80%', marginTop: 24}}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                textAlign="center"
                onClick={e => {
                  e.stopPropagation();
                  handleAllCheck(e.target.checked);
                }}>
                <input type="checkbox" />
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">시/도</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">군/구</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">동/읍/리</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">우편 번호</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                신청 유저 수
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {mySpotData?.data?.items.map((el, idx) => {
              return (
                <Table.Row
                  key={idx}
                  style={{cursor: 'pointer'}}
                  onClick={() => {
                    setShowModifyOpenModal(true);
                    setNowData(el);
                  }}>
                  <Table.Cell
                    textAlign="center"
                    onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={checkItems.includes(el.id) ? true : false}
                      onChange={e => handleSingleCheck(e.target.checked, el.id)}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">{el.city}</Table.Cell>
                  <Table.Cell textAlign="center">{el.county}</Table.Cell>
                  <Table.Cell textAlign="center">{el.village}</Table.Cell>
                  <Table.Cell textAlign="center">{el.zipcode}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {el.requestUserCount}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      {showModifyOpenModal && (
        <ModalComponent
          data={nowData}
          title={'마이스팟 신청 정보 변경'}
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
  margin-top: 48px;
`;