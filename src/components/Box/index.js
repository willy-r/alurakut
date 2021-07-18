import styled from "styled-components";

// Isso é um componente. Começa com letra maiúscula porque é um componente e não uma tag.
const Box = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 10px;

  img { border-radius: 8px; }

  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ecf2fa;
  }

  .__unmargin { margin: 0 !important; }

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
    font-size: 13px;
    color: #999;
  }

  .box-title {
    margin-bottom: 20px;
    font-size: 32px;
    font-weight: 400;
  }

  .box-subtitle {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 400;

    span {
      color: #2e7bb4;
      
      &:hover { color: #055c9c; }
    }
  }

  .box-smalltitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }

  .box-form {
    padding: 8px;
    border: 1px solid #2E7BB4;
    border-radius: 8px;
    transition: border-width 200ms cubic-bezier(0.42, 0, 0.8, 2.07);

    &:hover { border-width: 3px; }
  }

  .box-formtitle {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  }

  .box-fieldset {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;

    > .label { font-size: 15px; }

    > .input {
      margin-left: 5px;
      border-radius: 8px;
    }
  }

  .box-input {
    width: 100%;
    padding: 14px 16px;
    margin-bottom: 14px;
    color: #333;
    background-color: #f4f4f4;
    border: 0;
    border-radius: 32px;

    &::placeholder {
      color: #999;
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

    &.-right {
      float: right;
      margin-right: 0;
    }
  }

  .box-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .scraps-section {
    display: none;
    flex-direction: column;
    gap: 15px;

    &.-active { display: flex; }

    @keyframes fade-in {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes fade-out {
      0% { opacity: 1; }
      100% { opacity: 0; }
    }
  }
  
  .scrap-card {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 8px;
    border: 1px solid #b2b2b2;
    border-radius: 8px;

    .author {
      font-size: 16px;
      font-weight: 700;
      color: #333;
    }

    .date {
      padding: 3px 5px 3px 3px;
      font-size: 11px;
      color: #fff;
      background-color: #2E7BB4;
      border-radius: 999px;
    }

    .content { font-size: 15px; }
  }
`;

export default Box;
