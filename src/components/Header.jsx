import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {MenuList} from '../router/menu';
import {Segment, Menu, Dropdown} from 'semantic-ui-react';
import {H} from '../style/header.style';
import styled, {css} from 'styled-components';
import {useResetAtom} from 'jotai/utils';
import {
  exelCorporationAtom,
  exelPlanAtom,
  exelProductAtom,
  exelSpotAtom,
  exelUserAtom,
  makersExelInfoAtom,
  planAtom,
  productAtom,
  productDataAtom,
  recommandPlanAtom,
  shopInfoDetailIdAtom,
  spotAtom,
} from 'utils/store';
import {CustomerDataAtom} from 'pages/customer/Customer/store';
import {SpotInfoDataAtom} from 'pages/customer/SpotInfo/store';
import {
  dataHasNoIdAtom,
  TableCheckboxStatusAtom,
  TableDeleteListAtom,
} from 'common/Table/store';

const Header = ({openMenu, setOpenMenu}) => {
  const navi = useNavigate();
  const resetAtom = useResetAtom(planAtom);
  const resetAtom1 = useResetAtom(productAtom);
  const resetAtom2 = useResetAtom(recommandPlanAtom);
  const resetAtom3 = useResetAtom(spotAtom);
  const resetAtom4 = useResetAtom(shopInfoDetailIdAtom);
  const resetAtom5 = useResetAtom(productDataAtom);
  const resetAtom6 = useResetAtom(CustomerDataAtom);
  const resetAtom7 = useResetAtom(SpotInfoDataAtom);

  const resetAtom8 = useResetAtom(TableCheckboxStatusAtom);
  const resetAtom9 = useResetAtom(TableDeleteListAtom);
  const resetAtom10 = useResetAtom(dataHasNoIdAtom);
  const resetAtom12 = useResetAtom(SpotInfoDataAtom);
  const resetAtom13 = useResetAtom(exelUserAtom);

  const resetAtom14 = useResetAtom(makersExelInfoAtom);
  const resetAtom15 = useResetAtom(exelCorporationAtom);

  const logOutButton = () => {
    localStorage.removeItem('token');
    window.location.replace('/');
  };
  const resetJotai = () => {
    resetAtom();
    resetAtom1();
    resetAtom2();
    resetAtom3();
    resetAtom4();
    resetAtom5();
    resetAtom6();
    resetAtom7();
    resetAtom8();
    resetAtom9();
    resetAtom10();
    resetAtom12();
    resetAtom13();
    resetAtom14();
    resetAtom15();
  };
  return (
    <H.Wrapper>
      <Segment>
        <MenuContainer openMenu={openMenu}>
          <Menu secondary>
            <MenuLogout>
              <MenuBox>
                <Menu.Item active onClick={() => navi('/main')} icon="home" />
                {MenuList.map((v, i) => (
                  <DropDownMenu
                    key={`${v.name}`}
                    item
                    text={v.name}
                    name={i}
                    openOnFocus={false}
                    onOpen={(e, data) => {
                      console.log(data);
                    }}
                    open={openMenu}
                    onClick={e => {
                      e.preventDefault();
                      setOpenMenu(!openMenu);
                    }}>
                    <Dropdown.Menu style={{border: 'none', boxShadow: 'none'}}>
                      {v.children?.map(b => (
                        <Dropdown.Item
                          key={`${b.name}`}
                          onClick={() => {
                            resetJotai();
                            setOpenMenu(!openMenu);
                            navi(`${v.url}${b.url}`);
                          }}>
                          {b.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </DropDownMenu>
                ))}
              </MenuBox>
              <Logout onClick={logOutButton}>로그아웃</Logout>
            </MenuLogout>
          </Menu>
        </MenuContainer>
      </Segment>
    </H.Wrapper>
  );
};

export default Header;

const Logout = styled.div`
  display: flex;
  align-self: center;
  text-align: end;
  color: black;
  white-space: nowrap;
  cursor: pointer;
`;

const DropDownMenu = styled(Dropdown)`
  .text {
    color: ${({name}) =>
      name === 4 || name === 5 || name === 6 ? 'red' : 'black'};
  }
  width: 200px;
  :hover {
  }
`;
const MenuContainer = styled.div`
  display: flex;
  ${({openMenu}) => {
    if (openMenu)
      return css`
        height: 340px;
      `;
  }}
  align-items: flex-start;
  text-align: start;
  background-color: white;
`;

const MenuBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MenuLogout = styled.div`
  display: flex;
  width: 97vw;

  justify-content: space-between;
`;
