import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

import styled from 'styled-components';
import {checkMobile} from 'utils/checkMobile';
const GOOGLE_PLAY_STORE_LINK2 = 'market://details?id=com.dalicious.kurrant';
// 구글 플레이 스토어가 설치되어 있지 않을 때 웹 링크
const GOOGLE_PLAY_STORE_LINK =
  'https://play.google.com/store/apps/details?id=com.dalicious.kurrant';
// 애플 앱 스토어 링크
const APPLE_APP_STORE_LINK = 'itms-apps://itunes.apple.com/us/app/id1663407738';
// 애플 앱 스토어가 설치되어 있지 않을 때 웹 링크
const APPLE_APP_STORE_WEB_LINK = 'https://apps.apple.com/us/app/id1663407738';
const Download = () => {
  useEffect(() => {
    window.addEventListener(
      'load',
      function () {
        setTimeout(() => window.scrollTo(0, 200), 1);
        setTimeout(() => window.scrollTo(0, 1), 100);
      },
      false,
    );
  }, []);
  return (
    <Container>
      <ImageContainer>
        <ImageTag src={require('../assets/img/1.png')} />
        <ButtonContainer>
          <LinkYelButton
            type="button"
            onClick={() => {
              const mobileType = checkMobile();
              console.log(mobileType);
              if (mobileType === 'ios') {
                window.open(APPLE_APP_STORE_LINK);
              } else if (mobileType === 'android') {
                window.open(GOOGLE_PLAY_STORE_LINK);
              }
            }}>
            좋으면 다운로드
          </LinkYelButton>
        </ButtonContainer>
      </ImageContainer>
      <ImageContainer>
        <ImageTag src={require('../assets/img/2.png')} />
        <ButtonContainer>
          <LinkButton
            type="button"
            onClick={() => {
              const mobileType = checkMobile();
              console.log(mobileType);
              if (mobileType === 'ios') {
                window.open(APPLE_APP_STORE_LINK);
              } else if (mobileType === 'android') {
                window.open(GOOGLE_PLAY_STORE_LINK);
              }
            }}>
            싼 도시락 먹고싶다!
          </LinkButton>
        </ButtonContainer>
      </ImageContainer>
      <ImageContainer>
        <ImageTag src={require('../assets/img/3.png')} />
        <ButtonContainer>
          <LinkButton
            type="button"
            onClick={() => {
              const mobileType = checkMobile();
              console.log(mobileType);
              if (mobileType === 'ios') {
                window.open(APPLE_APP_STORE_LINK);
              } else if (mobileType === 'android') {
                window.open(GOOGLE_PLAY_STORE_LINK);
              }
            }}>
            멤버십 가입하러 가기
          </LinkButton>
        </ButtonContainer>
      </ImageContainer>
      <ImageContainer>
        <ImageTag src={require('../assets/img/4.png')} />
        <ButtonContainer>
          <LinkButton
            type="button"
            onClick={() => {
              const mobileType = checkMobile();
              console.log(mobileType);
              if (mobileType === 'ios') {
                window.open(APPLE_APP_STORE_LINK);
              } else if (mobileType === 'android') {
                window.open(GOOGLE_PLAY_STORE_LINK);
              }
            }}>
            사무실로 주문하기
          </LinkButton>
        </ButtonContainer>
      </ImageContainer>
      <ImageContainer>
        <ImageTag src={require('../assets/img/5.png')} />
        <ButtonContainer>
          <LinkButton
            type="button"
            onClick={() => {
              const mobileType = checkMobile();
              console.log(mobileType);
              if (mobileType === 'ios') {
                window.open(APPLE_APP_STORE_LINK);
              } else if (mobileType === 'android') {
                window.open(GOOGLE_PLAY_STORE_LINK);
              }
            }}>
            한끼 뚝딱 하러!
          </LinkButton>
        </ButtonContainer>
      </ImageContainer>
    </Container>
  );
};

export default Download;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`;

const ImageTag = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 55px;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  bottom: 90px;
`;

const LinkYelButton = styled.button`
  align-self: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-radius: 50px;
  text-align: center;
  background-color: #fdc800;
  justify-self: center;
`;
const LinkButton = styled.button`
  align-self: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-radius: 50px;
  color: white;
  text-align: center;
  background-color: #000046;
  justify-self: center;
`;
