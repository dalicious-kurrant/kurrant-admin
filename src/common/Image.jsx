import styled from 'styled-components';

const Image = ({src, iconWidth, iconHeight, width, height, css = ''}) => {
  return (
    <Container width={width} height={height} css={css}>
      <Img src={src} />
    </Container>
  );
};

export default Image;

const Container = styled.div`
  width: ${({width}) => width};
  height: ${({height}) => height};
  display: flex;
  justify-content: center;
  align-items: center;
  ${({css}) => css}
`;

const Img = styled.img`
  width: 170%;
  height: 170%;
`;
