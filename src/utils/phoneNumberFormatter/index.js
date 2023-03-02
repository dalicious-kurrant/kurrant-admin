export function phoneNumberFormmatter(num) {
  if (!num) {
    return '';
  }
  return num
    .replace(/[^0-9]/g, '') // 숫자를 제외한 모든 문자 제거
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}
