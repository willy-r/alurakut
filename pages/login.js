import { useState } from 'react';
import { useRouter } from 'next/router';

import { setCookie } from 'nookies';


export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = useState('');

  function doLogin(event) {
    event.preventDefault();

    fetch('https://alurakut.vercel.app/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ githubUser }),
    })
      .then(async (response) => {
        const { token } = await response.json();
        
        setCookie(null, 'USER_TOKEN', token, {
          path: '/', // A partir de onde o cookie pode ser acessado, nesse caso na homepage.
          maxAge: 86400 * 7, // 1 semana.
        });

        router.push('/');
      });
  }

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="login-screen">
        <section className="logo-area">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="form-area">
          <form className="box" action="" onSubmit={doLogin}>
            <legend>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </legend>
            <input
              type="text"
              name="github-username"
              value={githubUser}
              placeholder="Usuário"
              aria-label="Usuário"
              required
              onChange={(event) => setGithubUser(event.target.value)}
            />
            <button type="submit">
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              <a href="https://github.com/join" target="_blank" rel="noopener noreferrer external">Ainda não é membro?</a> <br />
              <a href="/login">
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footer-area">
          <p>
            <a href="http://willy-r.github.io/portfolio-feliz/" target="_blank" rel="noopener noreferrer external">William Rodrigues</a> &copy; {new Date().getFullYear()} <br />
            <a href="https://github.com/willy-r/alurakut#alurakut" target="_blank" rel="noopener noreferrer external">Sobre o Alurakut</a> - <a href="http://willy-r.github.io/portfolio-feliz/#contacts" target="_blank" rel="noopener noreferrer external">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
