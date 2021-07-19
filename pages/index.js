import { useState, useEffect } from 'react';

import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';

import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { getUserData, verifyUserHasAccess } from './api/user';


function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <img src={githubUser.avatar_url} alt={`Foto de perfil de ${githubUser.name}`} />
      <hr />
      <a className="box-link" href={githubUser.html_url} target="_blank" rel="noopener noreferrer external">
        {githubUser.name}
      </a>
      <p className="box-text">
        {githubUser.bio}
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBoxContent({ boxTitle, itemsList }) {
  const itemsCount = itemsList.length;

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="box-smalltitle">
        {boxTitle} <a className="box-link" href="">({itemsCount == 100 ? `+${itemsCount}` : itemsCount})</a>
      </h2>
      <ul>
        {itemsList.slice(0, 6).map((item) => {
          if (typeof item == 'string') {
            return (
              <li key={item}>
                <a href={`https://github.com/${item}`} target="_blank" rel="noopener noreferrer external">
                  <img
                    src={`https://github.com/${item}.png`}
                    alt={`Foto de perfil de ${item}`}
                  />
                  <span>{item}</span>
                </a>
              </li>
            );
          } else {
            return (
              <li key={item.id}>
                <a href={`communities/${item.id}`}>
                  <img src={item.imageUrl} alt={`Capa da comunidade ${item.title}`}/>
                  <span>{item.title}</span>
                </a>
              </li>
            );
          }
        })}
      </ul>
      <hr />
      <a className="box-link -verdana" href="">
        Ver todos
      </a>
    </ProfileRelationsBoxWrapper>
  );
}

function ScrapsBoxContent({ scrapsList }) {
  function toggleScraps(event) {
    const buttonForShowingScraps = event.target;
    const scrapsSection = document.querySelector('.scraps-section');

    if (scrapsSection.classList.contains('-active')) {
      scrapsSection.style.animation = 'fade-out ease-out 450ms 1';
      setTimeout(() => scrapsSection.classList.remove('-active'), 440);
      buttonForShowingScraps.textContent = 'Ver todos';
    } else {
      scrapsSection.classList.add('-active');
      scrapsSection.style.animation = 'fade-in ease-in 450ms 1';
      buttonForShowingScraps.textContent = 'Ocultar todos';
    }
  }

  return (
    <Box>
      <div class="box-header">
        <h2 className="box-subtitle">
          Scraps <span className="clr-blue">({scrapsList.length})</span>
        </h2>
        <button
          className="box-btn __unmargin"
          type="button"
          onClick={toggleScraps}>
            Ver todos
        </button>
      </div>
      <section className="scraps-section">
        {scrapsList.map((scrap) => {
          const creationDate = new Date(scrap.createdAt);
          const formattedDate = creationDate.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          });

          return (
            <article className="scrap-card" key={scrap.id}>
              <img className="img" src={scrap.authorImage} alt={`Foto de avatar de ${scrap.author}`} />
              <div className="card-content">
                <div className="box-header">
                  <h3 className="author">{scrap.author}</h3>
                  <em className="date">{formattedDate}</em>
                </div>
                <p className="content" style={{ color: scrap.color }}>{scrap.content}</p>
              </div>
            </article>
          );
        })}
      </section>
    </Box>
  );
}

function WelcomeBoxTime({ dateObj }) {
  let timeInfo;
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  // @TODO: Refatorar.
  if (hours <= 4 && minutes <= 59 ) {
    timeInfo = {
      message: 'muito boa madrugada',
      emoji: '🦉',
    };
  } else if (hours <= 8 && minutes <= 59 ) {
    timeInfo = {
      message: 'muito bom dia',
      emoji: '🌅',
    };
  } else if (hours <= 11 && minutes <= 59) {
    timeInfo = {
      message: 'muito bom dia',
      emoji: '☀️',
    };
  } else if (hours <= 16 && minutes <= 59) {
    timeInfo = {
      message: 'muito boa tarde',
      emoji: '☀️',
    };
  } else if (hours <= 17 && minutes <= 59) {
    timeInfo = {
      message: 'muito boa tarde',
      emoji: '🌇',
    };
  } else {
    timeInfo = {
      message: 'muito boa noite',
      emoji: '🌕',
    };
  }

  const formattedTime = dateObj.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute:'2-digit',
  });
   
  return (
    <p class="box-text">
      Agora são exatamente <strong>{formattedTime}</strong>, {timeInfo.message}! {timeInfo.emoji}
    </p>
  );
}

