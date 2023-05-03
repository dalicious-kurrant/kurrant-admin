import {useMakersAdjustListDetail} from 'hooks/useAdjustment';
import {useLocation} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import {PageWrapper} from 'style/common.style';
import styled from 'styled-components';
import {useState} from 'react';
import MakersDetailTable from './MakersDetailTable';
import Invoice from './Invoice';
import ClientMeal from './ClientMeal';
import ClientDetailTable from './ClientDetailTable';

const ClientCalcDetail = () => {
  const location = useLocation();
  const id = location.state.makersId;
  const groupName = location.state.name;
  const [index, setIndex] = useState(0);

  const tab = [
    {
      id: 0,
      title: '인보이스',
      component: <Invoice groupName={groupName} id={id} />,
    },
    {
      id: 1,
      title: '식수내역',
      component: <ClientMeal id={id} />,
    },
  ];
  return (
    <PageWrapper>
      <ClientDetailTable />
      {tab.map(item => (
        <Button
          key={item.id}
          content={item.title}
          color={index === item.id ? 'facebook' : 'grey'}
          style={{cursor: 'pointer'}}
          onClick={() => setIndex(item.id)}
        />
      ))}
      {tab
        .filter(item => index === item.id)
        .map(el => (
          <div key={el.id}>{el.component}</div>
        ))}
    </PageWrapper>
  );
};

export default ClientCalcDetail;

const Title = styled.div`
  font-weight: 600;
  margin-right: 24px;
`;

const Wrap = styled.div`
  width: 70%;
`;
const Box = styled.div`
  display: flex;
  padding-bottom: 12px;
`;

const BoxWrap = styled.div`
  display: flex;
`;

const Border = styled.div`
  border-bottom: 1px solid ${({theme}) => theme.colors.grey[7]};
  margin: 24px 0px;
`;

const TitleContent = styled.div`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const TotalPriceWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TotalWrap = styled.div``;

const Image = styled.img`
  width: 140px;
`;

const ImageWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Statement = styled.div`
  flex-direction: column;
  justify-content: center;
  display: flex;
`;

const MemoWrap = styled.div`
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  min-height: 100px;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 70%;
`;
