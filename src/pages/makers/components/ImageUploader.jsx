// src/ImageUploader.js

import React from 'react';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import MakersImageModal from './MakersImageModal';

const ImageUploader = ({selectedImages, setSelectedImages,setNowData}) => {

  const handleImageChange = (event) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const imageUrls = Array.from(selectedFiles)?.map((file) =>
        file
      );
      console.log(imageUrls)
         setSelectedImages([...selectedImages,...imageUrls]);
    }
  };
  const openFileDialog = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.multiple = true;
    inputElement.addEventListener('change', handleImageChange);
    inputElement.click();
  };
  return (
    <div >
      <Button
        icon="file image outline"
        content="메이커스 소개 이미지 추가"
        color='grey'
        labelPosition="left"
        onClick={openFileDialog}
      />
      {(selectedImages?.length > 0 ) && (
        <div>
          <MakersImageModal imageSrc={selectedImages} setSelectedImages={setSelectedImages} setNowData={setNowData}/>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
