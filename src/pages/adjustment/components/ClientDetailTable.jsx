import {Link} from 'react-router-dom';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import ExcelIcon from '../../../asset/icons/excel.svg';
import PDFIcon from '../../../asset/icons/pdfIcon.svg';
import {useAtom} from 'jotai';
import {corpDataAtom} from 'utils/store';
import withCommas from 'utils/withCommas';

const ClientDetailTable = () => {
  const [data] = useAtom(corpDataAtom);

  return (
    <div>
      <Wrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">년도</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">월</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                스팟(고객사)
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">선금</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">금액</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell
                textAlign="center"
                style={{borderBottom: '1px solid rgba(34,36,38,.1)'}}>
                {data?.year}
              </Table.Cell>
              <Table.Cell
                textAlign="center"
                style={{borderBottom: '1px solid rgba(34,36,38,.1)'}}>
                {data?.month}
              </Table.Cell>
              <Table.Cell
                textAlign="center"
                style={{borderBottom: '1px solid rgba(34,36,38,.1)'}}>
                {data?.corporationName}
              </Table.Cell>
              <Table.Cell
                textAlign="center"
                style={{borderBottom: '1px solid rgba(34,36,38,.1)'}}>
                {withCommas(
                  data?.prepaidPrice === null ? '-' : data?.prepaidPrice,
                )}
              </Table.Cell>
              <Table.Cell
                textAlign="center"
                style={{
                  borderBottom: '1px solid rgba(34,36,38,.1)',
                }}>
                {withCommas(data?.price === 0 ? '0' : data?.price)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">담당자</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">전화번호</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">수정요청</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">엑셀/PDF</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign="center">{data?.managerName}</Table.Cell>
              <Table.Cell textAlign="center">{data?.phone}</Table.Cell>
              <Table.Cell textAlign="center">{data?.paycheckStatus}</Table.Cell>
              <Table.Cell textAlign="center">
                {data?.hasRequest ? '있음' : '없음'}
              </Table.Cell>

              <Table.Cell width={2}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                  {data?.excelFile && (
                    <Link to={data?.excelFile}>
                      <ImageBox>
                        <Image alt="ExcelIcon" src={ExcelIcon} />
                      </ImageBox>
                    </Link>
                  )}
                  {data?.pdfFile && (
                    <Link to={data?.pdfFile}>
                      <ImageBox>
                        <Image alt="PDFIcon" src={PDFIcon} />
                      </ImageBox>
                    </Link>
                  )}
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Wrapper>
    </div>
  );
};

export default ClientDetailTable;

const Wrapper = styled.div`
  display: flex;
  width: 70%;
  margin-bottom: 24px;
  justify-content: space-between;
`;

const ImageBox = styled.div`
  width: 120px;
  align-items: center;
  display: flex;
  justify-content: center;
`;
const Image = styled.img`
  width: 40px;
`;
