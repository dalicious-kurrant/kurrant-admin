import {useImageUpload} from 'hooks/useProductsList';
import {useAtom} from 'jotai';
import {useCallback, useRef, useState} from 'react';
import {Label} from 'semantic-ui-react';
import styled from 'styled-components';
import {productImageAtom} from 'utils/store';

const ItemDetailImage = () => {
  const [showImages, setShowImages] = useState([]); // 미리보기
  const [imgData, setImgData] = useState([]); // formData
  const {mutateAsync: imageUpload} = useImageUpload();

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
  console.log(imgData);
  console.log(showImages, '98977');

  const onSubmit = async e => {
    const files = e.target.files;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('multipartFiles', files[i]);
    }

    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };

    if (files) {
      //   await imageUpload(formData, config);
      //   handleAddImages()
    }
  };

  return (
    <div>
      <Label content="이미지 업로드" color="blue" htmlFor="inputTag" />
      <label htmlFor="inputTag">이미지 업로드</label>
      <Input
        id="inputTag"
        type="file"
        accept="image/*"
        multiple="multiple"
        ref={imgRef}
        onChange={e => handleImageUpload(e)}
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
    </div>
  );
};

export default ItemDetailImage;

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
