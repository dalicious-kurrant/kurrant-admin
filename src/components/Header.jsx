import React from 'react';
import {useNavigate} from 'react-router-dom';
import {MenuList} from '../router/menu';
import {Segment, Menu, Dropdown} from 'semantic-ui-react';
import {H} from '../style/header.style';
import styled from 'styled-components';
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

const Header = () => {
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
  const resetAtom11 = useResetAtom(CustomerDataAtom);
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
    resetAtom11();
    resetAtom12();
    resetAtom13();
    resetAtom14();
    resetAtom15();
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
                      resetJotai();
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
