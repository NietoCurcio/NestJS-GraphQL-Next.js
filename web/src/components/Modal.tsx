import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

interface ModalProps {
  handleCloseModal: () => void;
  isModalOpen: boolean;
}

export function Modal({ handleCloseModal, isModalOpen }: ModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, setLoading } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

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
                    <div className="mb-6">
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
