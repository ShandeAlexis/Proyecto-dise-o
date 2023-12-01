import { useEffect, useState } from "react";
import { Sidebar } from "../../components/sidebar";
import { useAuth } from "../../services/AuthContext";
import { TopbarandUser } from "../../components/topbaranduser";
import { AgregarConductor } from "./agregarconductor";
import { EditarConductor } from "./editarconductor";
import Swal from "sweetalert2"; 

export function ConductoresLista() {
  const { authData } = useAuth();
  const [conductores, setConductores] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Agrega un estado para el estado de autenticación
  const [showAgregar, setShowAgregar] = useState(false);
  const [editConductor, setEditConductor] = useState(null);
  
  useEffect(() => {
    const accessToken = authData?.accessToken;

    if (!accessToken) {
      // Si no hay accessToken, el usuario no está autenticado
      setIsAuthenticated(false);
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/conductores/detach/paginado", requestOptions)
      .then((response) => {
        if (!response.ok) {
          // Manejar el caso en el que la solicitud no sea exitosa
          setIsAuthenticated(false);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => setConductores(result.content))
      .catch((error) => console.error("Error fetching data:", error));
  }, [authData]);

  const onEdit = (item) => {
    setEditConductor(item);
  };

  const onUpdateConductor = () => {
    // Puedes realizar acciones adicionales después de actualizar el conductor
    // Por ejemplo, puedes recargar la lista de conductores
    // ...

    // Cierra el componente de edición después de actualizar
    setEditConductor(null);
  };


  const onDelete = (item) => {
    // Utiliza SweetAlert2 para confirmar la eliminación
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "Estas seguro de eliminarlo?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, elimínalo!",
      cancelButtonText: "No, cancelalo!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Procede con la eliminación
        const accessToken = authData?.accessToken;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        const requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow',
        };

        fetch(`http://127.0.0.1:8080/conductores/${item.idConductor}`, requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result);
            // Actualiza la lista de conductores después de eliminar uno
            setConductores(conductores.filter(conductor => conductor.idConductor !== item.idConductor));
            // Muestra un mensaje de éxito
            swalWithBootstrapButtons.fire({
              title: "Eliminado!",
              text: "Tu conductor ha sido eliminado con éxito!",
              icon: "success"
            });
          })
          .catch(error => {
            console.log('error', error);
            // Muestra un mensaje de error
            swalWithBootstrapButtons.fire({
              title: "Error",
              text: "An error occurred while deleting the file.",
              icon: "error"
            });
          });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // Muestra un mensaje de cancelación
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Tu conductor sigue en la base de datos.",
          icon: "error"
        });
      }
    });
  };

  const toggleAgregar = () => {
    setShowAgregar(!showAgregar);
  };

  return (
    <>
      <Sidebar />
      <div className={`main ${authData ? "active" : ""}`}>
        <TopbarandUser />
        <div className="container">
          <h1 className="text-center">Conductores</h1>
          <button
            type="button"
            className="btn btn-success "
            onClick={toggleAgregar}
          >
            Agregar
          </button>
          <h2>hola</h2>
          {showAgregar && <AgregarConductor onClose={toggleAgregar} />}
          {editConductor && (
            <EditarConductor
              conductor={editConductor}
              onClose={() => setEditConductor(null)}
              onUpdate={onUpdateConductor}
            />
          )}
          {isAuthenticated ? (
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombres</th>
                  <th>Genero</th>
                  <th>Apellidos</th>

                  <th>DNI</th>
                  <th>Edad</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {conductores.map((conductor) => (
                  <tr key={conductor.idConductor}>
                    <td>{conductor.idConductor}</td>
                    <td>{conductor.nombres}</td>
                    <td>{conductor.genero.tipo}</td>
                    <td>
                      {conductor.apellidoPaterno} {conductor.apellidoMaterno}{" "}
                    </td>
                    <td>{conductor.dni}</td>
                    <td>{conductor.edad}</td>
                    <td>{conductor.telefono}</td>
                    <td>{conductor.email}</td>
                    <td>{conductor.estado ? "Activo" : "Inactivo"}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => onEdit(conductor)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => onDelete(conductor)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div class="alert alert-info text-center" role="alert">
              Registrate primero mi king
            </div>
          )}
        </div>
      </div>
    </>
  );
}
