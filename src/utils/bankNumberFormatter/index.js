export function bankNumberFormatter(num) {
  let DashedAcountNumber = num;
  if (!num) {
    return '';
  }
  if (num.length === 11) {
    DashedAcountNumber =
      num.substring(0, 3) + '-' + num.substring(3, 5) + '-' + num.substring(5);
  } else if (num.length === 12) {
    DashedAcountNumber =
      num.substring(0, 3) +
      '-' +
      num.substring(3, 5) +
      '-' +
      num.substring(5, 11) +
      '-' +
      num.substring(11);
  }

  return DashedAcountNumber;
}
