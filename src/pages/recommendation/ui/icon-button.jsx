import styled from 'styled-components';

export const IconContainer = styled.div`
  display: flex;
  flex-align: row;
  justify-content: right;
`;

export const DownloadButton = styled.img.attrs({
  src: '/assets/svg/DownloadIcon.svg',
  alt: '다운로드',
})`
  width: 20px;
  height: 20px;
`;
