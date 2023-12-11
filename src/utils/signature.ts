import { EstablishData } from "../types";

const SIGNATURE_API_URL = "http://localhost:8080/signature";

export async function getRequestSignature(establishData: EstablishData) {
  let requestSignature;

  await fetch(SIGNATURE_API_URL, {
    method: 'POST',
    body: JSON.stringify(establishData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => {
      if (!data.ok) throw new Error();

      requestSignature = data.json();
    })
    .catch(() => {
      console.error('Error: Failed signing your request');
    });

  return requestSignature;
}

const signature = {
  getRequestSignature,
};

export default signature;