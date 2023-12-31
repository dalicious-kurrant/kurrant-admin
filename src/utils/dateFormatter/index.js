/**
 * @copyright Copyright © 2018-2019 Corretto, Inc. All rights reserved.
 */

function leftPad(value) {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
}

function transDateType(val) {
  if (typeof val !== typeof new Date()) {
    if (val?.includes('Z')) {
      return new Date(val);
    }
  }
  return new Date(val + 'Z');
}
function transTimeType(val) {
  return new Date(val);
}

export function formattedTimer(remainSeconds) {
  const minutes = Math.floor(remainSeconds / 60);
  const seconds = remainSeconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}
export function formattedWeekDateTime(data, delimiter = '-') {
  const dateTime = transDateType(data);
  const day = leftPad(dateTime.getDate());
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());
  return `${day}일 ${[hour, minute].join(':')}`;
}
export function formattedTime(data) {
  if (typeof data !== typeof new Date()) {
    const isDate = new Date();
    const hhmm = data.split(':');
    isDate.setHours(hhmm[0]);
    isDate.setMinutes(hhmm[1]);
    const dateTime = transTimeType(isDate);
    const hour = leftPad(dateTime.getHours());
    const minute = leftPad(dateTime.getMinutes());
    return `${hour}:${minute}`;
  }
  const dateTime = transTimeType(data);
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());
  return `${hour}:${minute}`;
}

export function formattedMealTime(data) {
  const dateTime = transDateType(data);
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());

  return `${hour < 12 ? '오전' : '오후'} ${
    hour > 12 ? hour - 12 : hour
  }:${minute}`;
  // return `${hour}:${minute}`;
}

export function formattedDate(data, delimiter = '.') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  if (delimiter === '년월일') {
    return `${year}년 ${month}월 ${day}일`;
  }
  if (delimiter === '/') {
    return `${year}/${month}/${day}`;
  }
  return [year, month, day].join(delimiter);
}
export function formattedDateZ(data, delimiter = '.') {
  const dateTime = transDateType(data);
  const year = dateTime.getUTCFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  if (delimiter === '년월일') {
    return `${year}년 ${month}월 ${day}일`;
  }
  if (delimiter === '/') {
    return `${year}/${month}/${day}`;
  }
  return [year, month, day].join(delimiter);
}

export function formattedDateAndTime(data, delimiter = '.') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());
  return `${[year, month, day].join(delimiter)} ${hour}:${minute}`;
}

export function formattedFullDate(data, delimiter = '-') {
  const dateTime = transTimeType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());
  const second = leftPad(dateTime.getSeconds());
  return `${[year, month, day].join(delimiter)} ${hour}:${minute}:${second}`;
}

export function formattedDateAndDay(data, delimiter = '. ') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[dateTime.getDay()];

  return `${[year, month, day].join(delimiter)} (${dayOfWeek})`;
}

// 식사구매 날짜 버튼
export function formattedDateBtn(data) {
  const dateTime = transDateType(data);
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return month + '월' + day + '일';
}

// 취소 날짜
export function formattedDateWeekBtn(data, delimiter = '.') {
  const dateTime = transDateType(data);
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[dateTime.getDay()];
  return `${[month, day].join(delimiter)}(${dayOfWeek})`;
}
export function formattedWeekDateZ(data, delimiter = '-') {
  const dateTime = transTimeType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return `${[year, month, day].join(delimiter)}`;
}
export function formattedWeekDate(data, delimiter = '-') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return `${[year, month, day].join(delimiter)}`;
}

export function formattedMonthDay(data) {
  const dateTime = transDateType(data);

  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[dateTime.getDay()];
  return `${month}월 ${day}일(${dayOfWeek})`;
}

export function formattedApplicationDate(data) {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return `${[year, month, day]}`.replace(/[^0-9 ^-]/g, '');
}
export function formattedSameDate(startData, endDate) {
  const dateTime1 = transDateType(
    startData
      .replace('년', '-')
      .replace('월', '-')
      .replace('일', '')
      .replace(/\s/gi, ''),
  );
  const dateTime2 = transDateType(endDate);

  const diffMSec = dateTime1.getTime() - dateTime2.getTime();
  const diffHour = diffMSec / (60 * 60 * 1000 * 24);
  console.log(Math.round(diffHour));
  return Math.round(diffHour);
}

export function formattedDateType(data) {
  switch (data) {
    case 1:
      return '아침';
    case 2:
      return '점심';
    case 3:
      return '저녁';
    default:
      break;
  }
}
export function formattedDateReverseType(data) {
  switch (data) {
    case '아침':
      return 1;
    case '점심':
      return 2;
    case '저녁':
      return 3;
    default:
      break;
  }
}
// export function daysLeft(endDate) {
//   const dayNow = new Date();

//   const summaryNowDay = new Date(
//     dayNow.getFullYear(),
//     dayNow.getMonth() + 1,
//     dayNow.getDate(),
//   );
//   const summaryEndDay = new Date(
//     endDate.getFullYear(),
//     endDate.getMonth() + 1,
//     endDate.getDate(),
//   );

//   if (summaryEndDay.getTime() >= summaryNowDay.getTime()) {
//     const dayLefted = summaryEndDay.getTime() - summaryNowDay.getTime();
//     return Math.ceil(dayLefted / (1000 * 60 * 60 * 24)) + 1;
//   } else {
//     return 0;
//   }
// }

export function formattedDateForRecommendation(date) {
  const year = date.getFullYear();
  const month = leftPad(date.getMonth() + 1);
  const day = leftPad(date.getDate());
  return `${year}-${month}-${day}`;
}

export function addDays(date, days) {
  let dateTime = transDateType(date);
  dateTime = new Date(dateTime.setDate(dateTime.getDate() + days));
  return dateTime;
}

export function formattedYearMonthDate(data, delimiter = '-') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth());

  return `${[year, month].join(delimiter)}`;
}
