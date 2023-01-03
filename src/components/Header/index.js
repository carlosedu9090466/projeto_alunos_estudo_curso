import React from "react";
import { FaHome, FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav } from "./styled";

export default function Header() {
  const botaoClicado = useSelector((state) => state.example.botaoClicado);

  return (
    <Nav>
      {/* links com se fosse o a - para navegar entra as páginas */}
      <Link to="/">
        <FaHome size={24} />
        {botaoClicado ? "Clicado" : "Não clicado"}
      </Link>
      <Link to="/login">
        <FaUserAlt size={24} />
      </Link>
      <Link to="/quemSomos">
        <FaSignInAlt size={24} />
      </Link>
    </Nav>
  );
}
