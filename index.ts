/*
import express from 'express';

const app = express();
const PORT = 3000;

// 1. GET /api/status 
app.get('GET /api/status', (req: Request, res: Response) => {
  res.status(200).json(libros);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

*/

// jncv (dia 12d) https://github.com/JCerdanv/Crud-memoria.git
// CRUD en memoria con Express y TypeScript
// entregable dia 12

import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];
let proximoId = 1;

// GET - Obtener todos los estudiantes
app.get("/api/estudiantes", (req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    total: estudiantes.length,
    data: estudiantes,
  });
});

// GET - Obtener un estudiante por ID
app.get("/api/estudiantes/:id", (req: Request, res: Response) => {
  const idBuscado = Number(req.params.id);
  const estudiante = estudiantes.find((e) => e.id === idBuscado);

  if (!estudiante) {
    return res.status(404).json({
      ok: false,
      mensaje: `El estudiante con ID ${idBuscado} no existe.`,
    });
  }

  res.status(200).json({
    ok: true,
    data: estudiante,
  });
});

// POST - Crear estudiante (Con validaciones completas)
app.post("/api/estudiantes", (req: Request, res: Response) => {
  const { nombre, email, bootcamp } = req.body;

  if (!nombre || !email || !bootcamp) {
    return res.status(400).json({
      ok: false,
      mensaje: "Faltan campos obligatorios (nombre, email y bootcamp).",
    });
  }

  const nuevoEstudiante: Estudiante = {
    id: proximoId++,
    nombre,
    email,
    bootcamp,
  };

  estudiantes.push(nuevoEstudiante);

  res.status(201).json({
    ok: true,
    mensaje: "Estudiante registrado con exito.",
    data: nuevoEstudiante,
  });
});

// PUT - Actualizar estudiante (Permite actualización parcial o total)
app.put("/api/estudiantes/:id", (req: Request, res: Response) => {
  const idBuscado = Number(req.params.id);
  const { nombre, email, bootcamp } = req.body;
  const indice = estudiantes.findIndex((e) => e.id === idBuscado);

  if (indice === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `El estudiante con ID ${idBuscado} no existe.`,
    });
  }

  estudiantes[indice] = {
    id: idBuscado,
    nombre: nombre || estudiantes[indice].nombre,
    email: email || estudiantes[indice].email,
    bootcamp: bootcamp || estudiantes[indice].bootcamp,
  };

  res.status(200).json({
    ok: true,
    mensaje: "Estudiante actualizado con exito.",
    data: estudiantes[indice],
  });
});

// DELETE - Eliminar estudiante
app.delete("/api/estudiantes/:id", (req: Request, res: Response) => {
  const idBuscado = Number(req.params.id);
  const indice = estudiantes.findIndex((e) => e.id === idBuscado);

  if (indice === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `El estudiante con ID ${idBuscado} no existe.`,
    });
  }

  const [estudianteEliminado] = estudiantes.splice(indice, 1);

  res.status(200).json({
    ok: true,
    mensaje: "Estudiante eliminado con exito.",
    data: estudianteEliminado,
  });
});

app.listen(PORT, () => {
  console.log(`dia 12 - CRUD en memoria con Express y TypeScript`); 
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});

// jncv (dia 12d) 

