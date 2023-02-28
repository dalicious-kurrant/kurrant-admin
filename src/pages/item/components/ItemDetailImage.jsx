import {useImageUpload} from 'hooks/useProductsList';
import {useRef, useState} from 'react';
import {Button, Label} from 'semantic-ui-react';
import styled from 'styled-components';

const ItemDetailImage = ({sendForm, setSendForm, length}) => {
  const [showImages, setShowImages] = useState([]); // 미리보기
  const [imgData, setImgData] = useState([]); // formData
  // console.log(showImages);
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
    setSendForm([...sendForm, ...files]);
  };

  const deleteImage = (selectFile, index) => {
    const image = showImages.filter(el => el !== selectFile);
    const imagurl = sendForm.filter((v, idx) => idx !== index);
    setShowImages(image);
    setSendForm(imagurl);
  };

  return (
    <Wrapper>
      <div style={{marginBottom: 24}}>
        <UploadButton htmlFor="inputTag">이미지 업로드</UploadButton>
      </div>
      <Label content="추가 이미지" color="blue" />
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
        onClick={e => {
          if (showImages.length + (length && length) > 5) {
            e.preventDefault();
            alert('사진은 최대 6장만 가능합니다.');
          }
        }}
      />
      <Wrap>
        {showImages.map((el, i) => {
          return (
            <ImageBox key={el + i}>
              <ImgWrap>
                <img src={el} alt="이미지" />
              </ImgWrap>
              <DeleteButton
                circular
                icon="delete"
                onClick={() => {
                  deleteImage(el, i);
                }}
              />
            </ImageBox>
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
  margin-top: 10px;
  flex-wrap: wrap;
`;

const ImgWrap = styled.div`
  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    margin-right: 10px;
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  background-color: skyblue;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`;

const DeleteButton = styled(Button)`
  position: absolute;
  right: 12px;
  top: 4px;
`;

const ImageBox = styled.div`
  position: relative;
`;
