export function bizNumberFormatter(num) {
  return num.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
}
