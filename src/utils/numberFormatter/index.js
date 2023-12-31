/**
 * @copyright Copyright © 2018-2019 Corretto, Inc. All rights reserved.
 */

export function formattedPercent(num) {
  if (!num) return '0%';
  const percent = Number(num).toFixed(1);
  return percent + '%';
}
