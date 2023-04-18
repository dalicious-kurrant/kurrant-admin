import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

const ReviewImageModalImage = ({url}) => {
  const divRef = useRef(null);

  const [isHorizontal, setIsHorizontal] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = function () {
      const isHorizontal = this.width > this.height;
      if (isHorizontal) {
        setIsHorizontal(true);
      } else {
        setIsHorizontal(false);
      }
    };
    img.src = url;
  }, [url]);

  return (
    <>
      <ImageWrapper isHorizontal={isHorizontal} ref={divRef}>
        <Img src={url} alt="" isHorizontal={isHorizontal} />
      </ImageWrapper>
    </>
  );
};
export default ReviewImageModalImage;

export const ImageWrapper = styled.div`
  display: flex;

  height: 90%;

  position: relative;
  margin: 10px;

  border-radius: 6px;
`;

export const Img = styled.img`
  ${({isHorizontal}) => {
    if (isHorizontal) {
      return `height: 100%;`;
    } else {
      return `width: 100%;`;
    }
  }}

  height: 100%;

  margin: auto;
`;
