import { useState } from 'react';
import styled, { css } from 'styled-components';
import NextLink from 'next/link';


const BASE_URL = 'http://alurakut.vercel.app/';
const v = '1';

function Link({ href, children, ...props }) {
  return (
    <NextLink href={href} passHref>
      <a {...props}>{children}</a>
    </NextLink>
  );
}


// MENU

export function AlurakutMenu({ githubUser }) {
  const [isMenuOpen, setMenuState] = useState(false);
  const menuItems = [
    { name: 'Início', slug: '/'},
    { name: 'Amigos', slug: '/friends'}, 
    { name: 'Comunidades', slug: '/communities'},
  ];

  return (
    <AlurakutMenu.Wrapper isMenuOpen={isMenuOpen}>
      <div className="menu-container">
        <AlurakutMenu.Logo src={`${BASE_URL}/logo.svg`} />

        <nav style={{ flex: 1 }}>
          {menuItems.map((menuItem) => {
            return (
              <Link
                key={`key__${menuItem.name.toLocaleLowerCase()}`}
                href={`${menuItem.slug.toLocaleLowerCase()}`}
              >
                {menuItem.name}
              </Link>
            );
          })}
        </nav>

        <nav>
          <a href="/api/logout">Sair</a>
          <div>
            <input
              type="search"
              placeholder="Pesquisar no Alurakut"
              aria-label="Pesquisar no Alurakut"
            />
          </div>
        </nav>

        <button onClick={() => setMenuState(!isMenuOpen)}>
          {isMenuOpen && <img src={`${BASE_URL}/icons/menu-open.svg?v=${v}`} />}
          {!isMenuOpen && <img src={`${BASE_URL}/icons/menu-closed.svg?v=${v}`} />}
        </button>
      </div>

      <AlurakutMenuProfileSidebar githubUser={githubUser} />
    </AlurakutMenu.Wrapper>
  );
}

function AlurakutMenuProfileSidebar({ githubUser }) {
  return (
    <div className="menu-sidebar">
      <div className="menu-wrapper">
        <img
          src={githubUser.avatar_url}
          alt={`Foto de perfil de ${githubUser.name}`}
          style={{ borderRadius: '8px' }}
        />
        <hr />
        <a className="profile-link" href={githubUser.html_url} target="_blank" rel="noopener noreferrer external">
          {githubUser.name}
        </a>
        <hr />
        <AlurakutProfileSidebarMenuDefault />
      </div>
    </div>
  );
}

export function AlurakutProfileSidebarMenuDefault() {
  return (
    <AlurakutProfileSidebarMenuDefault.Wrapper>
      <nav>
        <a href="/">
          <img src={`${BASE_URL}/icons/user.svg`} />
          Perfil
        </a>
        <a href="/">
          <img src={`${BASE_URL}/icons/book.svg`} />
          Recados
        </a>
        <a href="/">
          <img src={`${BASE_URL}/icons/camera.svg`} />
          Fotos
        </a>
        <a href="/">
          <img src={`${BASE_URL}/icons/sun.svg`} />
          Depoimentos
        </a>
      </nav>
      <hr />
      <nav>
        <a href="https://github.com/trending?since=monthly" target="_blank" rel="noopener noreferrer external">
          <img src={`${BASE_URL}/icons/plus.svg`} />
          GitHub Trends
        </a>
        <a href="/api/logout">
          <img src={`${BASE_URL}/icons/logout.svg`} />
          Sair
        </a>
      </nav>
    </AlurakutProfileSidebarMenuDefault.Wrapper>
  )
}

