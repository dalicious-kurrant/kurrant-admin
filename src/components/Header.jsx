import React from 'react';
import {useNavigate} from 'react-router-dom';
import {MenuList} from '../router/menu';
import {Segment, Menu, Dropdown} from 'semantic-ui-react';
import {H} from '../style/header.style';
import styled from 'styled-components';

const Header = () => {
  const navi = useNavigate();
  const logOutButton = () => {
    localStorage.removeItem('token');
    window.location.replace('/');
  };

  return (
    <H.Wrapper>
      <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item active onClick={() => navi('/main')} icon="home" />
          {MenuList.map(v => (
            <Dropdown key={`${v.name}`} item text={v.name}>
              <Dropdown.Menu>
                {v.children?.map(b => (
                  <Dropdown.Item
                    key={`${b.name}`}
                    onClick={() => {
                      navi(`${v.url}${b.url}`);
                    }}>
                    {b.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ))}
        </Menu>
      </Segment>
      <Logout onClick={logOutButton}>로그아웃</Logout>
    </H.Wrapper>
  );
};

export default Header;

const Logout = styled.div`
  position: absolute;
  right: 24px;
  top: 45%;
  color: white;
  cursor: pointer;
`;
