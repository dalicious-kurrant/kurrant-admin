import {useImageUpload} from 'hooks/useProductsList';
import {useRef, useState} from 'react';
import styled from 'styled-components';

const ItemDetailImage = ({sendForm, setSendForm}) => {
  const [showImages, setShowImages] = useState([]); // 미리보기
  const [imgData, setImgData] = useState([]); // formData

  const imgRef = useRef(null);

  const handleImageUpload = e => {
    const fileArr = e.target.files;
    setImgData([...imgData, fileArr]);
    let fileURLs = [];

    let file;
    //let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < fileArr.length; i++) {
      file = fileArr[i];

      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setShowImages([...showImages, ...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateContent = async e => {
    const files = e.target.files;

    // const formData = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //   formData.append('multipartFiles', files[i]);
    // }

    setSendForm(files);
  };

  return (
    <Wrapper>
      <Label htmlFor="inputTag">이미지 업로드</Label>
      <Input
        id="inputTag"
        type="file"
        accept="image/*"
        multiple="multiple"
        ref={imgRef}
        onChange={e => {
          handleImageUpload(e);
          updateContent(e);
        }}
      />
      <Wrap>
        {showImages.map((el, i) => {
          return (
            <ImgWrap key={el}>
              <img src={el} alt="이미지" />
            </ImgWrap>
          );
        })}
      </Wrap>
    </Wrapper>
  );
};

export default ItemDetailImage;

const Wrapper = styled.div`
  margin-top: 50px;
`;
const Wrap = styled.div`
  display: flex;
`;

const ImgWrap = styled.div`
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  background-color: skyblue;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
`;
