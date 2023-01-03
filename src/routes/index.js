import React from "react";
import { Switch } from "react-router-dom";

// import { toast } from "react-toastify";
import MyRoute from "./MyRoute";

import Login from "../pages/Login/index";
import Aluno from "../pages/Aluno/index";
import Alunos from "../pages/Alunos/index";
import Foto from "../pages/Fotos/index";
import Register from "../pages/Register/index";
import Page404 from "../pages/Page404";

export default function Routes() {
  return (
    // rotas da app. isclosed para rotas fechadas ou abertas.
    <Switch>
      <MyRoute exact path="/" component={Alunos} isClosed={false} />
      <MyRoute exact path="/aluno/:id/edit" component={Aluno} isClosed />
      <MyRoute exact path="/aluno/" component={Aluno} isClosed />
      <MyRoute exact path="/fotos/:id" component={Foto} isClosed />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register" component={Register} isClosed={false} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
