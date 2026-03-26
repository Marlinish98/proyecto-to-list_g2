// Importa useState para manejar el estado del formulario
// y ChangeEvent para tipar correctamente los eventos de los inputs
import { useState, type ChangeEvent } from "react";

// Importa SweetAlert2 para mostrar alertas visuales al usuario
import Swal from "sweetalert2"


// Hook personalizado useForm
// <T> permite que el hook sea genérico y reutilizable con cualquier tipo de formulario
// que tenga al menos los campos name y dueDate
export const useForm = <T extends { name?: string; dueDate?: string }>(initialState: T) => {

  // Estado que guarda todos los valores del formulario
  // initialState contiene los valores iniciales de los campos
  const [form, setForm] = useState<T>(initialState);


  // Función que maneja los cambios en los inputs y textareas
  // Captura el evento del input y obtiene el name y el value
  // Luego actualiza el estado del formulario dinámicamente
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;

    // Se copia el estado anterior y se actualiza solo el campo modificado
    setForm({ ...form, [name]: value as T[keyof T] });
  };


  // Función para cambiar valores directamente desde el código
  // Se usa principalmente en radio buttons o selects
  // name representa el campo a modificar
  // value representa el nuevo valor
  const handleDirectChange = <K extends keyof T>(name: K, value: T[K]) => {
    setForm({ ...form, [name]: value });
  };


  // Función para limpiar el formulario
  // Restablece todos los valores al estado inicial
  const resetForm = () => setForm(initialState);


  // Función que valida los datos antes de guardar
  // Retorna true si el formulario es válido
  // Retorna false si falta algún dato obligatorio
  const validateBeforeSubmit = (): boolean => {

    // Obtiene el nombre del formulario
    // Si no existe, se asigna una cadena vacía
    const nameValue = form.name || "";

    // Obtiene la fecha límite
    const dateValue = form.dueDate;


    // Validación 1: El nombre no puede estar vacío
    if (nameValue.trim() === "") {

      // Muestra una alerta informando al usuario
      Swal.fire({
        icon: "info",
        title: "El nombre es obligatorio",
        timer: 2000,
        showConfirmButton: false,
      });

      // No permite continuar
      return false;
    }


    // Validación 2: La fecha límite es obligatoria
    if (!dateValue) {

      // Muestra alerta
      Swal.fire({
        icon: "info",
        title: "Fecha límite es obligatoria",
        timer: 2000,
        showConfirmButton: false,
      });

      // No permite continuar
      return false;
    }

    // Si todo está correcto, permite guardar
    return true;
  };


  // Retorna todos los valores y funciones del hook
  // ...form permite acceder directamente a los campos (name, description, etc.)
  // form contiene el objeto completo
  // handleChange actualiza inputs
  // handleDirectChange cambia valores manualmente
  // resetForm limpia el formulario
  // validateBeforeSubmit valida antes de guardar
  return {
    ...form,
    form,
    handleChange,
    handleDirectChange,
    resetForm,
    validateBeforeSubmit,
  };
};