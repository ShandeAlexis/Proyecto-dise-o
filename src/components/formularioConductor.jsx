import React from "react";
import { Form, Button } from "react-bootstrap";

export function FormularioConductor({
  nombres,
  apellidos,
  genero,
  dni,
  edad,
  telefono,
  email,
  onChange,
  onSubmit,
}) {
  return (
    <Form>
      <Form.Group controlId="formNombres">
        <Form.Label>Nombres</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese nombres"
          value={nombres}
          onChange={(e) => onChange("nombres", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formApellidos">
        <Form.Label>Apellidos</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese apellidos"
          value={apellidos}
          onChange={(e) => onChange("apellidos", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formGenero">
        <Form.Label>Género</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese género"
          value={genero}
          onChange={(e) => onChange("genero", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formDni">
        <Form.Label>DNI</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese DNI"
          value={dni}
          onChange={(e) => onChange("dni", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEdad">
        <Form.Label>Edad</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese edad"
          value={edad}
          onChange={(e) => onChange("edad", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formTelefono">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese teléfono"
          value={telefono}
          onChange={(e) => onChange("telefono", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese email"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="button" onClick={onSubmit}>
        Guardar
      </Button>
    </Form>
  );
}
