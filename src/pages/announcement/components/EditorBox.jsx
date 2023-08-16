import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import {useEffect, useRef} from 'react';
import {Button} from 'semantic-ui-react';
import '@toast-ui/editor/dist/i18n/ko-kr';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import {noticeApis} from 'api/notice';
import {FormProvider, useForm} from 'react-hook-form';
import Input from 'components/input/Input';
import styled from 'styled-components';

import {useNavigate} from 'react-router-dom';

const EditorBox = ({editData, addButton = () => {}}) => {
  const editorRef = useRef();

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const form = useForm({
    mode: 'all',
  });
  const {watch, setValue} = form;

  const title = watch('title');

  const onUploadImage = async (blob, callback) => {
    const formData = new FormData();
    formData.append('file', blob);

    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };

    const url = await noticeApis.uploadImage(formData, config);

    callback(url.data.location, blob.name);
  };

  useEffect(() => {
    if (editData) {
      const htmlString = editData.content;
      editorRef.current?.getInstance().setHTML(htmlString);
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
          previewStyle="vertical"
          height="600px"
          plugins={[colorSyntax]}
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          language="ko-KR"
          hooks={{
            addImageBlobHook: onUploadImage,
          }}
        />
      </EditorWrap>
      <ButtonWrap>
        <Button
          content={editData ? '수정' : '작성'}
          onClick={() =>
            addButton(title, editorRef.current?.getInstance().getHTML())
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
