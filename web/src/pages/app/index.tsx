import {
  getAccessToken,
  getSession,
  useUser,
  withPageAuthRequired,
} from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'

export default function Home() {
  const user = useUser()

  return (
    <div>
      <h1>Hello world</h1>
      <p>{JSON.stringify(user, null, 2)}</p>
    </div>
  )
}

/*
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res)

  const token = await getAccessToken(req, res)

  console.log(token)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
*/

export const getServerSideProps = withPageAuthRequired()
