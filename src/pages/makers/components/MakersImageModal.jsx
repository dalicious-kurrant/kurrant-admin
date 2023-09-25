import React, {useState} from 'react';
import {Modal, Image, Button} from 'semantic-ui-react';
import styled from 'styled-components';
import {Carousel} from 'react-responsive-carousel';
import CloseIcon from '../../../assets/svg/closeIcon.svg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const MakersImageModal = ({imageSrc, setSelectedImages,data,setNowData}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const handleOpen = imageIndex => {
    setSelectedImageIndex(imageIndex);
    setModalOpen(true);
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
    setModalOpen(false);
  };

  return (
    <div>
      <FlexContainer>       
        {imageSrc?.map((image, index) => {
          return <ImageBox key={index}>
            <CloseButtonImg
              onClick={() => {
               
                setNowData({...data,introImages:data.introImages.filter((intro)=>{
                  return intro !== image
                })});
                setSelectedImages(
                  imageSrc.filter(img => {
                    return img !== image;
                  }),
                );
              }}
              src={CloseIcon}
            />
            <Image
              style={{objectFit: 'cover'}}
              src={typeof image === 'object' ? URL.createObjectURL(image) : image}
              onClick={() => handleOpen(index)}
            />
          </ImageBox>
})}
      </FlexContainer>

      <Modal open={modalOpen} onClose={handleClose} size="mini">
        <Modal.Content>
          <Carousel
            selectedItem={selectedImageIndex}
            showThumbs={true}
            showArrows={true}>
            {imageSrc?.map((image, index) => (
              <div key={index}>
                <Image
                  style={{maxHeight: '70vh', objectFit: 'contain'}}
                  src={image}
                  fluid
                />
              </div>
            ))}
          </Carousel>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleClose}>닫기</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default MakersImageModal;

const ImageBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 150px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  overflow: hidden;
  height: 150px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 10px;
`;

const CloseButtonImg = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 20px;
  z-index: 1;
  height: 20px;
`;
