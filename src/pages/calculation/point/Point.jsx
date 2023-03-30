import {useState} from 'react';
import {Label} from 'semantic-ui-react';
import {PageWrapper} from 'style/common.style';
import styled from 'styled-components';
import EventPoint from './components/EventPoint';
import ReviewPoint from './components/ReviewPoint';

const Point = () => {
  const [index, setIndex] = useState(0);

  const data = [
    {
      id: 0,
      title: '리뷰 포인트',
      component: <ReviewPoint />,
    },

    {
      id: 1,
      title: '이벤트 포인트',
      component: <EventPoint />,
    },
  ];
  return (
    <PageWrapper>
      <LabelWrap>
        {data.map(item => (
          <Label
            key={item.id}
            content={item.title}
            color={index === item.id ? 'blue' : 'grey'}
            size="large"
            style={{cursor: 'pointer'}}
            onClick={() => setIndex(item.id)}
          />
        ))}
        {data
          .filter(item => index === item.id)
          .map(el => (
            <div key={el.id}>{el.component}</div>
          ))}
      </LabelWrap>
    </PageWrapper>
  );
};

export default Point;

const LabelWrap = styled.div`
  margin-top: 24px;
`;
