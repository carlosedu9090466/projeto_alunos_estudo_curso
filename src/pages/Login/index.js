import React from "react";
import { useDispatch } from "react-redux";
import { Container } from "../../styles/GlobalStyles";
import { Title, Paragrafo } from "./styled";
import * as exampleActions from "../../store/modules/example/actions";
// import axios from "../../services/axios";

export default function Login() {
  // disparar algo
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();

    dispatch(exampleActions.clicaBotaoRequest());
  }

  return (
    <Container>
      <Title isRed={false}>
        Login
        <small>oiee</small>
      </Title>
      <Paragrafo>Lorem isoum</Paragrafo>
      <button type="button" onClick={handleClick}>
        Enviar
      </button>
    </Container>
  );
}
