import SelectDatePicker from 'pages/makers/components/SelectDatePicker';
import {Button, Label, Dropdown} from 'semantic-ui-react';
import {PageWrapper} from 'style/common.style';

import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import {useEffect, useRef, useState} from 'react';
import ReviewTable from './components/ReviewTable';
import Select from 'react-select';
import ReviewCheckbox from './components/ReviewCheckbox';

// const options = [
//   {key: '달리셔스', text: '달리셔스', value: '달리셔스'},
//   {key: '커런트', text: '커런트', value: '커런트'},
// ];
// 이련 형태로 만들어야함
const userArr = [
  {value: 0, label: '탈퇴'},
  {value: 1, label: '활성'},
  {value: 2, label: '탈퇴 요청'},
];
const userNameArr = [
  {value: 0, label: '탈퇴'},
  {value: 1, label: '활성'},
  {value: 2, label: '탈퇴 요청'},
];
const spotArr = [
  {value: 0, label: '탈퇴'},
  {value: 1, label: '활성'},
  {value: 2, label: '탈퇴 요청'},
];

const ReviewPage = () => {
  // 필터 값들 모으기

  // 1. 날짜
  const [recommandStartDate, setRecommandStartDate] = useState(new Date());
  const [recommandEndDate, setRecommandEndDate] = useState(new Date());

  // 2. 필터 값들

  const [makersFilter, setMakersFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [spotFilter, setSpotFilter] = useState('');

  useEffect(() => {
    console.log(makersFilter);
  }, [makersFilter]);
  useEffect(() => {
    console.log(nameFilter);
  }, [nameFilter]);
  useEffect(() => {
    console.log(spotFilter);
  }, [spotFilter]);

  // 3. 체크박스 3개

  const [isMakersReview, setIsMakersReview] = useState(false);
  const [isAdminReview, setIsAdminReview] = useState(false);
  const [isReport, setIsReport] = useState(false);

  const handleNameFilter = e => {
    setNameFilter(e.target.value);
  };

  const handleSpotFilter = e => {
    setSpotFilter(e.target.value);
  };

  useEffect(() => {
    console.log(nameFilter);
  }, [nameFilter]);
  useEffect(() => {
    console.log(spotFilter);
  }, [spotFilter]);

  return (
    <PageWrapper>
      <Wrap1>
        <Wrap2>
          <DateWrapper>
            <DeadLineWrapper>
              <Button
                color="blue"
                content="추천 가져오기"
                // onClick={recommandData}
              />
              <RecoDatePickerContainer>
                <RecoDatePickerBox>
                  <DatePicker
                    selected={recommandStartDate}
                    onChange={date => {
                      setRecommandStartDate(date);
                    }}
                    dateFormat="yyyy-MM-dd"
                    customInput={<SelectDatePicker />}
                  />
                </RecoDatePickerBox>
                -
                <RecoDatePickerBox>
                  <DatePicker
                    selected={recommandEndDate}
                    onChange={date => {
                      setRecommandEndDate(date);
                    }}
                    dateFormat="yyyy-MM-dd"
                    customInput={<SelectDatePicker />}
                  />
                </RecoDatePickerBox>
              </RecoDatePickerContainer>
            </DeadLineWrapper>
          </DateWrapper>

          <SelectWrap>
            <SelectBox
              placeholder="메이커스 리스트"
              options={userArr}
              onChange={e => {
                //userFilter(e.value);
                console.log('리뷰테이블');
                console.log(e);
                setMakersFilter(e.value.toString());
              }}
            />

            <TextInput
              placeholder="상품명, 상품번호 검색"
              name="nameFilter"
              //   value={nameFilter}
              onChange={handleNameFilter}
            />
            <TextInput
              placeholder="작성자 검색"
              name="spotFilter"
              //   value={spotFilter}
              onChange={handleSpotFilter}
            />

            {/* <SelectBox
              placeholder="상품명, 상품번호 검색"
              options={userNameArr}
              onChange={e => {
                //userNameFilter(e.value);
                setNameFilter(e.value);
              }}
            />
            <SelectBox
              placeholder="작성자 검색"
              options={spotArr}
              onChange={e => {
                //spotFilter(e.label);
                setSpotFilter(e.value);
              }}
            /> */}
            <Button
              content="필터 초기화"
              color="blue"
              onClick={() => window.location.reload()}
            />
          </SelectWrap>
        </Wrap2>

        <Wrap3>
          <NoRespondCountWrap>
            <NoRespondText>미답변 수량 : {3}개</NoRespondText>
          </NoRespondCountWrap>

          <CheckboxWrap>
            <CheckboxSmallWrap>
              <CheckboxText>사장님 댓글 여부</CheckboxText>
              <ReviewCheckbox
                width="20px"
                height="20px"
                // height="2rem"
                // css="margin:auto;"
                checked={isMakersReview}
                onChecked={() => {
                  setIsMakersReview(!isMakersReview);
                }}
              />
            </CheckboxSmallWrap>
            <CheckboxSmallWrap>
              <CheckboxText>관리자 댓글 여부</CheckboxText>
              <ReviewCheckbox
                width="20px"
                height="20px"
                // height="2rem"
                // css="margin:auto;"
                checked={isAdminReview}
                onChecked={() => {
                  setIsAdminReview(!isAdminReview);
                }}
              />
            </CheckboxSmallWrap>
            <CheckboxSmallWrap>
              <CheckboxText>신고 여부</CheckboxText>
              <ReviewCheckbox
                width="20px"
                height="20px"
                // height="2rem"
                // css="margin:auto;"
                checked={isReport}
                onChecked={() => {
                  setIsReport(!isReport);
                }}
              />
            </CheckboxSmallWrap>
          </CheckboxWrap>
        </Wrap3>
      </Wrap1>
    </PageWrapper>
  );
};

export default ReviewPage;

const DateWrapper = styled.div`
  margin-bottom: 10px;
`;

const Wrap1 = styled.div`
  display: flex;
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
`;
const Wrap3 = styled.div`
  display: flex;
  flex-direction: column;
`;
const DeadLineWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;
const RecoDatePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const RecoDatePickerBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  width: 100px;
  margin-top: 10px;
`;

const SelectWrap = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
`;

const SelectBox = styled(Select)`
  width: 220px;
  margin-right: 50px;
`;

const TextInput = styled.input`
  margin-right: 50px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  height: 39px;
  padding-left: 8px;
`;

const CheckboxWrap = styled.div``;

const CheckboxSmallWrap = styled.div`
  display: flex;
  align-items: center;
`;
const CheckboxText = styled.span`
  margin-right: 5px;
`;

const NoRespondCountWrap = styled.div``;

const NoRespondText = styled.span``;
