import { call, put, all, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actions from "./actions";
import * as types from "../types";

const requisicao = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

// funcões gerados - tem * na frente
function* exampleRequest() {
  try {
    // function geradora yield
    yield call(requisicao);
    // disparar a action
    yield put(actions.clicaBotaoSuccess());
  } catch {
    toast.error("Deu Error");
    yield put(actions.clicaBotaoFailure());
  }
}

export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);
