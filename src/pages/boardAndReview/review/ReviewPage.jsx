import {PageWrapper} from 'style/common.style';
import {Button} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import {useEffect, useRef, useState} from 'react';
import ReviewTable from './components/ReviewTable';
import Select from 'react-select';

import useReviewQuery from './useReviewQuery';

import {buildCustomUrl, fillMakersDropboxObject} from './ReviewPageLogics';

import 'react-datepicker/dist/react-datepicker.css';
import ReviewSelectDatePicker from './components/ReviewSelectDatePicker';
import ReviewPagination from './ReviewPagination/ReviewPagination';
import RadioInput from './components/Radio/RadioInput';
import RadioGroup from './components/Radio/RadioGroup';
import Radio from './components/Radio/Radio';

const ReviewPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  // 필터 값들 모으기

  // 1. 날짜

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // 날짜를 클릭 하고부터 적용하게 하기

  // 2. 필터 값들

  const [makersId, setMakersId] = useState('');
  const [orderItemNameAndCode, setOrderItemNameAndCode] = useState('');
  const [writer, setWriter] = useState('');

  const [isMakersComment, setIsMakersComment] = useState(null);
  const [isAdminComment, setIsAdminComment] = useState(null);
  const [isReport, setIsReport] = useState(null);

  const handleIsMakersChange = e => {
    setIsMakersComment(e.target.value);
  };

  const handleIsAdminChange = event => {
    setIsAdminComment(event.target.value);
  };
  const handleIsReportChange = event => {
    setIsReport(event.target.value);
  };

  const [url, setUrl] = useState('reviews/all?limit=50&page=1');

  useEffect(() => {
    setUrl(
      buildCustomUrl(
        limit,
        page,
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
    page,
    limit,
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

  const {
    reviewList,
    totalPage,
    makersList,
    unansweredCount,
    reviewQueryRefetch,
    status,
  } = useReviewQuery(
    ['getReviewList'],

    url,
  );

  useEffect(() => {
    console.log(url);
    reviewQueryRefetch();
  }, [url]);

  // const timer = callback => {
  //   setTimeout(() => {
  //     callback();
  //   }, 1500);
  // };

  // useEffect(() => {
  //   if (!reviewList || reviewList.length < 1) {
  //     timer(() => {
  //       reviewQueryRefetch();
  //     });
  //   }
  // }, [reviewList, reviewQueryRefetch]);

  // 메이커스 드랍박스 채우기

  // 3. 필터링 하기

  const handleNameFilter = e => {
    setOrderItemNameAndCode(e.target.value);
  };

  const handleSpotFilter = e => {
    setWriter(e.target.value);
  };

  // 값 확인하기

  useEffect(() => {
    // console.log(reviewList);
  }, [reviewList]);

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
                    customInput={<ReviewSelectDatePicker />}
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
                    customInput={<ReviewSelectDatePicker />}
                  />
                </RecoDatePickerBox>
              </RecoDatePickerContainer>
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

            <FilterButton
              content="필터 초기화"
              color="blue"
              onClick={() => {
                window.location.reload();
              }}
            />

            <Button
              color="blue"
              content="검색하기"
              onClick={() => {
                reviewQueryRefetch();
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

              <Radio
                setChange={handleIsMakersChange}
                name={'isMakersComment'}
                inputList={[
                  {
                    value: '',
                    defaultChecked: true,
                    title: '전체',
                  },
                  {
                    value: true,
                    defaultChecked: false,
                    title: '있음',
                  },
                  {
                    value: false,
                    defaultChecked: false,
                    title: '없음',
                  },
                ]}
              />
            </CheckboxSmallWrap>

            <CheckboxSmallWrap>
              <CheckboxText>관리자 댓글 여부</CheckboxText>
              <Radio
                setChange={handleIsAdminChange}
                name={'isAdminComment'}
                inputList={[
                  {
                    value: '',
                    defaultChecked: true,
                    title: '전체',
                  },
                  {
                    value: true,
                    defaultChecked: false,
                    title: '있음',
                  },
                  {
                    value: false,
                    defaultChecked: false,
                    title: '없음',
                  },
                ]}
              />
            </CheckboxSmallWrap>
            <CheckboxSmallWrap>
              <CheckboxText>신고 여부</CheckboxText>
              <Radio
                setChange={handleIsReportChange}
                name={'isReport'}
                inputList={[
                  {
                    value: '',
                    defaultChecked: true,
                    title: '전체',
                  },
                  {
                    value: true,
                    defaultChecked: false,
                    title: '있음',
                  },
                  {
                    value: false,
                    defaultChecked: false,
                    title: '없음',
                  },
                ]}
              />
            </CheckboxSmallWrap>
          </CheckboxWrap>
        </Wrap3>
      </Wrap1>

      <p>tip: 필터가 적용되지 않을 경우, '검색하기' 버튼을 눌러보세요</p>

      {status == 'success' && reviewList && reviewList.length > 0 ? (
        <ReviewPagination
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalPage={totalPage}
          selectOptionArray={[50, 100, 200, 500]}
        />
      ) : (
        <Div></Div>
      )}
      <ReviewTable testData={reviewList} />
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

const FilterButton = styled(Button)`
  margin-right: 25px !important;
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
  margin-right: 30px;
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
  margin-right: 8px;
`;

const NoRespondCountWrap = styled.div`
  margin: 10px 0;
`;

const NoRespondText = styled.span`
  font-size: 20px;
`;

const DateDatePicker = styled(DatePicker)``;

const DefaultDateText = styled.span`
  color: #6b6b6b; /* Customize the color of the default text */
`;

const Div = styled.div`
  flex: 1;

  height: 4rem;
`;
