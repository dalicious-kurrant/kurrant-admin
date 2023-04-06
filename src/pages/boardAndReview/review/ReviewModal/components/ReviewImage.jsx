import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

const ReviewImage = ({url}) => {
  const [onHover, setOnHover] = useState(false);
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
      <Div
        ref={divRef}
        // divRef={divRef}

        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}>
        <Img src={url} alt="" isHorizontal={isHorizontal} />
      </Div>
    </>
  );
};
export default ReviewImage;

export const Div = styled.div`
  display: flex;

  height: 150px;
  width: 150px;
  position: relative;
  margin: 1rem 0;

  border: 1px solid black;
  overflow: hidden;
`;

export const Img = styled.img`
  ${({isHorizontal}) => {
    if (isHorizontal) {
      return `height: 100%;`;
    } else {
      return `width: 100%;`;
    }
  }}

  margin: auto;
`;
