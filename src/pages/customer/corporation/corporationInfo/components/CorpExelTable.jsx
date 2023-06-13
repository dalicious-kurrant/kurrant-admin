import {useEffect, useState} from 'react';
import {Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from 'style/common.style';
import withCommas from 'utils/withCommas';

const CorpExelTable = ({data}) => {
  const [key, setKey] = useState();
  const week = ['월', '화', '수', '목', '금', '토', '일'];
  useEffect(() => {
    if (data) setKey(Object.keys(data[0]));
  }, [data]);
  return (
    <PageWrapper>
      <TableWrapper>
        <Table celled>
          {data.map((el, i) => {
            const HeaderData = Object.values(el);

            if (i === 0) {
              return (
                <Table.Header key={el.id + i}>
                  <Table.Row>
                    {HeaderData.map((h, i) => {
                      return (
                        <Table.HeaderCell key={h + i}>{h}</Table.HeaderCell>
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
                        if (k === 'id') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'isActive') {
                          const isActive = el[k] ? '활성' : '비활성';
                          return (
                            <Table.Cell key={k + i}>{isActive}</Table.Cell>
                          );
                        }
                        if (k === 'code') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'name') {
                          return (
                            <Table.Cell key={k + i}>
                              <div
                                style={{width: 'auto', whiteSpace: 'nowrap'}}>
                                {el[k]}
                              </div>
                            </Table.Cell>
                          );
                        }
                        if (k === 'zipCode') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'address1') {
                          return (
                            <Table.Cell key={k + i}>
                              {' '}
                              <div
                                style={{width: 'auto', whiteSpace: 'nowrap'}}>
                                {el[k]}
                              </div>
                            </Table.Cell>
                          );
                        }
                        if (k === 'address2') {
                          return (
                            <Table.Cell key={k + i}>
                              {' '}
                              <div
                                style={{width: 'auto', whiteSpace: 'nowrap'}}>
                                {el[k]}
                              </div>
                            </Table.Cell>
                          );
                        }
                        if (k === 'location') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'diningTypes') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'serviceDays') {
                          return (
                            <Table.Cell key={k + i}>
                              <div
                                style={{width: 'auto', whiteSpace: 'nowrap'}}>
                                {el[k]}
                              </div>
                            </Table.Cell>
                          );
                        }
                        if (k === 'managerId') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'managerName') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'managerPhone') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'isMembershipSupport') {
                          const membership = el[k] ? '지원' : '미지원';

                          return (
                            <Table.Cell key={k + i}>{membership}</Table.Cell>
                          );
                        }
                        if (
                          k === 'orderServiceDays' ||
                          k === 'deliveryTime' ||
                          k === 'lastOrderTime' ||
                          k === 'membershipBenefitTime'
                        ) {
                          return (
                            <Table.Cell key={k + i}>
                              {el[k]?.split('/')?.map((days, i) => {
                                const name =
                                  i === 0 ? '아침' : i === 1 ? '점심' : '저녁';
                                return (
                                  <div
                                    key={days + i}
                                    style={{
                                      width: 'auto',
                                      height: 20,
                                      whiteSpace: 'nowrap',
                                    }}>
                                    {days && name + ': ' + days}
                                  </div>
                                );
                              })}
                            </Table.Cell>
                          );
                        }

                        if (k === 'employeeCount') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (
                          k === 'morningSupportPrice' ||
                          k === 'lunchSupportPrice' ||
                          k === 'dinnerSupportPrice'
                        ) {
                          return (
                            <Table.Cell key={k + i}>
                              {el[k] &&
                                el[k]?.split(',')?.map((data, i) => {
                                  return (
                                    <div
                                      key={i + week[i] + data}
                                      style={{
                                        width: 'auto',
                                        height: 15,
                                        marginTop: 5,
                                        whiteSpace: 'nowrap',
                                      }}>
                                      {week[i] + ': ' + withCommas(data)}
                                    </div>
                                  );
                                })}
                            </Table.Cell>
                          );
                        }
                        if (k === 'isSetting') {
                          const setting = el[k] ? '사용' : '미사용';

                          return <Table.Cell key={k + i}>{setting}</Table.Cell>;
                        }
                        if (k === 'isGarbage') {
                          const garbage = el[k] ? '사용' : '미사용';

                          return <Table.Cell key={k + i}>{garbage}</Table.Cell>;
                          
                        }
                        if (k === 'isHotStorage') {
                          const hotStorage = el[k] ? '사용' : '미사용';
                          return (
                            <Table.Cell key={k + i}>{hotStorage}</Table.Cell>
                          );
                        }

                        return (
                          <Table.Cell key={k + i}>
                            <div style={{width: 'auto'}}>{el[k]}</div>
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
    </PageWrapper>
  );
};

export default CorpExelTable;
