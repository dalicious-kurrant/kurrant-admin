import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import ExcelIcon from '../../../asset/icons/excel.svg';
import PDFIcon from '../../../asset/icons/pdfIcon.svg';
import {Link} from 'react-router-dom';

const MakersDetailTable = ({data}) => {
  return (
    <div>
      <Wrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">년도</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">월</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">메이커스</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
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
                {data?.makers}
              </Table.Cell>
              <Table.Cell
                textAlign="center"
                style={{borderBottom: '1px solid rgba(34,36,38,.1)'}}>
                {data?.status}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">예금주</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">은행명</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">계좌번호</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">엑셀/PDF</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign="center">{data?.depositHolder}</Table.Cell>
              <Table.Cell textAlign="center">{data?.bankName}</Table.Cell>
              <Table.Cell textAlign="center">{data?.bankAccount}</Table.Cell>

              <Table.Cell>
                <div style={{display: 'flex', justifyContent: 'center'}}>
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

export default MakersDetailTable;

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
