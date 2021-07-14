import { useState, useEffect } from 'react';

import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';

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

// Desafio: Pegar os dados da API do GitHub e listar seus seguidores.
function MyGithubFollowers() {
  const [myFollowers, setMyFollowers] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/willy-r/followers')
      .then(response => response.json())
      .then(followersList => {
        const followersNames = followersList.map((followerObj) => followerObj.login);
        setMyFollowers(followersNames);
      });
  }, []);

  return (
    <ProfileRelationsBoxContent
      boxTitle={
        <>
          Meus seguidores no GitHub <a className="box-link" href="https://github.com/willy-r?tab=followers" target="_blank" rel="noopener noreferrer external">({myFollowers.length})</a>
        </>
      }
      itemsList={myFollowers}
    />
  );
}

function ProfileRelationsBoxContent(props) {
  return (
    <>
      <h2 className="box-smalltitle">
        {props.boxTitle}
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
            const randomNumber = Math.floor(Math.random() * 10);

            return (
              <li key={item.id}>
                <a href={item.link} target="_blank" rel="noopener noreferrer external">
                  <img
                    src={isValidURLImg(item.imgURL) ? item.imgURL : `https://picsum.photos/300?random=${randomNumber}`}
                    alt={`Capa da comunidade ${item.title}`}
                  />
                  <span>{item.title}</span>
                </a>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}

function isValidURLImg(imgURL) {
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
  const [communities, setCommunities] = useState([
    { id: '1', title: 'Alurakut', imgURL: '', link: 'https://github.com/alura-challenges/alurakut' },
    { id: '2', title: 'Devs Soutinhos', imgURL: '', link: 'https://www.youtube.com/DevSoutinho' },
    { id: '3', title: 'Marcos Bruno Dev', imgURL: '', link: 'https://www.twitch.tv/marcobrunodev' },
    { 
      id: '4', 
      title: 'Resilientes', 
      imgURL: 'https://scontent.fphb2-1.fna.fbcdn.net/v/t1.6435-9/70474925_110913430306140_4230531327587254272_n.png?_nc_cat=108&ccb=1-3&_nc_sid=973b4a&_nc_ohc=DCt4n3x-7VIAX_wYLif&_nc_ht=scontent.fphb2-1.fna&oh=592e04dc290df78e11e4b0985d6c7d7c&oe=60F3ED16', 
      link: 'https://www.resilia.work/' 
    },
  ]);

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
              const newCommunity = {
                id: new Date().toISOString(),
                title: data.get('community-title'),
                imgURL: data.get('community-img'),
                link: data.get('community-link'),
              };

              setCommunities([...communities, newCommunity]);

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
          <ProfileRelationsBoxWrapper>
            <MyGithubFollowers />
            <hr />
            <a
              className="box-link -verdana"
              href="https://github.com/willy-r?tab=followers"
              target="_blank"
              rel="noopener noreferrer external">
              Ver todos
            </a>
          </ProfileRelationsBoxWrapper>
          
          <ProfileRelationsBoxWrapper>
            <ProfileRelationsBoxContent
              boxTitle={
                <>
                  Pessoas da comunidade <a className="box-link" href="">({devsCommunity.length})</a>
                </> 
              }
              itemsList={devsCommunity}
            />
            <hr />
            <a className="box-link -verdana" href="">Ver todos</a>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <ProfileRelationsBoxContent
              boxTitle={
                <>
                  Minhas comunidades <a className="box-link" href="">({communities.length})</a>
                </>
              }
              itemsList={communities}
            />
            <hr />
            <a className="box-link -verdana" href="">Ver todos</a>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
