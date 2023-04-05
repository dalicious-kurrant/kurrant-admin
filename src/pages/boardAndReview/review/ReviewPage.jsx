import SelectDatePicker from 'pages/makers/components/SelectDatePicker';

import {PageWrapper, TableWrapper} from 'style/common.style';
import {Button, Checkbox, Dropdown, Table} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import {useEffect, useRef, useState} from 'react';
import ReviewTable from './components/ReviewTable';
import Select from 'react-select';
import ReviewCheckbox from './components/ReviewCheckbox';
import useReviewQuery from './useReviewQuery';
import {formattedDateForRecommendation} from 'utils/dateFormatter';
import {
  buildCustomUrl,
  fillMakersDropboxObject,
  filterReviewList,
} from './ReviewPageLogics';

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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 리뷰 서버에서 받기

  const limit = 10;
  const page = 1;

  const sampleStartDate = '2023-02-01';
  const sampleEndDate = '2023-03-30';

  // const {reviewList, makersList, reviewQueryRefetch} = useReviewQuery(
  //   ['getReviewList'],
  //   `reviews/all?limit=${limit}&page=${page}&startDate=${formattedDateForRecommendation(
  //     startDate,
  //   )}&endDate=${formattedDateForRecommendation(endDate)}`,
  // );

  // 2. 필터 값들

  const [makersId, setMakersId] = useState('');
  const [orderItemNameAndCode, setOrderItemNameAndCode] = useState('');
  const [writer, setWriter] = useState('');
  const [isMakersComment, setIsMakersComment] = useState(false);
  const [isAdminComment, setIsAdminComment] = useState(false);
  const [isReport, setIsReport] = useState(false);

  const [url, setUrl] = useState('reviews/all?limit=10&page=1');

  useEffect(() => {
    // console.log('orderItemNameAndCode ' + orderItemNameAndCode);
    // console.log('writer ' + writer);
    // console.log('isMakersComment ' + isMakersComment);
    // console.log('isAdminComment ' + isAdminComment);
    // console.log('isReport ' + isReport);
    // console.log('makersId ' + makersId);

    // console.log('startDate ' + formattedDateForRecommendation(startDate));
    // console.log('endDate ' + formattedDateForRecommendation(endDate));

    setUrl(
      buildCustomUrl(
        10,
        1,
        orderItemNameAndCode,
        writer,
        isMakersComment,
        isAdminComment,
        isReport,
        makersId,
        startDate,
        endDate,
      ),
    );
  }, [
    orderItemNameAndCode,
    writer,
    isMakersComment,
    isAdminComment,
    isReport,
    makersId,
    startDate,
    endDate,
    url,
    setUrl,
  ]);

  const {reviewList, makersList, unansweredCount, reviewQueryRefetch} =
    useReviewQuery(
      ['getReviewList'],
      // `reviews/all?limit=${limit}&page=${page}&startDate=${sampleStartDate}&endDate=${sampleEndDate}`,
      url,
    );

  useEffect(() => {
    console.log('야야야');
    console.log(url);

    reviewQueryRefetch();
  }, [url]);

  // 메이커스 드랍박스 채우기

  // 3. 필터링 하기

  const filteredReviewList = filterReviewList(reviewList);

  const handleNameFilter = e => {
    setOrderItemNameAndCode(e.target.value);
  };

  const handleSpotFilter = e => {
    setWriter(e.target.value);
  };

  return (
    <PageWrapper>
      <Wrap1>
        <Wrap2>
          <DateWrapper>
            <DeadLineWrapper>
              <RecoDatePickerContainer>
                <RecoDatePickerBox>
                  <DatePicker
                    selected={startDate}
                    onChange={date => {
                      setStartDate(date);
                    }}
                    dateFormat="yyyy-MM-dd"
                    customInput={<SelectDatePicker />}
                  />
                </RecoDatePickerBox>
                -
                <RecoDatePickerBox>
                  <DatePicker
                    selected={endDate}
                    onChange={date => {
                      setEndDate(date);
                    }}
                    dateFormat="yyyy-MM-dd"
                    customInput={<SelectDatePicker />}
                  />
                </RecoDatePickerBox>
              </RecoDatePickerContainer>

              <Button
                color="blue"
                content="리뷰 가져오기"
                onClick={() => {
                  reviewQueryRefetch();
                }}
              />
            </DeadLineWrapper>
          </DateWrapper>

          <SelectWrap>
            <SelectBox
              placeholder="메이커스 리스트"
              options={makersList ? fillMakersDropboxObject(makersList) : []}
              onChange={e => {
                //userFilter(e.value);

                setMakersId(e.value.toString());
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

            <Button
              content="필터 초기화"
              color="blue"
              onClick={() => {
                window.location.reload();
              }}
            />
          </SelectWrap>
        </Wrap2>

        <Wrap3>
          <NoRespondCountWrap>
            <NoRespondText>미답변 수량 : {unansweredCount}개</NoRespondText>
          </NoRespondCountWrap>

          <CheckboxWrap>
            <CheckboxSmallWrap>
              <CheckboxText>사장님 댓글 여부</CheckboxText>
              <ReviewCheckbox
                width="20px"
                height="20px"
                checked={isMakersComment}
                onChecked={() => {
                  setIsMakersComment(!isMakersComment);
                }}
              />
            </CheckboxSmallWrap>
            <CheckboxSmallWrap>
              <CheckboxText>관리자 댓글 여부</CheckboxText>
              <ReviewCheckbox
                width="20px"
                height="20px"
                checked={isAdminComment}
                onChecked={() => {
                  setIsAdminComment(!isAdminComment);
                }}
              />
            </CheckboxSmallWrap>
            <CheckboxSmallWrap>
              <CheckboxText>신고 여부</CheckboxText>
              <ReviewCheckbox
                width="20px"
                height="20px"
                checked={isReport}
                onChecked={() => {
                  setIsReport(!isReport);
                }}
              />
            </CheckboxSmallWrap>
          </CheckboxWrap>
        </Wrap3>
      </Wrap1>

      <ReviewTable testData={filteredReviewList} />
    </PageWrapper>
  );
};

export default ReviewPage;

const DateWrapper = styled.div`
  margin-bottom: 10px;
`;

const Wrap1 = styled.div`
  display: flex;
  /* border: 1px solid black; */
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;

  margin-right: 12px;
`;
const Wrap3 = styled.div`
  display: flex;
  flex-direction: column;
`;
const DeadLineWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;
const RecoDatePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
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
  margin-bottom: 3px;
`;
const CheckboxText = styled.span`
  margin-right: 5px;
`;

const NoRespondCountWrap = styled.div`
  margin: 10px 0;
`;

const NoRespondText = styled.span`
  font-size: 20px;
`;
