import {useEffect, useRef, useState} from 'react';
import {Button} from 'semantic-ui-react';
import styled from 'styled-components';
import AutoNotificationTable from './components/AutoNotificationTable';
import AddManualNotificationTable from './components/AddManualNotificationTable';
import ManualNotificationTable from './components/ManualNotificationTable';

const Notification = () => {
  const [page, setPage] = useState(true);
  return (
    <Conotainer>
      <TabContainer>
        <Button
          color={page ? 'linkedin' : 'grey'}
          size="large"
          onClick={() => setPage(true)}>
          자동 푸시 알림
        </Button>
        <Button
          color={page ? 'grey' : 'linkedin'}
          size="large"
          onClick={() => setPage(false)}>
          수동 푸시 알림
        </Button>
      </TabContainer>
      <ContentsContainer>
        {page ? (
          <AutoNotificationTable />
        ) : (
          <TableConatiner>
            <AddManualNotificationTable />
            <ManualNotificationTable />
          </TableConatiner>
        )}
      </ContentsContainer>
    </Conotainer>
  );
};

export default Notification;

const Conotainer = styled.div``;
const ContentsContainer = styled.div`
  padding-left: 50px;
  padding-right: 50px;
`;
const TabContainer = styled.div`
  display: flex;
  gap: 30px;
  padding: 40px;
`;

const TableConatiner = styled.div`
  display: flex;
  flex-direction: column;
`;
