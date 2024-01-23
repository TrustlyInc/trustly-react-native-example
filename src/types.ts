export type EstablishData = {
  accessId: string;
  merchantId: string;
  currency: string;
  amount: string;
  merchantReference: string;
  paymentType: string;
  returnUrl: string;
  cancelUrl: string;
  customer: object;
  metadata: object;
  description?: string;
  requestSignature?: string;
} | null;
