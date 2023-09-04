import React from 'react';
import {useNavigate} from 'react-router-dom';
import {MenuList} from '../router/menu';
import {Segment, Menu, Dropdown} from 'semantic-ui-react';
import {H} from '../style/header.style';
import styled, {css} from 'styled-components';
import {useResetAtom} from 'jotai/utils';
import {
  exelCorporationAtom,
  exelUserAtom,
  makersExelInfoAtom,
  planAtom,
  productAtom,
  productDataAtom,
  recommandPlanAtom,
  shopInfoDetailIdAtom,
  spotAtom,
  productPageAtom,
  extraOrderGroupOptionAtom,
  startMonthAtom,
  endMonthAtom,
  selectClientAtom,
  selectStatusAtom,
  selectModifyAtom,
  startMonthClientAtom,
  endMonthClientAtom,
  selectClientClientAtom,
  selectStatusClientAtom,
  corpDataAtom,
  noticeTypeFilterAtom,
  noticeStatusFilterAtom,
  noticeSpotFilterAtom,
  noticePushFilterAtom,
  noticePageAtom,
  noticeCompanyTypeFilterAtom,
  noticeCompanyStatusFilterAtom,
  noticeCompanySpotFilterAtom,
  noticeCompanyPushFilterAtom,
  noticeCompanyPageAtom,
  noticeMakersTypeFilterAtom,
  noticeMakersStatusFilterAtom,
  noticeMakersFilterAtom,
  noticeMakersPushFilterAtom,
  noticeMakersPageAtom,
  checkValueAtom,
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
  const resetAtom16 = useResetAtom(productPageAtom);
  const resetAtom17 = useResetAtom(extraOrderGroupOptionAtom);

  const resetAtom18 = useResetAtom(startMonthAtom);
  const resetAtom19 = useResetAtom(endMonthAtom);
  const resetAtom20 = useResetAtom(selectClientAtom);
  const resetAtom21 = useResetAtom(selectStatusAtom);
  const resetAtom22 = useResetAtom(selectModifyAtom);

  const resetAtom23 = useResetAtom(startMonthClientAtom);
  const resetAtom24 = useResetAtom(endMonthClientAtom);
  const resetAtom25 = useResetAtom(selectClientClientAtom);
  const resetAtom26 = useResetAtom(selectStatusClientAtom);
  const resetAtom27 = useResetAtom(corpDataAtom);

  const resetAtom28 = useResetAtom(noticeTypeFilterAtom);
  const resetAtom29 = useResetAtom(noticeStatusFilterAtom);
  const resetAtom30 = useResetAtom(noticeSpotFilterAtom);
  const resetAtom31 = useResetAtom(noticePushFilterAtom);
  const resetAtom32 = useResetAtom(noticePageAtom);

  const resetAtom33 = useResetAtom(noticeCompanyTypeFilterAtom);
  const resetAtom34 = useResetAtom(noticeCompanyStatusFilterAtom);
  const resetAtom35 = useResetAtom(noticeCompanySpotFilterAtom);
  const resetAtom36 = useResetAtom(noticeCompanyPushFilterAtom);
  const resetAtom37 = useResetAtom(noticeCompanyPageAtom);

  const resetAtom38 = useResetAtom(noticeMakersTypeFilterAtom);
  const resetAtom39 = useResetAtom(noticeMakersStatusFilterAtom);
  const resetAtom40 = useResetAtom(noticeMakersFilterAtom);
  const resetAtom41 = useResetAtom(noticeMakersPushFilterAtom);
  const resetAtom42 = useResetAtom(noticeMakersPageAtom);
  const resetAtom43 = useResetAtom(checkValueAtom);

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
    resetAtom16();
    resetAtom17();
    resetAtom18();
    resetAtom19();
    resetAtom20();
    resetAtom21();
    resetAtom22();
    resetAtom23();
    resetAtom24();
    resetAtom25();
    resetAtom26();
    resetAtom27();
    resetAtom28();
    resetAtom29();
    resetAtom30();
    resetAtom31();
    resetAtom32();
    resetAtom33();
    resetAtom34();
    resetAtom35();
    resetAtom36();
    resetAtom37();
    resetAtom38();
    resetAtom39();
    resetAtom40();
    resetAtom41();
    resetAtom42();
    resetAtom43();
  };
  return (
    <H.Wrapper>
      <Segment inverted>
        <MenuContainer openMenu={openMenu}>
          <Menu secondary inverted>
            <MenuLogout>
              <MenuBox inverted>
                <Menu.Item active onClick={() => navi('/main')} icon="home" />
                {MenuList.map((v, i) => {
                  return (
                    <DropDownMenu
                      style={{
                        backgroundColor: '#1b1c1d',
                        color: '#fff',
                        fontSize: 15,
                        fontWeight: 700,
                      }}
                      key={`${v.name}`}
                      item
                      text={
                        v.name?.includes('(진행중)')
                          ? v.name?.replace('(진행중)', '')
                          : v.name
                      }
                      icon={null}
                      isready={v.name?.includes('(진행중)').toString()}
                      openOnFocus={false}
                      open={openMenu}
                      onClick={e => {
                        e.preventDefault();
                        setOpenMenu(!openMenu);
                      }}>
                      <Dropdown.Menu
                        style={{
                          borderLeft: '1px solid white',
                          boxShadow: 'none',
                          fontSize: 12,
                          maxWidth: 150,
                          whiteSpace: 'pre-wrap',
                          backgroundColor: '#1b1c1d',
                          color: '#fff',
                        }}>
                        {v.children?.map(b => (
                          <Dropdown.Item
                            key={`${b.name}`}
                            onClick={() => {
                              resetJotai();
                              setOpenMenu(!openMenu);
                              navi(`${v.url}${b.url}`);
                            }}>
                            <FontBox isReady={b.name?.includes('(진행중)')}>
                              {b.name?.includes('(진행중)')
                                ? b.name?.replace('(진행중)', '')
                                : b.name}
                            </FontBox>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </DropDownMenu>
                  );
                })}
              </MenuBox>
              <Log onClick={() => navi('/backlog')}>로그</Log>
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
  white-space: nowrap;
  cursor: pointer;
  color: #ccc;
`;
const Log = styled.div`
  display: flex;
  align-self: center;
  text-align: end;
  white-space: nowrap;
  cursor: pointer;
  font-weight: 600;
  color: #fff;
`;
const FontBox = styled.div`
  color: ${({isReady}) => (isReady ? '#ff3333' : '#ccc')};
  white-space: nowrap;
`;
const DropDownMenu = styled(Dropdown)`
  .text {
    color: ${({isready}) => (isready === 'true' ? '#ff3333' : '#ccc')};
  }
  min-width: 130px;
  white-space: nowrap;

  background-color: #1b1c1d;
  :hover {
    background-color: #ccc;
  }
`;
const MenuContainer = styled.div`
  display: flex;
  ${({openMenu}) => {
    if (openMenu)
      return css`
        min-height: 320px;
      `;
  }}
  align-items: flex-start;
  text-align: start;
  background-color: #1b1c1d;

  overflow-x: auto;
`;

const MenuBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #1b1c1d;
`;
const MenuLogout = styled.div`
  display: flex;
  width: 97vw;
  background-color: #1b1c1d;
  justify-content: space-between;
`;
