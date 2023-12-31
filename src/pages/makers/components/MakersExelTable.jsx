import {useEffect, useState} from 'react';
import {Table} from 'semantic-ui-react';
import {TableWrapper} from 'style/common.style';
import {formattedTime, formattedWeekDate} from '../../../utils/dateFormatter';
import {formattedPercent} from '../../../utils/numberFormatter';

const MakersExelTable = ({data}) => {
  const [key, setKey] = useState();
  //   console.log(key, '00');
  useEffect(() => {
    if (data) setKey(Object.keys(data[0]));
  }, [data]);

  return (
    <TableWrapper>
      <Table celled>
        {data.map((el, i) => {
          const HeaderData = Object.values(el);

          if (i === 0) {
            return (
              <Table.Header key={el.id + i}>
                <Table.Row>
                  {HeaderData.map((h, i) => {
                    console.log(h)
                    return (
                      <Table.HeaderCell key={h + i} textAlign="center">
                        {h}
                      </Table.HeaderCell>
                    );
                  })}
                </Table.Row>
              </Table.Header>
            );
          } else {
            return (
              <Table.Body key={el.id + i}>
                <Table.Row>
                  {key &&
                    key.map((k, i) => {
                      // console.log(el['companyRegistrationNumber'], '000');
                      if (k === 'id') {
                        return (
                          <Table.Cell key={k + i} textAlign="center">
                            {el[k]}
                          </Table.Cell>
                        );
                      }
                      if (k === 'isActive') {
                        return <Table.Cell key={k + i}>{el[k] }</Table.Cell>;
                      }
                      if (k === 'code') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'name') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'companyName') {
                        return (
                          <Table.Cell key={k + i}>
                            <div style={{width: 100}}>{el[k]}</div>
                          </Table.Cell>
                        );
                      }
                      if (k === 'ceo') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'ceoPhone') {
                        return (
                          <Table.Cell key={k + i}>
                            <div style={{width: 120}}>{el[k]}</div>
                          </Table.Cell>
                        );
                      }
                      if (k === 'managerName') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'managerPhone') {
                        return (
                          <Table.Cell key={k + i}>
                            <div style={{width: 120}}>{el[k]}</div>
                          </Table.Cell>
                        );
                      }
                      if (k === 'diningTypes') {
                        return <Table.Cell key={k + i}>{el[k] || '-'}</Table.Cell>;
                      }
                      if (k === 'serviceDays') {
                        return <Table.Cell key={k + i}>{el[k] || '-'}</Table.Cell>;
                      }
                      if (k === 'morningLastOrderTime') {
                        return <Table.Cell key={k + i}>{el[k]|| '-'}</Table.Cell>;
                      }
                      if (k === 'morningCapa') {
                        return <Table.Cell key={k + i}>{el[k]|| '-'}</Table.Cell>;
                      }
                      if (k === 'morningMinTime') {
                        return <Table.Cell key={k + i}>{typeof el[k] === typeof new Date()
                          ? formattedTime(el[k])
                          : el[k]}</Table.Cell>;
                      }
                      if (k === 'morningMaxTime') {
                        return <Table.Cell key={k + i}>{typeof el[k] === typeof new Date()
                          ? formattedTime(el[k])
                          : el[k]}</Table.Cell>;
                      }
                      if (k === 'lunchLastOrderTime') {
                        return <Table.Cell key={k + i}>{el[k]|| '-'}</Table.Cell>;
                      }
                      if (k === 'lunchCapa') {
                        return <Table.Cell key={k + i}>{el[k]|| '-'}</Table.Cell>;
                      }
                      if (k === 'lunchMinTime') {
                        return <Table.Cell key={k + i}>{typeof el[k] === typeof new Date()
                          ? formattedTime(el[k])
                          : el[k]}</Table.Cell>;
                      }
                      if (k === 'lunchMaxTime') {
                        return <Table.Cell key={k + i}> {typeof el[k] === typeof new Date()
                          ? formattedTime(el[k])
                          : el[k]}</Table.Cell>;
                      }
                      if (k === 'dinnerLastOrderTime') {
                        return <Table.Cell key={k + i}>{el[k]|| '-'}</Table.Cell>;
                      }
                      if (k === 'dinnerCapa') {
                        return <Table.Cell key={k + i}>{el[k]|| '-'}</Table.Cell>;
                      }
                      if (k === 'dinnerMinTime') {
                        return <Table.Cell key={k + i}>{typeof el[k] === typeof new Date()
                          ? formattedTime(el[k])
                          : el[k]}</Table.Cell>;
                      }
                      if (k === 'dinnerMaxTime') {
                        return <Table.Cell key={k + i}>{typeof el[k] === typeof new Date()
                          ? formattedTime(el[k])
                          : el[k]}</Table.Cell>;
                      }
                      if (k === 'dailyCapacity') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'serviceType') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'serviceForm') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'isParentCompany') {
                        return (
                          <Table.Cell key={k + i}>
                            {el[k] ? '있음' : '없음'}
                          </Table.Cell>
                        );
                      }
                      if (k === 'parentCompanyId') {
                        return (
                          <Table.Cell key={k + i}>
                            {!el[k] ? '없음' : el[k]}
                          </Table.Cell>
                        );
                      }
                      if (k === 'zipCode') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'address1') {
                        return (
                          <Table.Cell key={k + i}>
                            <div style={{width: 200}}>{el[k]}</div>
                          </Table.Cell>
                        );
                      }
                      if (k === 'address2') {
                        return (
                          <Table.Cell key={k + i}>
                            <div style={{width: 200}}>{el[k]}</div>
                          </Table.Cell>
                        );
                      }
                      if (k === 'location') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'companyRegistrationNumber') {
                        return (
                          <Table.Cell key={k + i}>
                            <div style={{width: 120}}>{el[k]}</div>
                          </Table.Cell>
                        );
                      }
                      if (k === 'contractStartDate') {
                        return (
                          <Table.Cell key={k + i}>
                            <div style={{width: 130}}>
                              {typeof el[k] === typeof new Date()
                                ? formattedWeekDate(el[k])
                                : el[k]}
                            </div>
                          </Table.Cell>
                        );
                      }
                      if (k === 'contractEndDate') {
                        return (
                          <Table.Cell key={k + i}>
                            <div style={{width: 130}}>
                              {typeof el[k] === typeof new Date()
                                ? formattedWeekDate(el[k])
                                : el[k]}
                            </div>
                          </Table.Cell>
                        );
                      }
                      if (k === 'isNutritionInformation') {
                        return (
                          <Table.Cell key={k + i}>
                            {el[k] ? '대상' : '비대상'}
                          </Table.Cell>
                        );
                      }
                      if (k === 'openTime') {
                        return (
                          <Table.Cell key={k + i}>
                            {typeof el[k] === typeof new Date()
                              ? formattedTime(el[k])
                              : el[k]}
                          </Table.Cell>
                        );
                      }
                      if (k === 'closeTime') {
                        return (
                          <Table.Cell key={k + i}>
                            {typeof el[k] === typeof new Date()
                              ? formattedTime(el[k])
                              : el[k]}
                          </Table.Cell>
                        );
                      }
                      if (k === 'fee') {
                        return (
                          <Table.Cell key={k + i}>
                            {formattedPercent(el[k])}
                          </Table.Cell>
                        );
                      }
                      if (k === 'bank') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'depositHolder') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'accountNumber') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      return (
                        <Table.Cell key={k + i}>
                          <div>{el[k]}</div>
                        </Table.Cell>
                      );
                    })}
                </Table.Row>
              </Table.Body>
            );
          }
        })}
      </Table>
    </TableWrapper>
  );
};

export default MakersExelTable;
