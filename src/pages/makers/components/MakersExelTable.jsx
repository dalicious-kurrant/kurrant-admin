import {useEffect, useState} from 'react';
import {Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from 'style/common.style';
import {bankNumberFormatter} from 'utils/bankNumberFormatter';
import {bizNoFormatter, bizNumberFormatter} from 'utils/bizNumberFormatter';
import {formattedDate, formattedTime} from 'utils/dateFormatter';
import {phoneNumberFormmatter} from 'utils/phoneNumberFormatter';

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
                            <div style={{width: 120}}>
                              {phoneNumberFormmatter(el[k])}
                            </div>
                          </Table.Cell>
                        );
                      }
                      if (k === 'managerName') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'managerPhone') {
                        return (
                          <Table.Cell key={k + i}>
                            <div style={{width: 120}}>
                              {phoneNumberFormmatter(el[k])}
                            </div>
                          </Table.Cell>
                        );
                      }
                      if (k === 'diningTypes') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
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
                            {el[k] ? '여' : '부'}
                          </Table.Cell>
                        );
                      }
                      if (k === 'parentCompanyId') {
                        return (
                          <Table.Cell key={k + i}>
                            {!el[k] ? '부' : el[k]}
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
                            <div style={{width: 120}}>
                              {bizNoFormatter(el[k].toString())}
                            </div>
                          </Table.Cell>
                        );
                      }
                      if (k === 'contractStartDate') {
                        return (
                          <Table.Cell key={k + i}>
                            <div style={{width: 130}}>{el[k]}</div>
                          </Table.Cell>
                        );
                      }
                      if (k === 'contractEndDate') {
                        return (
                          <Table.Cell key={k + i}>
                            <div style={{width: 130}}>{el[k]}</div>
                          </Table.Cell>
                        );
                      }
                      if (k === 'isNutritionInformation') {
                        return (
                          <Table.Cell key={k + i}>
                            {el[k] ? '여' : '부'}
                          </Table.Cell>
                        );
                      }
                      if (k === 'openTime') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'closeTime') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
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
