import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestData = {
    code: req.query.code,
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_CLIENTID,
    redirect_uri: 'http://localhost:3000/api/callback/',
  };

  const formBody = [];

  for (let property in requestData) {
    formBody.push(
      `${encodeURIComponent(property)}=${encodeURIComponent(
        requestData[property]
      )}`
    );
  }

  const response = await fetch(
    'https://my-domain-ignite-lab-01.auth.us-east-1.amazoncognito.com/oauth2/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody.join('&'),
    }
  );

  ('cognito.accessToken');

  const { access_token } = await response.json();

  const ctx = { req, res };

  setCookie(ctx, 'cognito.accessToken', access_token, { path: '/' });

  res.redirect(301, 'http://localhost:3000/');
}
