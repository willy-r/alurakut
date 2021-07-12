import styled from 'styled-components';

const MainGrid = styled.main`
  grid-gap: 10px;
  width: 100%;
  max-width: 500px;
  padding: 16px;
  margin-left: auto;
  margin-right: auto;

  .profile-area {
    display: none;

    @media (min-width: 53.75em) {
      display: block;
    }
  }

  /* 860px */
  @media (min-width: 53.75em) {
    display: grid;
    grid-template-areas: 'profile-area welcome-area profile-relations-area';
    grid-template-columns: 160px 1fr 312px;
    max-width: 1100px;
  }
`;

export default MainGrid;
