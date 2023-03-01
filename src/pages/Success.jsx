import {orderApis} from 'api/order';
import {successApi} from 'api/success';
import axios from 'axios';
import React, {useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {PageWrapper} from '../style/common.style';

const Success = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const req = {
      paymentKey: searchParams.get('paymentKey'),
      orderId: searchParams.get('orderId'),
      amount: Number(searchParams.get('amount')),
      orderItems: JSON.parse(searchParams.get('orderItems')),
    };
    const callOrder = async () => {
      const res = await axios.post('/users/me/orders', {
        ...req,
      });
      // const res = await successApi.orderSuccess(req);
      window.ReactNativeWebView.postMessage(
        JSON.stringify({...res, type: 'NOMAL'}),
      );
    };
    try {
      callOrder();
    } catch ({request, status, error}) {
      alert(
        'code:' +
          status +
          '\n' +
          'message:' +
          JSON.stringify(request) +
          '\n' +
          'error:' +
          error,
      );
    }
  }, [searchParams]);
  return <PageWrapper>결제 승인중...</PageWrapper>;
};

export default Success;
