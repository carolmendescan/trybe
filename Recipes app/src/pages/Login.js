import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

function Login() {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const { email, setEmail } = useContext(LoginContext);

  function validateEmail() {
    const min = 6;
    const validationEmail = /\S+@\S+\.\S+/;
    return !(validationEmail.test(email) && password.length > min);
  }

  function saveEmail(emailUser) {
    localStorage.setItem('user', JSON.stringify({ email: emailUser }));
  }

  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        saveEmail(email);
        history.push('/meals');
      } }
      className="w-full bg-slate-50 h-screen flex justify-center items-center"
    >
      <div
        className="
      hidden
      md:block
      md:w-1/2
      md:h-screen
      bg-[url(https://conteudo.imguol.com.br/c/entretenimento/75/2019/12/02/cozinhar-1575318605600_v2_4x3.jpg)]
      bg-cover
      bg-center
      bg-no-repeat
      "
      />
      <div className="flex flex-col items-center w-full md:w-1/2 gap-3">
        <div
          className="
          w-11/12
          max-w-xs
          md:max-w-sm
          mb-10"
        >
          <p className="text-xl">
            Let
            {'\''}
            s cook!
          </p>
          <p className="text-3xl font-bold">
            Login to your account
          </p>
        </div>
        <input
          data-testid="email-input"
          type="email"
          placeholder="E-mail"
          name="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          className="
          h-12
          max-w-xs
          md:max-w-sm
          border
          shadow-sm
          border-gray-200
          w-11/12
          md:h-14
          rounded-md
          pl-2"
        />

        <input
          data-testid="password-input"
          type="password"
          placeholder="Password"
          name="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          className="
          h-12
          max-w-xs
          w-11/12
          shadow-sm
          md:max-w-sm
          border
          border-gray-200
          md:h-14
          rounded-md pl-2"
        />

        <button
          disabled={ validateEmail() }
          data-testid="login-submit-btn"
          type="submit"
          className="
          bg-green-500
          max-w-xs
          mt-3
          md:max-w-sm
          h-12
          w-11/12
          md:h-14
          rounded-md
          text-white
          shadow-sm
          font-semibold"
        >
          Login Now
        </button>
      </div>

    </form>
  );
}

export default Login;
