import {useState, useEffect} from 'react';

const useTitle = initialTitle => {
  const [title, setTitle] = useState(initialTitle); // 입력받은 파라미터로 초기값 설정
  const updateTitle = () => {
    // title 변경 함수
    const htmlTitle = document.querySelector('title'); // <title> 태그 찾기
    htmlTitle.innerText = title; // <title> 태그에 변수 title값을 넣음
  };
  useEffect(updateTitle, [title]); // title 값이 바뀔 때마다 title 변경 함수 실행
  return setTitle; // title을 변경할 수 있는 setTitle을 반환
};

export default useTitle;
