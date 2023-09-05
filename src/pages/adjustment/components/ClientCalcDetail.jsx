import {useLocation} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import {PageWrapper} from 'style/common.style';
import {useState} from 'react';
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

