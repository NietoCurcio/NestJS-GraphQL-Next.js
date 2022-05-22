import { getAccessToken } from '@auth0/nextjs-auth0';
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
  // const { accessToken } = await getAccessToken(req, res)
  const accessToken =
    'eyJraWQiOiI2Q2ZZYWxQMFZuM0tQcDg0VkhkN3U5VHF4NkhwZmxoV1ZVd041T3Y4TDUwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1MmE0NmE0ZS0wYzk1LTQ1MjQtODJhOS0zNWQ3YjJmNGVhZmIiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9ZWTlHS3lwbnciLCJjbGllbnRfaWQiOiI3ZGhuZTViOHU1ZXZhanE1YW45OXJwODNvNSIsIm9yaWdpbl9qdGkiOiJkZDQ1NTQyZS05MGE0LTQwODItYWYzMi1lMTgyMTViMjNjMWMiLCJldmVudF9pZCI6ImIzOTE1ZjJlLWJjNDUtNGNkMC04MTk0LTk3YzM5ZmFkZGExNyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NTMxODA3NTAsImV4cCI6MTY1MzE4NDM0OSwiaWF0IjoxNjUzMTgwNzUwLCJqdGkiOiIxZGM5YWMyOC02NzgyLTQ4NjgtYTk5Zi1hMzkxYmY5OWFlOTEiLCJ1c2VybmFtZSI6InVzZXJuYW1lIn0.Ni-1vRU_K-RsdG-3uozp9f9llD1hUYeC1Q3Y3ikaz8IrYt1Ei5SoFgBfxSULmE7i2c-Pss09lrk_X0KI3fmkot65PtNQCdqi4r6TWhGmt1lqUotDjrVZU0BkgYkvuYu77bX5Gv4vy9ADZTbyTwmStEmTcxArL6TOnVEsefWvbn857ScCR8SbXtKN_4YliZucSEzP0a1Qwg6aM2U1X3cTgeUaGIGUlBglOL4wNRNEouNWww1WQGjTT8x5sqX79Qx9kZXcOjuPy5sjsLB-Juwx54dnLs_EISv9zL-cMOUkeVzLNc6lt9eYY2in-HAJSJEKMFuNtWJYrMPK5Uf_uhBT5A';

  console.log('POTROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
  console.log(req.headers);
  console.log(parseCookies());

  return httpProxyMiddleware(req, res, {
    target: 'http://localhost:3332/graphql',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
