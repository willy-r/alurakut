import { useState, useEffect } from 'react';

import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.ghDefaultUser}.png`} alt={`Foto de perfil de ${props.ghDefaultUser}`} />
      <hr />
      <a className="box-link" href={`https://github.com/${props.ghDefaultUser}`}>
        @{props.ghDefaultUser}
      </a>
      <p className="box-text">
        masculino, solteiro(a), Brasil
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBoxContent(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="box-smalltitle">
        {props.boxTitle} <a className="box-link" href="">({props.itemsList.length})</a>
      </h2>
      <ul>
        {props.itemsList.slice(0, 6).map((item) => {
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

function ScrapsBoxContent(props) {
  return (
    <Box>
      <div class="box-header">
        <h2 className="box-subtitle">
          Scraps <span className="clr-blue">({props.scrapsList.length})</span>
        </h2>
        <button
          className="box-btn __unmargin"
          type="button"
          onClick={props.toggleScrapsFunction}>
            Ver todos
        </button>
      </div>
      <section className="scraps-section">
        {props.scrapsList.map((scrap) => {
          const getDate = () => {
            const creationDate = new Date(scrap.createdAt);
            let day = String(creationDate.getDate());
            day = day.length === 1 ? `0${day}` : day;
            let month = String(creationDate.getMonth() + 1); // Zero-based.
            month = month.length === 1 ? `0${month}` : month;
            let year = String(creationDate.getFullYear()).slice(-2);

            return `${day}/${month}/${year}`;
          };
          const date = getDate();

          return (
            <article className="scrap-card" key={scrap.id}>
              <div className="box-header">
                <h3 className="author">{scrap.author}</h3>
                <em className="date">{date}</em>
              </div>
              <p className="content" style={{ color: scrap.color }}>{scrap.content}</p>
            </article>
          );
        })}
      </section>
    </Box>
  );
}

export default function Home() {
  const defaultUser = 'willy-r';
  
  const devsCommunity = [
    'juunegreiros', 
    'omariosouto', 
    'rafaballerini', 
    'marcobrunodev',
    'felipefialho',
    'peas',
  ];
  
  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    fetch('/api/communities')
      .then(async (response) => {
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
        .then(async (response) => {
          const communityCreated = await response.json();
          
          setCommunities([communityCreated, ...communities]);
        });
    }
    
    const form = event.target;
    const data = new FormData(form);
    const community = {
      title: data.get('community-title'),
      imageUrl: getVerifiedImageURL(data.get('community-img')),
      creatorSlug: defaultUser,
    };
  
    updateWithCommunityCreated(community);
  
    form.reset();
  }

  const [scraps, setScraps] = useState([]);
  useEffect(() => {
    fetch('/api/scraps')
      .then(async (response) => {
        const allScraps = await response.json();
        
        setScraps(allScraps);
      });
  }, []);

  function createNewScrap(event) {
    event.preventDefault();
  
    const updateWithScrapCreated = (scrapObj) => {
      fetch('/api/scraps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scrapObj),
      })
        .then(async (response) => {
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
      author: data.get('scrap-author'),
      content: data.get('scrap-content'),
      color: verifyColor(data.get('scrap-color')),
    };
    
    updateWithScrapCreated(scrap);
  
    form.reset();
  }

  function resetScrapContentInputColor() {
    const scrapContentInput = document.getElementsByName('scrap-content')[0];

    scrapContentInput.style.color = '#2e7bb4';
  }

  function setScrapContentInputColor(event) {
    const scrapContentInput = document.getElementsByName('scrap-content')[0];

    scrapContentInput.style.color = event.target.value;
  }

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

  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    fetch('https://api.github.com/users/willy-r/followers')
      .then(async (response) => {
        const followers = await response.json();
        const followersNames = followers.map((followerObj) => followerObj.login);
        
        setFollowers(followersNames);
      });
  }, []);

  /*
    Utiliza os componentes criados.
    Não é possível colocar na mesma raíz duas tags HTML. Para isso se usa os fragments do React.
    São delimitados pelos símbolos <> e </>.
  */
  return (
    <>
      <AlurakutMenu githubUser={defaultUser} />
      <MainGrid>
        <div className="profile-area" style={{ gridArea: 'profile-area' }}>
          <ProfileSidebar ghDefaultUser={defaultUser} />
        </div>
        
        <div className="welcome-area" style={{ gridArea: 'welcome-area' }}>
          <Box>
            <h1 className="box-title __unmargin">
              Bem vindo(a), William
            </h1>
            <p class="box-text">
              <strong>Sorte de hoje</strong>: O melhor profeta do futuro é o passado
            </p>
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
                placeholder="URL de uma imagem para ser usada como capa"
                aria-label="URL de uma imagem para ser usada como capa"
              />

              <button className="box-btn" type="submit">
                Criar comunidade
              </button>
            </form>
            <hr />
            <form class="box-form" action="" onSubmit={(event) => {
              createNewScrap(event);
              resetScrapContentInputColor();
            }}>
              <legend class="box-formtitle">Criar um novo scrap</legend>
              <input
                className="box-input"
                type="text"
                maxLength="50"
                name="scrap-author"
                placeholder="Seu nome"
                aria-label="Seu nome"
                required
              />
              <input
                className="box-input"
                type="text"
                maxLength="280"
                name="scrap-content"
                placeholder="Seu scrap (seja gentil)"
                aria-label="Seu scrap (seja gentil)"
                style={{ color: '#2e7bb4' }}
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
                  defaultValue="#2e7bb4"
                  list="suggested-colors"
                  onInput={setScrapContentInputColor}
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

          <ScrapsBoxContent scrapsList={scraps} toggleScrapsFunction={toggleScraps} />
        </div>
        
        <div className="profile-relations-area" style={{ gridArea: 'profile-relations-area' }}>
          <ProfileRelationsBoxContent
            boxTitle={'Meus seguidores no GitHub'}
            itemsList={followers}
          />

          <ProfileRelationsBoxContent
            boxTitle={'Minhas comunidades'}
            itemsList={communities}
          />
    
          <ProfileRelationsBoxContent
            boxTitle={'Pessoas da comunidade'}
            itemsList={devsCommunity}
          />
        </div>
      </MainGrid>
    </>
  );
}