export default function Home(props) {
  const userInfo = props.githubUser;
  const userFirstName = userInfo.name.split(' ')[0];
  
  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    fetch('/api/communities')
      .then(async response => {
        const allCommunities = await response.json();
        
        setCommunities(allCommunities);
      });
  }, []);

  function createNewCommunity(event) {
    event.preventDefault();
  
    const getVerifiedImageURL = (imageURL) => {
      const imageFormatsAllowed = ['.png', '.bmp', '.jpg', '.jpeg', '.svg'];
      const isValidImageURL = imageFormatsAllowed.some(format => imageURL.includes(format));
  
      if (!isValidImageURL) {
        // Isso é necessário para não gerar imagens iguais.
        const randomNumber = Math.floor(Math.random() * 10);
        imageURL = `https://picsum.photos/300?random=${randomNumber}`;
      }
      
      return imageURL;
    }
    const updateWithCommunityCreated = (communityObj) => {
      fetch('/api/communities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(communityObj),
      })
        .then(async response => {
          const communityCreated = await response.json();
          
          setCommunities([communityCreated, ...communities]);
        });
    }
    
    const form = event.target;
    const data = new FormData(form);
    const community = {
      title: data.get('community-title'),
      imageUrl: getVerifiedImageURL(data.get('community-img')),
      creatorSlug: loggedUserInfo.login,
    };
  
    updateWithCommunityCreated(community);
  
    form.reset();
  }

  const [scraps, setScraps] = useState([]);
  useEffect(() => {
    fetch('/api/scraps')
      .then(async response => {
        const allScraps = await response.json();
        
        setScraps(allScraps);
      });
  }, []);

  const defaultScrapColor = '#2e7bb4';
  const [scrapColor, setScrapColor] = useState(defaultScrapColor);

  function createNewScrap(event) {
    event.preventDefault();
  
    const updateWithScrapCreated = (scrapObj) => {
      fetch('/api/scraps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scrapObj),
      })
        .then(async response => {
          const scrapCreated = await response.json();
          
          setScraps([scrapCreated, ...scraps]);
        });
    }
    const verifyColor = (color) => {
      const isInvalidColor = color == '#000000' || color == '#ffffff';
      
      if (isInvalidColor) {
        const colors = ['#d81d99', '#2e7bb4', '#ef5261', '#ffa600'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        color = randomColor;
      }

      return color;
    }
    
    const form = event.target;
    const data = new FormData(form);
    const scrap = {
      author: userInfo.name,
      authorImage: userInfo.avatar_url,
      content: data.get('scrap-content'),
      color: verifyColor(data.get('scrap-color')),
    };
    
    updateWithScrapCreated(scrap);
    
    setScrapColor(defaultScrapColor);
    form.reset();
  }

  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    fetch(`${userInfo.followers_url}?per_page=100`)
      .then(async response => {
        const followers = await response.json();
        const followersNames = followers.map((followerObj) => followerObj.login);
        
        setFollowers(followersNames);
      });
  }, []);

  const currentDateObj = new Date();
  const [dateObj, setDateObj] = useState(currentDateObj);
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDateObj = new Date();

      setDateObj(currentDateObj);
    }, 60_000);
    const unmountFunction = () => clearInterval(interval);
    
    return unmountFunction;
  }, []);

  /*
    Utiliza os componentes criados.
    Não é possível colocar na mesma raíz duas tags HTML. Para isso se usa os fragments do React.
    São delimitados pelos símbolos <> e </>.
  */
  return (
    <>
      <AlurakutMenu githubUser={userInfo} />
      <MainGrid>
        <div className="profile-area" style={{ gridArea: 'profile-area' }}>
          <ProfileSidebar githubUser={userInfo} />
        </div>
        
        <div className="welcome-area" style={{ gridArea: 'welcome-area' }}>
          <Box>
            <h1 className="box-title __unmargin">
              Bem vindo(a), {userFirstName.toUpperCase()}
            </h1>
            <WelcomeBoxTime dateObj={dateObj} />
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="box-subtitle">
              O que você deseja fazer?
            </h2>

            <form class="box-form" action="" onSubmit={createNewCommunity}>
              <legend class="box-formtitle">Criar uma nova comunidade</legend>
              <input
                className="box-input"
                type="text"
                name="community-title"
                placeholder="Qual vai ser o nome da sua comunidade?"
                aria-label="Qual vai ser o nome da sua comunidade?"
                required
              />
              <input
                className="box-input"
                type="text"
                name="community-img"
                placeholder="URL de uma imagem para a capa"
                aria-label="URL de uma imagem para a capa"
              />

              <button className="box-btn" type="submit">
                Criar comunidade
              </button>
            </form>
            <hr />
            <form class="box-form" action="" onSubmit={createNewScrap}>
              <legend class="box-formtitle">Criar um novo scrap</legend>
              <input
                className="box-input"
                type="text"
                maxLength="280"
                name="scrap-content"
                placeholder="Seu scrap (seja gentil)"
                aria-label="Seu scrap (seja gentil)"
                style={{ color: scrapColor }}
                required
              />
              <fieldset className="box-fieldset">
                <datalist id="suggested-colors">
                  <option>#d81d99</option>
                  <option>#ef5261</option>
                  <option>#ffa600</option>
                </datalist>

                <label className="label" htmlFor="scrap-color">
                  Escolha uma cor para o seu scrap:
                </label>
                <input
                  className="input"
                  id="scrap-color"
                  type="color"
                  name="scrap-color"
                  defaultValue={scrapColor}
                  list="suggested-colors"
                  onInput={event => setScrapColor(event.target.value)}
                />
              </fieldset>

              <button className="box-btn -light" type="submit">
                Deixar um scrap
              </button>
              {/* <button className="box-btn -light" type="button">
                Escrever depoimento
              </button> */}
            </form>
          </Box>

          <ScrapsBoxContent scrapsList={scraps} />
        </div>
        
        <div className="profile-relations-area" style={{ gridArea: 'profile-relations-area' }}>
          <ProfileRelationsBoxContent
            boxTitle={'Meus seguidores'}
            itemsList={followers}
          />

          <ProfileRelationsBoxContent
            boxTitle={'Minhas comunidades'}
            itemsList={communities}
          />
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const token = cookies.USER_TOKEN;
  // Verifica se o usuário está autenticado.
  const hasAccess = await verifyUserHasAccess(token);

  if (!hasAccess) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    };
  }

  // Se o usuário estiver autenticado, a gente devolve o nome de usuário do GitHub dele.
  const { githubUser } = jwt.decode(token);
  const userInfo = await getUserData(githubUser);
  
  return {
    props: { githubUser: { ...userInfo } },
  };
}
