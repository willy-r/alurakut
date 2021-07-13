import React, { useState, useEffect } from 'react';

// Com o bigodinho a lib está exportando os componentes individualmente.
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

// Sem o bigodinho a lib está exportando como default.
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(props) {
  return (
    <Box>
      <img className="box-img" src={`https://github.com/${props.ghUserName}.png`} alt="Foto de perfil de William Rodrigues" />
      
      <hr className="box-hr" />
      
      <a className="box-link" href="#">William Rodrigues</a>
      <p class="box-text -about">
        masculino, solteiro(a), Brasil
      </p>
    </Box>
  );
}

// Desafio: Pegar os dados da API do GitHub e listar seus seguidores. Done.
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
    <>
      <h2 className="box-smalltitle">
        Meus seguidores no GitHub <a className="box-link" href="">({myFollowers.length})</a>
      </h2>

      <ul>
        {myFollowers.slice(0, 6).map((follower) => {
          return (
            <li>
              <a href={`/users/${follower}`} key={follower} title="Clique para ver o perfil">
                <img src={`https://github.com/${follower}.png`} alt={`Foto de perfil de ${follower}`} />
                <span>{follower}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
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
    Utiliza os componentes criados.
    Não é possível colocar na mesma raíz duas tags HTML. Para isso se usa os fragments do React.
    São delimitados pelos símbolos <> e </>.
  */
  return (
    <>
      <AlurakutMenu />
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

            <button className="box-btn" type="button">
              Criar comunidade
            </button>
            <button className="box-btn -light" type="button">
              Escrever depoimento
            </button>
            <button className="box-btn -light" type="button">
              Deixar um scrap
            </button>

            <input className="box-input" type="text" placeholder="Qual vai ser o nome da sua comunidade?" />
          </Box>
        </div>
        
        <div className="profile-relations-area" style={{ gridArea: 'profile-relations-area' }}>
          <ProfileRelationsBoxWrapper>
            <MyGithubFollowers />

            <hr className="box-hr" />
            
            <a className="box-link -verdana" href="">Ver todos</a>
          </ProfileRelationsBoxWrapper>
          
          <ProfileRelationsBoxWrapper>
            <h2 className="box-smalltitle">
              Pessoas da comunidade <a className="box-link" href="">({devsCommunity.length})</a>
            </h2>
            
            <ul>
              {devsCommunity.map((devName) => {
                return (
                  <li>
                    <a href={`/users/${devName}`} key={devName} title="Clique para ver o perfil">
                      <img src={`https://github.com/${devName}.png`} alt={`Foto de perfil de ${devName}`} />
                      <span>{devName}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            
            <hr className="box-hr" />
            
            <a className="box-link -verdana" href="">Ver todos</a>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
