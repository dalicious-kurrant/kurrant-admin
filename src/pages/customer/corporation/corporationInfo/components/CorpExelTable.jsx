import {useEffect, useState} from 'react';
import {Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from 'style/common.style';

const CorpExelTable = ({data}) => {
  const [key, setKey] = useState();

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
                        if (k === 'code') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'name') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'zipCode') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'address1') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'address2') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'location') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'diningTypes') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'serviceDays') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
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
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'morningSupportPrice') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'lunchSupportPrice') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'dinnerSupportPrice') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }

                        if (k === 'employeeCount') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'isSetting') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'isGarbage') {
                          return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                        }
                        if (k === 'isHotStorage') {
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
    </PageWrapper>
  );
};

export default CorpExelTable;
