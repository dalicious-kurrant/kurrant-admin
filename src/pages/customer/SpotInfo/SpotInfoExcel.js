import * as XLSX from 'xlsx';

export function exportSpotInfoExcel(plan) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(plan, {
    cellDates: true,
    dateNF: 'dd.mm.yy hh:mm:ss',
  });

  XLSX.utils.book_append_sheet(workbook, worksheet, '고객_스팟_정보');
  XLSX.writeFile(workbook, '고객_스팟_정보.xlsx');
}
