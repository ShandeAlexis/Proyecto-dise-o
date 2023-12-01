import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../../services/AuthContext";
import Swal from "sweetalert2";

export function AgregarConductor({ onClose }) {

    const { authData } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Agrega un estado para el estado de autenticación

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [genero, setGenero] = useState("");
  const [dni, setDni] = useState("");
  const [edad, setEdad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  

  const accessToken = authData?.accessToken;
  if (!accessToken) {
    // Si no hay accessToken, el usuario no está autenticado
    setIsAuthenticated(false);
    return ;
  }


  const handleClose = () => {
    onClose();
  };

  const handleGuardar = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    let generoId; // Variable para almacenar el ID del género según la selección
    if (genero === "HOMBRE") {
        generoId = 1; // ID de HOMBRE en tu sistema
      } else if (genero === "MUJER") {
        generoId = 2; // ID de MUJER en tu sistema
      } else {
        generoId = 3; // ID de OTRO en tu sistema
      }
    

    const raw = JSON.stringify({
      nombres,
      genero: {
        idGenero: generoId, // Puedes cambiar esto según tus necesidades
        tipo: genero,
      },
      apellidoPaterno: apellidos.split(" ")[0], // Tomar el primer apellido
      apellidoMaterno: apellidos.split(" ")[1] || "", // Tomar el segundo apellido si existe
      dni,
      edad,
      telefono,
      email,
      foto: null,
      estado: true,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch("http://127.0.0.1:8080/conductores", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        // Puedes realizar acciones adicionales después de guardar
        Swal.fire({
            title: "Buen trabajo!",
            text: "Guardado con éxito",
            icon: "success"
          });
        handleClose();
      })
      .catch(error => console.log('error', error));
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Conductor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNombres">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese nombres"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formApellidos">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formGenero">
  <Form.Label>Género</Form.Label>
  <Form.Control
    as="select"
    value={genero}
    onChange={(e) => setGenero(e.target.value)}
  >
    <option value="">Seleccione...</option>
    <option value="HOMBRE">HOMBRE</option>
    <option value="MUJER">MUJER</option>
    <option value="OTRO">OTRO</option>
  </Form.Control>
</Form.Group>

          <Form.Group controlId="formDni">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEdad">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese edad"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={handleGuardar}>
            Guardar
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
