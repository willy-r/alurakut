import styled from "styled-components";

// Isso é um componente. Começa com letra maiúscula porque é um componente e não uma tag.
const Box = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 10px;

  .box-img { border-radius: 8px; }
  
  .box-link {
    font-size: 14px;
    font-weight: 800;
    color: #2e7bb4;
    text-decoration: none;

    &:hover { color: #055c9c; }

    &.-verdana {
      margin-top: 8px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
  }

  .box-text {
    margin-top: 8px;
    font-size: 12px;
    color: #999;

    &.-about { width: 60px; }
  }

  .box-title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;

    &.-unmargin { margin: 0; }
  }

  .box-subtitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  .box-smalltitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }

  .box-hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ecf2fa;
  }

  .box-input {
    width: 100%;
    padding: 14px 16px;
    margin-top: 16px;
    margin-bottom: 14px;
    color: #333;
    background-color: #f4f4f4;
    border: 0;
    border-radius: 32px;

    &::placeholder {
      color: #333;
      opacity: 1;
    }
  }

  .box-btn {
    padding: 8px 12px;
    margin-right: 16px;
    color: #fff;
    background-color: #6f92bb;
    border: 0;
    border-radius: 8px;

    &.-light {
      color: #2e7bb4;
      background-color: #d9e6f6;
    }
  }
`;

export default Box;
