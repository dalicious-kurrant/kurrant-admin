import React from 'react';
import {useNavigate} from 'react-router-dom';
import {MenuList} from '../router/menu';
import {Segment, Menu, Dropdown} from 'semantic-ui-react';
import {H} from '../style/header.style';

const Header = () => {
  const navi = useNavigate();

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
                    onClick={() => navi(`${v.url}${b.url}`)}>
                    {b.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ))}
        </Menu>
      </Segment>
    </H.Wrapper>
  );
};

export default Header;