AlurakutMenu.Wrapper = styled.header`
  width: 100%;
  background-color: #308BC5;

  .menu-container {
    position: relative;
    z-index: 101;
    display: flex;
    justify-content: space-between;
    padding: 7px 16px;
    max-width: 1110px;
    margin: auto;
    background-color: #308BC5;
    
    @media(min-width: 860px) {
      justify-content: flex-start;
    }

    button {
      align-self: center;
      display: inline-block;
      border: 0;
      background-color: transparent;
      
      @media(min-width: 860px) {
        display: none;
      }
    }

    nav {
      display: none;
      
      @media(min-width: 860px) {
        display: flex;
      }

      a {
        position: relative;
        padding: 10px 16px;
        font-size: 12px;
        color: #fff;
        text-decoration: none;

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          display: block;
          width: 2px;
          height: 12px;
          margin: auto;
          content: '';
          background-color: #5292C1;
        }
      }
    }

    input {
      padding: 10px 42px;
      font-size: 11px;
      color: #fff;
      background: #5579A1 url(${`${BASE_URL}/icons/search.svg`}) 15px center no-repeat;
      border: 0;
      border-radius: 999px;
      
      ::placeholder {
        color: #fff;
        opacity: 1;
      }
    } 
  }

  .menu-sidebar {
    position: fixed;
    top: 0;
    z-index: 3;
    padding: 46px;
    background-color: #fff;
    transition: 300ms;
    pointer-events: ${({ isMenuOpen }) => isMenuOpen ? 'all' : 'none'};
    opacity: ${({ isMenuOpen }) => isMenuOpen ? '1' : '0'};
    transform: ${({ isMenuOpen }) => isMenuOpen ? 'translateY(0)' : 'translateY(calc(-100% - 48px))'};
    
    @media(min-width: 860px) {
      display: none;
    }

    > .menu-wrapper {
      max-width: 400px;

      a {
        font-size: 18px;
        text-decoration: none;
      }

      .profile-link {
        font-size: 20px;
        color: #2E7BB4;
        font-weight: 800;
      }

      hr {
        margin-top: 12px;
        margin-bottom: 8px;
        border-color: transparent;
        border-bottom-color: #ECF2FA;
      }
    }
  }
`;

AlurakutMenu.Logo = styled.img`
  padding: 9px 14px;
  height: 34px;
  background-color: #fff;
  border-radius: 999px;
`;

AlurakutProfileSidebarMenuDefault.Wrapper = styled.div`
  a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 12px;
    color: #2E7BB4;
    margin-bottom: 16px;
    text-decoration: none;
    
    img {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
  }
`;


// OrkutNostalgicIconSet

export function OrkutNostalgicIconSet(props) {
  const iconsList = [
    { name: 'Recados', slug: 'recados', icon: 'book' },
    { name: 'Fotos', slug: 'fotos', icon: 'camera' },
    { name: 'Videos', slug: 'videos', icon: 'video-camera' },
    { name: 'Fãs', slug: 'fas', icon: 'star' },
    { name: 'Mensagens', slug: 'mensagens', icon: 'email' },
  ];
  const personalityIcons = [
    { name: 'Confiável', slug: 'confiavel', icon: 'smile' },
    { name: 'Legal', slug: 'legal', icon: 'cool' },
    { name: 'Sexy', slug: 'sexy', icon: 'heart' },
  ];

  return (
    <OrkutNostalgicIconSet.List>
      {iconsList.map(({ name, slug, icon }) => {
        return (
          <li key={`orkut__icon_set__${slug}`}>
            <span className="icon-title" style={{ gridArea: 'title' }}>
              {name}
            </span>
            <span className="icon-number" style={{ gridArea: 'number' }}>
              <img
                className="sample"
                src={`https://alurakut.vercel.app/icons/${icon}.svg`}
                key={`orkut__icon_set__${slug}_img`}
              />
              {props[slug] ? props[slug] : 0}
            </span>
          </li>
        );  
      })}
      {personalityIcons.map(({ name, slug, icon }) => {
        const total = props[slug] ? props[slug] : 2;
        
        return (
          <li key={`orkut__icon_set__${slug}`}>
            <span className="icon-title">{name}</span>
            <span className="icon-number" style={{ gridArea: 'number' }}>
              {[...Array(personalityIcons.length)].map((_, index) => {
                const isHeartActive = index <= (total - 1);

                return (
                  <img
                    src={`https://alurakut.vercel.app/icons/${icon}.svg`}
                    style={{ marginRight: '2px', opacity: isHeartActive ? 1 : 0.5 }}
                    key={`orkut__icon_set__${slug}_img_${index}`}
                  />
                );
              })}
            </span>
          </li>
        );
      })}
    </OrkutNostalgicIconSet.List>
  );
}

OrkutNostalgicIconSet.List = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 32px;
  list-style: none;

  @media (max-width: 409px) {
    justify-content: flex-start;
    gap: 5px;
  }

  li {
    font-size: 12px;
    color: #5A5A5A;
    display: grid;
    grid-template-areas: "title title" "number number"; 
    
    &:not(:last-child) { margin-right: 5px; }
    
    .icon-title {
      display: block;
      font-style: italic;
    }

    .icon-number {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      min-width: 15px;
      
      .sample { margin-right: 7px; }
    }
  }
