import {useBackLog} from 'hooks/useBackLog';
import {View, useEffect, useState, useRef} from 'react';
import {
  Dropdown,
  Label,
  Pagination,
  Table,
  TableHeader,
} from 'semantic-ui-react';
import {PageWrapper} from 'style/common.style';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import {formattedFullDate} from 'utils/dateFormatter';
import {controllerTypeFormatted, logTypeFormatted} from 'utils/statusFormatter';
import SelectDatePicker from 'pages/makers/components/SelectDatePicker';
const options = [
  {key: controllerTypeFormatted(1), text: controllerTypeFormatted(1), value: 1},
  {key: controllerTypeFormatted(2), text: controllerTypeFormatted(2), value: 2},
  {key: controllerTypeFormatted(3), text: controllerTypeFormatted(3), value: 3},
  {key: controllerTypeFormatted(4), text: controllerTypeFormatted(4), value: 4},
  {key: controllerTypeFormatted(5), text: controllerTypeFormatted(5), value: 5},
  {key: controllerTypeFormatted(6), text: controllerTypeFormatted(6), value: 6},
  {key: controllerTypeFormatted(7), text: controllerTypeFormatted(7), value: 7},
  {key: controllerTypeFormatted(8), text: controllerTypeFormatted(8), value: 8},
  {key: controllerTypeFormatted(9), text: controllerTypeFormatted(9), value: 9},
  {
    key: controllerTypeFormatted(10),
    text: controllerTypeFormatted(10),
    value: 10,
  },
  {
    key: controllerTypeFormatted(11),
    text: controllerTypeFormatted(11),
    value: 11,
  },
  {
    key: controllerTypeFormatted(12),
    text: controllerTypeFormatted(12),
    value: 12,
  },
  {
    key: controllerTypeFormatted(13),
    text: controllerTypeFormatted(13),
    value: 13,
  },
  {
    key: controllerTypeFormatted(14),
    text: controllerTypeFormatted(14),
    value: 14,
  },
  {
    key: controllerTypeFormatted(15),
    text: controllerTypeFormatted(15),
    value: 15,
  },
  {
    key: controllerTypeFormatted(16),
    text: controllerTypeFormatted(16),
    value: 16,
  },
  {
    key: controllerTypeFormatted(17),
    text: controllerTypeFormatted(17),
    value: 17,
  },
];
const optionsClient = [
  {key: logTypeFormatted(1), text: logTypeFormatted(1), value: 1},
  {key: logTypeFormatted(2), text: logTypeFormatted(2), value: 2},
  {key: logTypeFormatted(3), text: logTypeFormatted(3), value: 3},
];

