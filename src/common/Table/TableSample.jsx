import styled from 'styled-components';

const TableStudy = () => {
  return (
    <Container>
      <table border={1}>
        <thead>
          <tr>
            <th>헤더1</th>
            <th>헤더2</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>값11</td>
            <td>값12</td>
          </tr>
          <tr>
            <td>값21</td>
            <td>값22</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default TableStudy;

const Container = styled.div`
  margin-top: 4rem;
`;
