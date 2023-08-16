import {useEffect, useRef, useState} from 'react';
import {Editor} from 'react-draft-wysiwyg';

import {EditorState, convertToRaw, ContentState} from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import {noticeApis} from 'api/notice';
import styled from 'styled-components';
import {Button} from 'semantic-ui-react';
import {useNavigate} from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import {FormProvider, useForm} from 'react-hook-form';
import Input from 'components/input/Input';

const EditorBox = ({editData, addButton = () => {}}) => {
  const editorRef = useRef();
  const navigate = useNavigate();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const goBack = () => {
    navigate(-1);
  };

  const form = useForm({
    mode: 'all',
  });
  const {watch, setValue} = form;

  const title = watch('title');

  const uploadImageCallBack = async blob => {
    const formData = new FormData();
    formData.append('file', blob);

    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };

    const url = await noticeApis.uploadImage(formData, config);
    return {data: {link: url.data.location}};
  };

  const onEditorStateChange = newEditorState => {
    setEditorState(newEditorState);
  };

  // 작성 내용 보기
  const getContent = () => {
    console.log(title);
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  useEffect(() => {
    if (editData) {
      const blocksFromHtml = htmlToDraft(editData.content);
      const {contentBlocks, entityMap} = blocksFromHtml;

      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap,
      );

      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
      setValue('title', editData.title);
    }
  }, [editData, setValue]);

  return (
    <div>
      <FormProvider {...form}>
        <Input name="title" placeholder="제목" height="40px" width="100%" />
      </FormProvider>
      <EditorWrap>
        <Editor
          ref={editorRef}
          editorStyle={{
            height: 600,
            border: '0.5px solid rgba(0,0,0,.25)',
            borderRadius: 4,
          }}
          localization={{
            locale: 'ko',
          }}
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          toolbar={{
            image: {
              uploadCallback: uploadImageCallBack,
            },
          }}
          onEditorStateChange={onEditorStateChange}
        />
      </EditorWrap>
      <ButtonWrap>
        <Button
          content={editData ? '수정' : '작성'}
          onClick={() =>
            addButton(
              title,
              draftToHtml(convertToRaw(editorState.getCurrentContent())),
            )
          }
          color="green"
        />
        <Button content="취소" onClick={goBack} />
      </ButtonWrap>
    </div>
  );
};

export default EditorBox;
const ButtonWrap = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 48px;
`;
const EditorWrap = styled.div`
  z-index: 1;
  position: relative;
  margin-top: 12px;
`;
