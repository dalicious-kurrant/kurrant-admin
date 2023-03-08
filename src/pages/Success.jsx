import {orderApis} from 'api/order';
import {successApi} from 'api/success';
import axios from 'axios';
import React, {useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import instanceOrder from 'shared/axiosSuccess';
import {PageWrapper} from '../style/common.style';

const Success = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const req = {
      paymentKey: searchParams.get('paymentKey'),
      orderId: searchParams.get('orderId'),
      amount: Number(searchParams.get('amount')),
      orderItems: searchParams.get('orderItems'),
    };
    const callOrder = async () => {
      // alert(JSON.stringify(req));
      try {
        const res = await instanceOrder.post('/users/me/orders', req, {
          headers: {Authorization: 'Bearer ' + token},
        });
        // const res = await successApi.orderSuccess(req);
        window.ReactNativeWebView.postMessage(
          JSON.stringify({...res, type: 'NOMAL'}),
        );
      } catch (e) {
        alert('error:' + e.toString());
      }
    };
    try {
      callOrder();
    } catch (e) {
      alert('error:' + e.toString());
    }
  }, [searchParams]);
  return <PageWrapper>결제 승인중...</PageWrapper>;
};

export default Success;
