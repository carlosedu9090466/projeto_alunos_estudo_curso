import React, { useState, useEffect } from "react";
import { get } from "lodash";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as actions from "../../store/modules/auth/actions";
import axios from "../../services/axios";
import history from "../../services/history";
import { Container } from "../../styles/GlobalStyles";
import Loading from "../../components/Loading/index";
import { Title, Form } from "./styled";

export default function Fotos({ match }) {
  const id = get(match, "params.id", "");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        // pegando o data direto
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, "Fotos[0].url", ""));
        setIsLoading(false);
      } catch (err) {
        toast.error("Erro ao obter imagem");
        setIsLoading(false);
        history.push("/");
      }
    };

    getData();
  }, []);

  const handleChange = async (e) => {
    const arquivoFoto = e.target.files[0];
    // criando a url
    const fotoURL = URL.createObjectURL(arquivoFoto);

    setFoto(fotoURL);
    // enviando a foto para a base de dados
    const formData = new FormData();
    formData.append("aluno_id", id);
    formData.append("foto", arquivoFoto);

    try {
      setIsLoading(true);

      await axios.post("/fotos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
      toast.success("Foto enviada com sucesso!");
    } catch (err) {
      setIsLoading(false);

      const { status } = get(err, "response", "");
      toast.error("Erro ao  enviar a foto!");

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? (
            <img crossOrigin="anonymous" src={foto} alt="Foto" />
          ) : (
            "Selecionar"
          )}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
