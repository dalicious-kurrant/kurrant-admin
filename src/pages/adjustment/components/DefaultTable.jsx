import styled from 'styled-components';

const DefaultTable = ({data}) => {
  return (
    <div
      style={{
        justifyContent: 'space-between',
        display: 'flex',
        marginTop: 24,
      }}>
      <div>
        <BoxWrap>
          <Box>
            <Title>등록번호</Title>
            <TitleContent>{data?.businessNumber}</TitleContent>
          </Box>
        </BoxWrap>
        <BoxWrap>
          <Box>
            <Title>상호</Title>
            <TitleContent>{data?.corporationName}</TitleContent>
          </Box>
        </BoxWrap>
        <BoxWrap>
          <Box>
            <Title>대표자</Title>
            <TitleContent>{data?.representative}</TitleContent>
          </Box>
        </BoxWrap>
        <BoxWrap>
          <Box>
            <Title>전화</Title>
            <TitleContent>{data?.phone}</TitleContent>
          </Box>
        </BoxWrap>
        <BoxWrap>
          <Box>
            <Title>팩스</Title>
            <TitleContent>{data?.faxNumber}</TitleContent>
          </Box>
        </BoxWrap>
      </div>
      <div>
        <Box>
          <Title>주소</Title>
          <TitleContent>
            {data?.address1} {data?.address2}
          </TitleContent>
        </Box>
        <Box></Box>
        <Box></Box>

        <Box>
          <Title>업태</Title>
          <TitleContent>{data?.business}</TitleContent>
        </Box>
        <Box>
          <Title>종목</Title>
          <TitleContent>{data?.businessForm}</TitleContent>
        </Box>
      </div>
    </div>
  );
};

export default DefaultTable;

const Box = styled.div`
  display: flex;
  padding-bottom: 12px;
`;

const BoxWrap = styled.div`
  display: flex;
`;
const TitleContent = styled.div`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const Title = styled.div`
  font-weight: 600;
  margin-right: 24px;
`;
