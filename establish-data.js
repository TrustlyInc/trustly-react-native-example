/**
 * @format
 * @flow strict
 */

import type { EstablishData } from './flow-typed/establish-data';

import {
  ACCESS_ID,
  ENV,
  ENV_HOST,
  MERCHANT_ID,
  MERCHANT_REFERENCE,
} from './env';

const establishData: EstablishData = {
  accessId: ACCESS_ID,
  cancelUrl: '#',
  currency: 'USD',
  customer: {
    address: {
      address1: '2000 Broadway St',
      city: 'Redwood City',
      country: 'US',
      state: 'CA',
      zip: '94063',
    },
    enrollDate: 1704067200,
    externalId: '123',
    name: 'John',
  },
  description: 'React Native Example',
  env: ENV,
  envHost: ENV_HOST,
  merchantId: MERCHANT_ID,
  merchantReference: MERCHANT_REFERENCE,
  metadata: {
    lang: 'en',
    urlScheme: '://',
  },
  paymentType: 'Instant',
  requestSignature: '',
  returnUrl: '#',
};

export default establishData;