const BackLog = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [logType, setLogType] = useState([]);
  const [controllerType, setControllerType] = useState([]);
  const pageRef = useRef(null);
  const [recommandStartDate, setRecommandStartDate] = useState(
    new Date().setDate(new Date().getDate() - 7),
  );
  const [recommandEndDate, setRecommandEndDate] = useState(new Date());

  const {
    data: backlogData,
    isSuccess,
    refetch,
  } = useBackLog(
    10,
    page,
    logType,
    controllerType,
    formattedFullDate(recommandStartDate),
    formattedFullDate(recommandEndDate),
  );
  const [dataCount, setDataCount] = useState([]);
  useEffect(() => {
    setDataCount(
      backlogData?.data?.items.map(v => {
        return {id: v.id, value: false};
      }),
    );
  }, [backlogData?.data]);
  useEffect(() => {
    refetch();
  }, [
    refetch,
    page,
    controllerType,
    logType,
    recommandStartDate,
    recommandEndDate,
  ]);
  useEffect(() => {
    if (isSuccess) {
      setTotalPage(backlogData?.data?.total);
    }
  }, [backlogData?.data?.total, isSuccess]);
  return (
    <PageWrapper>
      <Wrapper>
        <DeadLineWrapper>
          <Label>날짜</Label>
          <RecoDatePickerContainer>
            <RecoDatePickerBox>
              <DatePicker
                showTimeInput
                selected={recommandStartDate}
                onChange={date => {
                  if (pageRef.current !== null)
                    pageRef.current.state.activePage = 1;
                  setPage(1);
                  setRecommandStartDate(date);
                }}
                dateFormat="yyyy-MM-dd HH:mm:ss"
                customInput={<SelectDatePicker />}
              />
            </RecoDatePickerBox>
            -
            <RecoDatePickerBox>
              <DatePicker
                showTimeInput
                selected={recommandEndDate}
                onChange={date => {
                  if (pageRef.current !== null)
                    pageRef.current.state.activePage = 1;
                  setPage(1);
                  setRecommandEndDate(date);
                }}
                dateFormat="yyyy-MM-dd HH:mm:ss"
                customInput={<SelectDatePicker />}
              />
            </RecoDatePickerBox>
          </RecoDatePickerContainer>
        </DeadLineWrapper>
      </Wrapper>
      <FilterContainer>
        <FilterBox>
          <DropBox>
            <Label>컨트롤러</Label>
            <Dropdown
              placeholder="컨트롤러"
              fluid
              multiple
              selection
              search
              options={options}
              value={controllerType}
              onChange={(e, data) => {
                if (pageRef.current !== null)
                  pageRef.current.state.activePage = 1;
                setPage(1);
                setControllerType(data.value);
              }}
            />
          </DropBox>
          <DropBox>
            <Label>메서드</Label>
            <Dropdown
              placeholder="메서드"
              fluid
              multiple
              selection
              search
              options={optionsClient}
              value={logType}
              onChange={(e, data) => {
                if (pageRef.current !== null)
                  pageRef.current.state.activePage = 1;
                setPage(1);
                setLogType(data.value);
              }}
            />
          </DropBox>
        </FilterBox>
        {totalPage > 0 && (
          <PagenationBox>
            <Pagination
              defaultActivePage={page}
              totalPages={totalPage}
              boundaryRange={1}
              ref={pageRef}
              onPageChange={(e, data) => {
                setPage(data.activePage);
              }}
            />
          </PagenationBox>
        )}
      </FilterContainer>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>사용자</Table.HeaderCell>
            <Table.HeaderCell>메서드</Table.HeaderCell>
            <Table.HeaderCell>메시지</Table.HeaderCell>
            <Table.HeaderCell>갯수</Table.HeaderCell>
            <Table.HeaderCell>컨트롤러</Table.HeaderCell>
            <Table.HeaderCell>날짜</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {backlogData?.data?.items?.map((v, i) => {
            console.log(v);
            return (
              <Table.Row
                key={v.id}
                verticalAlign="top"
                style={{
                  cursor: 'pointer',
                }}
                onClick={() =>
                  setDataCount(
                    dataCount.map(data => {
                      if (v.id === data.id) {
                        return {id: data.id, value: !data.value};
                      }
                      return data;
                    }),
                  )
                }>
                <Table.Cell verticalAlign="top">{v.userCode}</Table.Cell>
                <Table.Cell verticalAlign="top">
                  {logTypeFormatted(v.logType)}
                </Table.Cell>
                <Table.Cell verticalAlign="top">
                  {dataCount?.length > 1 &&
                  v.logs?.length > 1 &&
                  dataCount[i]?.value ? (
                    <LogMessage2>
                      {v.logs?.map(s => {
                        return (
                          <LogMessage count={v.logs.length}>{s}</LogMessage>
                        );
                      })}
                    </LogMessage2>
                  ) : (
                    <LogMessage2 count={v.logs.length}>{v.logs[0]}</LogMessage2>
                  )}
                </Table.Cell>
                <Table.Cell verticalAlign="top">{v.logs.length}</Table.Cell>
                <Table.Cell verticalAlign="top">
                  {controllerTypeFormatted(v.controllerType)}
                </Table.Cell>
                <Table.Cell verticalAlign="top">{v.createdDateTime}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </PageWrapper>
  );
};

export default BackLog;

const LogMessage = styled.div`
  padding: 0px 0px 15px 0px;
`;
const LogMessage2 = styled.div`
  padding-bottom: 5px;
  font-weight: ${({count}) => count > 1 && 600};
`;
const PaginationWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
`;
const DatePickerBox = styled.div`
  display: flex;
  cursor: pointer;
  align-items: flex-start;
  width: 200px;
  flex-direction: column;
`;
const RecoDatePickerBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
`;
const RecoDatePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const DeadLineWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;
const Wrapper = styled.div`
  margin-bottom: 10px;
`;

const PagenationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 50px;
  /* border: 5px solid black; */
`;
const FilterBox = styled.div`
  display: flex;
  gap: 20px;
  /* border: 1px solid black; */
`;
const DropBox = styled.div`
  width: 250px;
  padding-top: 10px;
  padding-bottom: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
