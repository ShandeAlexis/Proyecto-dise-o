import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/sidebar";
import AuthService from "../../services/AuthService";
import { Table } from "../../components/table";
import { TopbarandUser } from "../../components/topbaranduser";

export function Clientes() {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verifica si ya tienes datos de autenticación antes de autenticar nuevamente
        if (!authData) {
          const email = "admin@admin.com";
          const password = "123";
          const data = await AuthService.authenticate(email, password);
          console.log("Datos obtenidos:", data);
          setAuthData(data);
        }
      } catch (error) {
        console.error("Error al autenticar:", error);
      }
    };

    fetchData();
  }, [authData]); // Dependencia actualizada para ejecutarse solo cuando authData cambia

  const handleEdit = (item) => {
    console.log("Editar:", item);
  };

  const handleDelete = (item) => {
    console.log("Eliminar:", item);
  };

  return (
    <>
      <Sidebar />
      <div className={`main ${authData ? "active" : ""}`}>
        <TopbarandUser />
        <div className="container">
          <h1>Clientes</h1>
          <button type="button" className="btn btn-success">
            Agregar
          </button>

          {authData ? (
            <>
              {/* Otra información que quieras mostrar */}
              <Table
                data={[authData]}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </>
          ) : (
            <p>No estás autenticado</p>
          )}
        </div>
      </div>
    </>
  );
}
