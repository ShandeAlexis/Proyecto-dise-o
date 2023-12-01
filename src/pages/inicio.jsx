import React from "react";
import { Sidebar } from "../components/sidebar";
import { useAuth } from "../services/AuthContext";
import { Table } from "../components/table";
import { TopbarandUser } from "../components/topbaranduser";

export function Inicio() {
  const { authData } = useAuth();

  console.log(authData);

 

  return (
    <>
      <Sidebar />
      <div className={`main ${authData ? "active" : ""}`}>
        <TopbarandUser/>
        

        <div className="container">

        <h2>Tabla de inicio gaa</h2>

          {authData ? (
            <>
              {/* Otra información que quieras mostrar */}
              <Table data={[authData]} />
            </>
          ) : (
            <p>No estás autenticado</p>
          )}
        </div>
      </div>
    </>
  );
}
