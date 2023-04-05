import {useState} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from 'style/common.style';
import styled from 'styled-components';
import {formattedWeekDateZ} from 'utils/dateFormatter';
import Select from 'react-select';
import {FormProvider, useForm} from 'react-hook-form';
import Input from 'components/input/Input';

const AddOrder = () => {
  const day = new Date();
  const days = formattedWeekDateZ(day);
  const [startDate, setStartDate] = useState(days);
  const [endDate, setEndDate] = useState(days);

  const form = useForm({
    mode: 'all',
  });
  const {watch, setValue} = form;

  const purpose = watch('purpose');
  const count = watch('count');
  console.log(purpose);
  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };

  return (
    <Wrapper>
      <div>
        <DateInput
          type="date"
          defaultValue={startDate}
          onChange={e => getStartDate(e)}
        />
        <DateSpan>-</DateSpan>
        <DateInput
          type="date"
          defaultValue={endDate}
          onChange={e => getEndDate(e)}
        />
      </div>
      <TableWrapper>
        <div style={{marginTop: 12}}>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  요청 날짜
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">스팟</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  상세 스팟
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">사용목적</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">상품</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">단가</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">수량</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">총 금액</Table.HeaderCell>
                <Table.HeaderCell textAlign="center"></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">
                  <InnerCell>2023-03-20</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <InnerCell>2023-03-18 23:00:00</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <InnerCell>롯데월드</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <InnerCell>롯데타워 23층</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <InnerCell>손님</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <InnerCell>육개장</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <InnerCell>8000</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <InnerCell>3</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <InnerCell>24000</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Button content="취소" color="red" size="tiny" />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <div style={{marginTop: 48}}>
          <FormProvider {...form}>
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    다이닝타입
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">상품</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">가격</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    구매 가능 수량
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">스팟</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    상세 스팟
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    사용 목적
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">수량</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">총액</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell textAlign="center">
                    <InnerCell>2023-04-03</InnerCell>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <InnerCell>점심</InnerCell>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <InnerCell>모모의 픽 1</InnerCell>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <InnerCell>8,000원</InnerCell>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <InnerCell>50</InnerCell>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <SelectBox
                      // ref={groupRef}
                      // options={groupArr}
                      placeholder="스팟"
                      // defaultValue={defaultGroup}
                      // onChange={e => {
                      //   if (e) {
                      //     setDefaultGroup(e);
                      //     setGroupOption(e.value);
                      //     setGroupInfoId(e.value);
                      //   } else {
                      //     setGroupOption('');
                      //   }
                      // }}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <SelectBox
                      // ref={groupRef}
                      // options={groupArr}
                      placeholder="상세스팟"
                      // defaultValue={defaultGroup}
                      // onChange={e => {
                      //   if (e) {
                      //     setDefaultGroup(e);
                      //     setGroupOption(e.value);
                      //     setGroupInfoId(e.value);
                      //   } else {
                      //     setGroupOption('');
                      //   }
                      // }}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <InnerCell>
                      <Input name="purpose" width="200px" />
                    </InnerCell>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <InnerCell>
                      <Input name="count" />
                    </InnerCell>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <InnerCell>8,000원</InnerCell>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </FormProvider>
        </div>
      </TableWrapper>
    </Wrapper>
  );
};
export default AddOrder;

const Wrapper = styled.div`
  margin-top: 24px;
`;

const DateInput = styled.input`
  padding: 4px;
  width: 200px;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.grey[5]};
  margin-top: 4px;
`;

const DateSpan = styled.span`
  margin: 0px 4px;
`;

const SelectBox = styled(Select)`
  /* width: 200px; */
  margin-top: 4px;
`;

const InnerCell = styled.div`
  white-space: nowrap;
`;
