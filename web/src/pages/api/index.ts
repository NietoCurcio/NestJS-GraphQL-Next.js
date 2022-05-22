import httpProxyMiddleware from 'next-http-proxy-middleware';
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';

export const config = {
  api: {
    bodyParser: false,
  },
};

// make a proxy to pass the jwt token in the headers
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ctx = { req, res };
  const cookies = parseCookies(ctx);
  const { 'cognito.accessToken': accessToken } = cookies;

  return httpProxyMiddleware(req, res, {
    target: 'http://localhost:3332/graphql',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
