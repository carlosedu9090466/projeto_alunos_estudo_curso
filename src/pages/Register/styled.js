import styled from "styled-components";
import * as colors from "../../config/colors";

export const Form = styled.form`
  //fica bom o formulario assim
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  //end

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 5px;
    //focos
    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;

export const Paragrafo = styled.p``;
