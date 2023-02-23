import {useImageUpload} from 'hooks/useProductsList';
import {useCallback, useRef, useState} from 'react';

const ItemDetailImage = () => {
  const [showImages, setShowImages] = useState([]);
  const [imgData, setImgData] = useState();

  const {mutateAsync: imageUpload} = useImageUpload();

  const imgRef = useRef(null);
  //   const handleAddImages = event => {
  //     const imageLists = event.target.files;
  //     let imageUrlLists = [...showImages];

  //     for (let i = 0; i < imageLists.length; i++) {
  //       const currentImageUrl = URL.createObjectURL(imageLists[i]);
  //       imageUrlLists.push(currentImageUrl);
  //     }

  //     // if (imageUrlLists.length > 10) {
  //     //   imageUrlLists = imageUrlLists.slice(0, 10);
  //     // }

  //     setShowImages(imageUrlLists);
  //   };

  const onSubmit = async e => {
    const files = e.target.files;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('multipartFiles', files[i]);
    }

    for (let value of formData.values()) {
      console.log(value);
    }

    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };

    if (files) {
      await imageUpload(formData, config);
    }
  };

  return (
    <div>
      {/* <img src={img} alt="이미지" /> */}

      <input
        type="file"
        accept="image/*"
        multiple="multiple"
        ref={imgRef}
        onChange={e => onSubmit(e)}
      />
    </div>
  );
};

export default ItemDetailImage;
