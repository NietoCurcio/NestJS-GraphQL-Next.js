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
  const domainName = process.env.NEXT_PUBLIC_COGNITO_DOMAIN_NAME;
  const region = process.env.NEXT_PUBLIC_REGION;

  const url = `https://${domainName}.auth.${region}.amazoncognito.com/oauth2/token`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody.join('&'),
  });

  const { access_token } = await response.json();

  const ctx = { req, res };

  setCookie(ctx, 'cognito.accessToken', access_token, { path: '/' });

  res.redirect(301, 'http://localhost:3000/');
}
