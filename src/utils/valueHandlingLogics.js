export const handleFalsyValueToString = value => {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'undefined') {
    return 'undefined';
  } else if (typeof value === 'null') {
    return 'null';
  } else if (value === false) {
    return 'false';
  } else if (value === '') {
    return '';
  } else {
    return '-';
  }
};

export const handleFalsyValueToHyphen = value => {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'undefined') {
    return '-';
  } else if (typeof value === 'null') {
    return '-';
  } else if (value === false) {
    return 'false';
  } else if (value === '') {
    return '-';
  } else {
    return '-';
  }
};

export const splitNumberAndUnit = str => {
  const onlyNumbersArray = str.match(/[0-9/.]/g);
  const number = parseInt(str.match(/[0-9/.]/g)?.join(''));

  let unit = '';
  if (onlyNumbersArray) {
    unit = str
      .split('')
      .filter(x => !onlyNumbersArray.includes(x))
      .join('');
  }

  return {number, unit};
};

export const handleFalsyValueToBlank = value => {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return parseInt(value);
  } else if (typeof value === 'undefined') {
    return '';
  } else if (typeof value === 'null') {
    return '';
  } else if (value === false) {
    return '';
  } else if (value === '') {
    return '';
  } else {
    return '';
  }
};
