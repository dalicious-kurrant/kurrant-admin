import ContentsContainer from 'pages/recommendation/common/ContentsContainer';
import {
  DownloadButton,
  IconContainer,
} from 'pages/recommendation/ui/icon-button';
import {
  StyledTable,
  StyledTdEmpty,
  StyledTh,
  StyledThead,
  StyledTr,
} from 'pages/recommendation/ui/table';
import styled from 'styled-components';
import {addDays, formattedDateForRecommendation} from 'utils/dateFormatter';
import GroupTableItem from './GroupTableItem';

const GroupResultTable = ({period, results, onClick}) => {
  const getDates = () => {
    const startDate = new Date(period.from);
    const endDate = new Date(period.to);

    let dates = [];
    let curDate = startDate;
    while (curDate <= endDate) {
      dates.push(formattedDateForRecommendation(curDate));
      curDate = addDays(curDate, 1);
    }
    return dates;
  };

  const dates = getDates();

  return (
    <ContentsContainer header="추천 메이커 및 음식">
      <IconContainer>
        <DownloadButton onClick={onClick} />
      </IconContainer>
      <StyledTableContainer>
        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledThTopLeft>그룹</StyledThTopLeft>
              <StyledThTopLeftSecond>식사구분</StyledThTopLeftSecond>
              {dates.map(date => (
                <StyledThTop key={date}>{date}</StyledThTop>
              ))}
            </StyledTr>
          </StyledThead>
          <tbody>
            {results.length > 0 ? (
              results.map(result =>
                result.diningTypes.map(diningType => (
                  <StyledTr key={diningType.id}>
                    <StyledThLeft>{result.group.name}</StyledThLeft>
                    <StyledThLeftSecond>{diningType.name}</StyledThLeftSecond>
                    {diningType.dates.map(date => {
                      return <GroupTableItem makers={date.makers} />;
                    })}
                  </StyledTr>
                )),
              )
            ) : (
              <tr>
                <StyledTdEmpty>그룹과 식사구분을 추가해 주세요.</StyledTdEmpty>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </StyledTableContainer>
    </ContentsContainer>
  );
};

export default GroupResultTable;

const StyledTableContainer = styled.div`
  width: 100%;
  height: 600px;
  overflow: scroll;
`;

const StyledThTopLeft = styled(StyledTh)`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  min-width: 150px;
  max-width: 150px;
`;

const StyledThTopLeftSecond = styled(StyledTh)`
  position: sticky;
  top: 0;
  left: 150px;
  z-index: 2;
  min-width: 100px;
  max-width: 100px;
`;

const StyledThTop = styled(StyledTh)`
  position: sticky;
  top: 0;
  z-index: 1;
`;

const StyledThLeft = styled(StyledTh)`
  position: sticky;
  left: 0;
  z-index: 1;
  min-width: 150px;
  max-width: 150px;
  word-wrap: break-word;
`;
const StyledThLeftSecond = styled(StyledTh)`
  position: sticky;
  left: 150px;
  z-index: 1;
  min-width: 100px;
  max-width: 100px;
  word-wrap: break-word;
`;
