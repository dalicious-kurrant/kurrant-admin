import React, {useState} from 'react';

import styled from 'styled-components';

const Pages = ({list, stopEvent}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const filtered = list.filter(itemList => {
    return itemList.text.includes(searchTerm);
  });
  console.log(searchTerm);
  return (
    <Wrap>
      <Container>
        <input onChange={handleChange} onClick={stopEvent} type="text" />
      </Container>

      {searchTerm !== '' &&
        filtered.map(el => {
          return (
            <Resultdiv key={el}>
              <div>
                {el.text.includes(searchTerm) ? (
                  <ApartName>
                    {el.text.split(searchTerm)[0]}
                    <SearchText>{searchTerm}</SearchText>
                    {el.text.split(searchTerm)[1]}
                  </ApartName>
                ) : (
                  <ApartName>{el.text}</ApartName>
                )}
              </div>
            </Resultdiv>
          );
        })}
    </Wrap>
  );
};

export default Pages;

const Wrap = styled.div`
  background-color: ${({theme}) => theme.colors.grey[0]};
  flex: 1;
`;

const Container = styled.div`
  margin: 0px 24px;
  margin-top: 72px;
  position: relative;
`;

const Resultdiv = styled.div`
  margin: 8px 28px 8px 56px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ApartName = styled.span`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const ApartAddress = styled.span`
  color: ${({theme}) => theme.colors.grey[5]};
`;

const SearchText = styled.span`
  color: ${({theme}) => theme.colors.blue[500]};
`;
