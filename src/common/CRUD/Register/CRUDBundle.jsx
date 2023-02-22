import styled from 'styled-components';

const CRUDBundle = ({handleBundleClick, showRegister}) => {
  const handleClick = e => {
    if (e.target.id === 'register' || e.target.id === 'edit') {
      if (showRegister) {
        window.confirm("'닫기'버튼을 누른후에 시도해주세요");
      }
    }

    handleBundleClick(e.target.id);
  };

  const handleSend = () => {
    console.log('최종적용하기');
  };

  return (
    <Container>
      <Wrap>
        <Button id="register" onClick={handleClick}>
          가입
        </Button>
        <Button id="edit" onClick={handleClick}>
          수정
        </Button>
        <Button id="delete" onClick={handleClick}>
          삭제
        </Button>

        <Wrap2>
          <Button onClick={handleSend}>최종적용하기</Button>
        </Wrap2>
      </Wrap>
    </Container>
  );
};

export default CRUDBundle;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  /* border: 1px solid black; */
`;

const Wrap = styled.div``;

const Wrap2 = styled.div``;

const Button = styled.button`
  font-size: 1.2rem;
  margin: 0.6rem;
`;
