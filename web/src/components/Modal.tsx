import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

interface ModalProps {
  handleCloseModal: () => void;
  isModalOpen: boolean;
}

export function Modal({ handleCloseModal, isModalOpen }: ModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const domainName = process.env.NEXT_PUBLIC_COGNITO_DOMAIN_NAME;
  const region = process.env.NEXT_PUBLIC_REGION;
  const clientId = process.env.NEXT_PUBLIC_CLIENTID;
  const redirect_uri = 'http://localhost:3000/api/callback/';

  const cognitoOAuthLink = `https://${domainName}.auth.${region}.amazoncognito.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirect_uri}`;

  const { signIn, setIsLoading } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    setIsLoading(true);

    signIn({ username, password });

    handleCloseModal();
    setUsername('');
    setPassword('');
  }

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      // onClick={handleCloseModal}
      style={{ display: `${isModalOpen ? 'block' : 'none'}` }}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-teal-200"
                  id="modal-title"
                >
                  Login
                </h3>
                <div className="mt-2">
                  <form
                    className="bg-gray-900 rounded px-8 pt-6 pb-8 mb-4"
                    onSubmit={handleLogin}
                  >
                    <div className="mb-4">
                      <label
                        className="block text-white text-sm font-bold mb-2"
                        htmlFor="username"
                      >
                        Username
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-white text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                    <div className="text-white mb-4 mt-1">
                      <a
                        href={cognitoOAuthLink}
                        onClick={() => setIsLoading(true)}
                        className="flex gap-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded w-auto"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          {' '}
                          <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                            {' '}
                            <path
                              fill="#4285F4"
                              d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                            />{' '}
                            <path
                              fill="#34A853"
                              d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                            />{' '}
                            <path
                              fill="#FBBC05"
                              d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                            />{' '}
                            <path
                              fill="#EA4335"
                              d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                            />{' '}
                          </g>{' '}
                        </svg>{' '}
                        <p>Login with Google</p>
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
