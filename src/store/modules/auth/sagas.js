import { call, put, all, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { get } from "lodash";
import * as actions from "./actions";
import * as types from "../types";
import axios from "../../../services/axios";
import history from "../../../services/history";

// funcões gerados - tem * na frente - so os dados do payload colocando entre chaves
function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, "/token", payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success("Login efetuado com sucesso");

    // token que vc coloca no cabeçalho no app. no insomonia foi coloca no Auth para fazer as requisões que o midwallre solicita.
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    // mandar para a página depois que loga com sucesso
    history.push(payload.prevPath);
  } catch (e) {
    toast.error("Usuário ou senha inválidos!");

    yield put(actions.loginFailure());
  }
}
// aparece o cabelhaço mesmo atualizando a página.
function persistRehydrate({ payload }) {
  const token = get(payload, "auth.token", "");
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;
  // edição do user
  try {
    if (id) {
      yield call(axios.put, "/users", {
        nome,
        email,
        password: password || undefined,
      });
      toast.success("Dados alterados com sucesso!");
      yield put(actions.registerUpdateSuccess({ nome, email, password }));
    } else {
      yield call(axios.post, "/users", {
        nome,
        email,
        password,
      });
      toast.success("Conta criada com sucesso!");
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
      // redirecionar para o login
      history.push("/login");
    }
  } catch (e) {
    const errors = get(e, "response.data.error", []);
    const status = get(e, "response.status", 0);

    // caso ele tenha feito um update no email
    if (status === 401) {
      toast.error("Você precisa fazer login novamente");
      yield put(actions.loginFailure());
      return history.push("/login");
    }

    if (errors.lenght > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error("Erro desconhecido");
    }

    yield put(actions.registerFailure());
  }

  return 1;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
