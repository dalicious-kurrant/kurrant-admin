// // import {CRUDAvaliableList} from 'data/CRUDAvaliableList';

// // export const isCRUDAvaliable = pathname => {
// //   return CRUDAvaliableList.map(value => `/main/${value}`).includes(pathname);
// // };

// export const numberOfTrues = checkboxStatus => {
//   // console.log(checkboxStatus);
//   let total = 0;
//   const yo = {...checkboxStatus};
//   delete yo.parent;

//   Object.values(yo).forEach(value => {
//     if (value === true) {
//       total = total + 1;
//     }
//   });

//   return total;
// };

// export const checkedValue = (checkboxStatus, companyMembershipDataList) => {
//   let checkedId = undefined;
//   let returnValue;
//   Object.entries({...checkboxStatus}).forEach(value => {
//     if (value[1] === true) {
//       checkedId = value[0];
//     }
//   });

//   [...companyMembershipDataList].forEach(value => {
//     if (value.id.toString() == checkedId) {
//       returnValue = value;
//     }
//   });

//   return returnValue;
// };

// export const idsToDelete = checkboxStatus => {
//   const returnIdsToDelete = [];

//   Object.keys({...checkboxStatus}).forEach(value => {
//     if ({...checkboxStatus}[value]) {
//       returnIdsToDelete.push(value);
//     }
//   });

//   return returnIdsToDelete;
// };
