export function bizNoFormatter(num, type) {
  let formatNum = '';

  if (!num) {
    return '';
  }

  try {
    if (num.length === 10) {
      if (type === 0) {
        formatNum = num.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-*****');
      } else {
        formatNum = num.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
      }
    }
  } catch (e) {
    formatNum = num;

    console.log(e);
  }

  return formatNum;
}