`;


// Login Page

const AlurakutLoginScreen = css`
  :root {
    --clr-primary: #2E7BB4;
    --clr-secondary: #388BB0;
    --clr-tertiary: #2F4A71;
    --clr-quarternary: #D81D99;
    --clr-error: #cf000f;

    --txt-primary: #333333;
    --txt-secondary: #FFFFFF;
    --txt-tertiary: #5A5A5A;
    --txt-quarternary: #C5C6CA;

    --bgc-primary: #D9E6F6;
    --bgc-secondary: #F1F9FE;
    --bgc-tertiary: #FFFFFF;
    --bgc-quarternary: #BBCDE8;
    
    --common-radius: 8px;
  }


  .login-screen {
    --gap: 12px;
    --gutter: 16px;

    display: grid;
    grid-gap: var(--gap);
    grid-template-areas: "logo-area" "form-area" "footer-area";
    padding: 16px;
    max-width: 1110px;

    @media(min-width: 860px) {
      grid-template-columns: 2fr 1fr;
      grid-template-areas: "logo-area form-area" "logo-area form-area" "footer-area footer-area";
    }

    .logo-area {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: var(--gutter);
      min-height: 263px;
      grid-area: logo-area;
      text-align: center;
      background-color: var(--bgc-tertiary);
      border-radius: var(--common-radius);
      
      @media(min-width: 860px) {
        min-height: 368px;
      }

      p {
        font-size: 12px;
        line-height: 1.2em;
        
        &:not(:last-child) { margin-bottom: 12px; }
        
        strong { color: var(--clr-quarternary); }
      }

      img {
        max-height: 45px;
        margin-bottom: 36px;
      }
    }

    .form-area {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      grid-area: form-area;
      
      .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        padding: var(--gutter) 50px;
        text-align: center;
        background-color: var(--bgc-secondary);
        border-radius: var(--common-radius);
        
        &:not(:last-child) { margin-bottom: var(--gap); }
        
        &:first-child {
          min-height: 224px;
          
          @media(min-width: 860px) {
            min-height: 282px;
          }
        }

        p { font-size: 14px; }
        
        a {
          text-decoration: none;
          color: var(--clr-primary);
        }

        input {
          display: block;
          width: 100%;
          padding: 12px;
          margin-top: 24px;
          margin-bottom: 3px;
          background-color: var(--bgc-tertiary);
          border: 1px solid var(--txt-quarternary);
          border-radius: var(--common-radius);
        }

        .error {
          width: 100%;
          margin-bottom: var(--gutter);
          font-size: 12px;
          font-weight: 600;
          text-align: left;
          color: var(--clr-error);
        }

        button {
          display: block;
          padding: 12px;
          width: 100%;
          color: var(--txt-secondary);
          background-color: var(--clr-primary);
          border: 0;
          border-radius: var(--common-radius);
        }
      }
    }

    .footer-area {
      padding: 8px;
      grid-area: footer-area;
      background-color: var(--bgc-quarternary);
      border-radius: var(--common-radius);

      p {
        font-size: 12px;
        text-align: center;

        a {
          text-decoration: none;
          color: var(--clr-primary);
        }
      }
    }
  }
`;


// Reset Styles

export const AlurakutStyles = css`
  *::-webkit-scrollbar { width: 8px; }
  *::-webkit-scrollbar-track { background: #f1f1f1; }
  *::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 10px;
  }
  *::-webkit-scrollbar-thumb:hover { background: #555; }
  
  a,
  button {
    cursor: pointer;
    transition: 300ms;
    outline: 0;
    
    &:hover,
    &:focus { opacity: .8; }
    
    &:disabled {
      cursor: not-allowed;
      opacity: .5;
    }
  }

  input {
    transition: 300ms;
    outline: 0;
    
    &:disabled {
      cursor: not-allowed;
      opacity: .5;
    }

    &:hover,
    &:focus { box-shadow: 0px 0px 5px #33333357; }
    
    &:required:hover,
    &:required:focus { box-shadow: 0px 0px 5px #ed1c1c; }
  }

  ${AlurakutLoginScreen}
`;
