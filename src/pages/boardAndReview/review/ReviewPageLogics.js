import {formattedDateForRecommendation} from 'utils/dateFormatter';

export const fillMakersDropboxObject = makersListFromServer => {
  // value와 label형태로 만들기

  const makersListDropboxArray = makersListFromServer.map(v => {
    return {
      value: v.makersId,
      label: v.makersName,
    };
  });

  return makersListDropboxArray;
};

export const filterReviewList = reviewList => {
  // 프론트에서 필터링 할려고 했는데 백엔드에서 필터링 해준다고 해주심
  return reviewList;
};

export const buildCustomUrl = (
  limit = 10,
  page = 1,
  orderItemNameAndCode,
  writer,
  isMakersComment,
  isAdminComment,
  isReport,
  makersId,
  startDate,
  endDate,
) => {
  const basicUrl = [`reviews/all?limit=${limit}&page=${page}`];

  // 1. 그냥 집어넣기 3

  if (orderItemNameAndCode) {
    basicUrl.push(
      `&orderCode=${orderItemNameAndCode}&orderItemName=${orderItemNameAndCode}`,
    );
  }
  //
  if (writer) {
    basicUrl.push(`&writer=${writer}`);
  }
  if (makersId) {
    basicUrl.push(`&makersId=${makersId}`);
  }

  // 2. date류 2

  if (startDate) {
    basicUrl.push(`&startDate=${formattedDateForRecommendation(startDate)}`);
  }

  if (endDate) {
    basicUrl.push(`&endDate=${formattedDateForRecommendation(endDate)}`);
  }

  // 3. boolean애들 3

  if (isMakersComment) {
    basicUrl.push(`&isMakersComment=${isMakersComment}`);
  }

  if (isAdminComment) {
    basicUrl.push(`&isAdminComment=${isAdminComment}`);
  }

  if (isReport) {
    basicUrl.push(`&isReport=${isReport}`);
  }

  return basicUrl.join('');
};
