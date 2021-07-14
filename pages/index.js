import { useState, useEffect } from 'react';
import { SiteClient } from 'datocms-client';

import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.ghUserName}.png`} alt="Foto de perfil de William Rodrigues" />
      <hr />
      <a className="box-link" href={`https://github.com/${props.ghUserName}`}>
        @{props.ghUserName}
      </a>
      <p className="box-text -about">
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
            // Gera um número aleatório para gerar imagens diferentes.
            const randomNumber = Math.floor(Math.random() * 10);

            return (
              <li key={item.id}>
                <a href={item.link} target="_blank" rel="noopener noreferrer external">
                  <img
                    src={isValidImgURL(item.imageUrl) ? item.imageUrl : `https://picsum.photos/300?random=${randomNumber}`}
                    alt={`Capa da comunidade ${item.title}`}
                  />
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

function isValidImgURL(imgURL) {
  const imgFormatsAllowed = ['.png', '.bmp', '.jpg', '.jpeg', '.svg', '.gif'];
  
  return imgFormatsAllowed.some(format => imgURL.includes(format));
}

export default function Home() {
  const userName = 'willy-r';
  
  const devsCommunity = [
    'juunegreiros', 
    'omariosouto', 
    'rafaballerini', 
    'marcobrunodev',
    'felipefialho',
    'peas',
  ];
  
  /*
    O valor passado para o useState é o valor inicial.
    Ele retorna dois valores, nesse casso um array com as comunidades e uma forma
    de alterar esse array de comunidades.
  */
  const client = new SiteClient(process.env.NEXT_PUBLIC_API_TOKEN);
  
  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    client.items.all({
      'filter[type]': '967554',
      version: 'published'
    }, { 
      allPages: true, 
    })
      .then(communitiesList => setCommunities(communitiesList))
      .catch(err => console.error(err))
  }, []);

  const createCommunity = async (title, link, imageURL) => {
    const newCommunity = await client.items.create({
      itemType: '967554',
      title: title,
      link: link,
      imageUrl: imageURL,
    });

    // Ele sobrescreve a lista de comunidades, não faz uma nova requisição.
    setCommunities([newCommunity, ...communities]);
  }

  // Desafio: listar seus seguidores através da API do Github.
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    fetch('https://api.github.com/users/willy-r/followers')
      .then(response => response.json())
      .then(followersList => {
        const followersNames = followersList.map((followerObj) => followerObj.login);
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
      <AlurakutMenu githubUser={userName} />
      <MainGrid>
        <div className="profile-area" style={{ gridArea: 'profile-area' }}>
          <ProfileSidebar ghUserName={userName} />
        </div>
        
        <div className="welcome-area" style={{ gridArea: 'welcome-area' }}>
          <Box>
            <h1 className="box-title -unmargin">
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

            <form action="" onSubmit={(event) => {
              event.preventDefault();
              
              const form = event.target;
              const data = new FormData(form);

              createCommunity(
                data.get('community-title'),
                data.get('community-link'),
                data.get('community-img')
              );

              form.reset();
            }}>
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
                name="community-link"
                placeholder="URL da comunidade"
                aria-label="URL da comunidade"
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
              {/* <button className="box-btn -light" type="button">
                Escrever depoimento
              </button>
              <button className="box-btn -light" type="button">
                Deixar um scrap
              </button> */}
            </form>
          </Box>
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
