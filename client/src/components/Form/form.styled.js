import styled from "styled-components";

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 15px auto;
  border: 1px solid black;
  max-width: 60%;
  @media screen and (max-width: 768px) {
    width: 100%;
    border: none;
    max-width: 100%;
  }
`;

export const Separator = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 1px;
  margin: 25px;
`;

export const FirstPartFromFormStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  .name {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &_first_block {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &_input {
      text-align: left;
      margin-right: 8px;
      margin-bottom: 12px;
      input {
        font-size: 1.2em;
        display: flex;
        justify-content: flex-end;
      }
    }
    .small_label {
      display: inline-block;
      width: 100%;
      vertical-align: bottom;
      color: grey;
      font-style: italic;
    }
  }
  .label_first {
    display: inline-block;
    vertical-align: top;
    padding: 0 12px;
    width: 200px;
  }
  .date_demande {
    width: calc(100% - 200px);
    font-size: 1.8em;
    cursor: not-allowed;
  }
`;

export const SecondPartFromFormStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  width: 100%;
  padding: 10px;
  .partie_salarie {
    width: 100%;
    display: flex;
    flex-direction: column;
    input {
      font-size: 1.2em;
      display: flex;
      justify-content: flex-end;
    }
    input[type="radio"] {
      margin-right: 22px;
      transform: scale(1.5);
      margin-bottom: 12px;
    }

    .demande_dates {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-right: 8px;
      margin-bottom: 12px;
      padding: 40px 0;

      .demande_date {
        display: flex;
        justify-content: center;
        margin-right: 8px;
        margin-bottom: 12px;
        width: 50%;
        font-size: 1.2em;
      }
    }
    .demande {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-right: 8px;
      margin-bottom: 12px;
      padding: 40px 0;
      .demande_radio {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        max-width: 180px;
      }
      .small_label {
        display: inline-block;
        width: 100%;
        vertical-align: bottom;
        color: grey;
        font-style: italic;
      }
      .label_first {
        display: inline-block;
        vertical-align: top;
        min-width: 200px;
      }
    }
  }
`;

export const ButtonStyled = styled.button`
  font-size: 1.5em;
  width: 35%;
  margin-bottom: 15px;
  background-color: #1eaa52;
  text-transform: capitalize;
  border: none;
  padding: 0.5em;
  color: white;
`;
