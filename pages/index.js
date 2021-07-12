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
    </Box>
  );
}

export default function Home() {
  const userName = 'willy-r';
  const favoritesPeople = [
    'juunegreiros', 
    'omariosouto', 
    'rafaballerini', 
    'marcobrunodev',
    'felipefialho',
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
            <h1 className="box-title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        
        <div className="profile-relations-area" style={{ gridArea: 'profile-relations-area' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="box-smalltitle">
              Pessoas da comunidade <a className="box-link" href="">({favoritesPeople.length})</a>
            </h2>
            
            <ul>
              {favoritesPeople.map((person) => {
                return (
                  <li>
                    <a href={`/users/${person}`} key={person} title="Clique para ver o perfil">
                      <img src={`https://github.com/${person}.png`} alt={`Foto de perfil de ${person}`} />
                      <span>{person}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
