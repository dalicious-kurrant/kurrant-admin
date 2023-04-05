import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from 'semantic-ui-react';
import styled from 'styled-components';
import useReviewTableModal from './useReviewTableModal';

function ReviewTableModal({open, setOpen, reviewId}) {
  const {reviewDetail, reviewDetailRefetch} = useReviewTableModal([
    'getReviewDetail',
    reviewId,
  ]);

  useEffect(() => {
    console.log(reviewDetail);
  }, [reviewDetail]);

  const onSubmit = () => {
    setOpen(false);
  };
  return (
    <Form onSubmit={onSubmit}>
      <ModalModal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        {/* <ModalContent>
          <ModalDescription>
            <Wrap2></Wrap2>

            <Wrap3></Wrap3>
          </ModalDescription>
        </ModalContent> */}

        <ModalDescription>
          <Wrap2></Wrap2>

          <Wrap3>
            <PhotosWrap></PhotosWrap>
          </Wrap3>
        </ModalDescription>

        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button color="black" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button color="black" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button
            type="submit"
            content="수정"
            labelPosition="right"
            icon="checkmark"
            positive
            onClick={onSubmit}
          />
        </Modal.Actions>
      </ModalModal>
    </Form>
  );
}

export default ReviewTableModal;

const ModalModal = styled(Modal)`
  width: 90vw !important;
  height: 90vh;
`;

const ModalContent = styled(Modal.Content)`
  width: 100%;
  height: 80%;
`;

const ModalDescription = styled(Modal.Description)`
  display: flex;
  height: 90%;
`;

const Wrap2 = styled.div`
  flex: 3;
  height: 100%;
  border: 1px solid black;
`;
const Wrap3 = styled.div`
  flex: 4;
  height: 100%;

  border: 1px solid black;
`;

const PhotosWrap = styled.div``;
