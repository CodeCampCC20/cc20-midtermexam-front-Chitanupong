import { useState } from 'react'
import { useNavigate } from 'react-router';
import authApi from "../api/authApi";


function LoginPage() {
  const intialInput = {
    username: '',
    password: ''
  }
  const [username, setUsername] = useState(intialInput);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setUsername({ ...username, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.login(username);
      console.log('res', res.data);
      navigate('/TodoPage/');
    }
    catch (err) {
      console.log(err)
    }

  }


  return (
    <div className='bg-gray-900 flex items-center justify-center min-h-screen'>
      <div className='flex justify-center m-10'>
        <div className=' bg-gray-800 p-8 rounded-lg shadow-lg w-96'>
          <h1 className='text-white text-3xl font-bold mb-6'>Welcome</h1>
          <form onSubmit={handleSubmit}>

            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <div className='flex justify-center'>
              <input
                name='username'
                type='username'
                required
                placeholder="Username"
                value={username.username}
                minLength="4"
                maxLength="12"
                title="Only letters, numbers or dash"
                onChange={handleOnChange} />&nbsp;
                </div>
            </label>
            <p className="validator-hint">
              Must be 4 to 12 characters
            </p>
            <div>
              <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                    ></path>
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  </g>
                </svg>
                <input
                  name='password'
                  type="password"
                  required
                  placeholder="Password"
                  value={username.password}
                  minLength="8"
                  pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  onChange={handleOnChange} />&nbsp;
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including

              </p>
            </div>
            <br />
            <button type="submit" className="w-full py-3 bg-gray-700 text-white font-semibold rounded hover:bg-gray-600 transition duration-200">LOG IN</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

