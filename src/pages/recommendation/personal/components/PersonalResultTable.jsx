import {useState} from 'react';
import ContentsContainer from '../../common/ContentsContainer';
import {DownloadButton, IconContainer} from '../../ui/icon-button';
import Pagination from '../../common/Pagination';
import {
  StyledTable,
  StyledTd,
  StyledTdEmpty,
  StyledTh,
  StyledThead,
} from '../../ui/table';

const PersonalResultTable = ({results, onClick}) => {
  const perPage = 10;
  const perPagination = 5;
  const totalPage = Math.ceil(results.length / perPage) || 1;
  const [curPage, setCurPage] = useState(1);

  return (
    <ContentsContainer header="개인별 추천 음식">
      <IconContainer>
        <DownloadButton onClick={onClick} />
      </IconContainer>
      <StyledTable>
        <StyledThead>
          <tr>
            <StyledTh>유저 ID</StyledTh>
            <StyledTh>유저 이름</StyledTh>
            <StyledTh>음식 이름</StyledTh>
            <StyledTh>음식 추천 점수</StyledTh>
          </tr>
        </StyledThead>
        <tbody>
          {results.length > 0 ? (
            results
              .slice((curPage - 1) * perPage, curPage * perPage)
              .map(result => (
                <tr key={result.user.id}>
                  <StyledTd>{result.user.id}</StyledTd>
                  <StyledTd>{result.user.name}</StyledTd>
                  <StyledTd>{result.food.name}</StyledTd>
                  <StyledTd>{result.food.score}</StyledTd>
                </tr>
              ))
          ) : (
            <tr>
              <StyledTdEmpty>음식을 추가해 주세요.</StyledTdEmpty>
            </tr>
          )}
        </tbody>
      </StyledTable>
      <Pagination
        curPage={curPage}
        totalPage={totalPage}
        perPagination={perPagination}
        setCurPage={setCurPage}
      />
    </ContentsContainer>
  );
};

export default PersonalResultTable;
