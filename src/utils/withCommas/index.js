/**
 *
 * @param {number} price
 */
export default function withCommas(price) {
  if (!price) return '0';
  if(price < 1 && price > 0) return (price*100).toString()+"%";
  return Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}