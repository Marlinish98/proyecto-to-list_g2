import { useState, type ChangeEvent } from "react";
import Swal from "sweetalert2"


export const useForm = <T extends { name?: string; dueDate?: string }>(initialState: T) => {
  const [form, setForm] = useState<T>(initialState);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value as T[keyof T] });
  };

  const handleDirectChange = <K extends keyof T>(name: K, value: T[K]) => {
    setForm({ ...form, [name]: value });
  };

  const resetForm = () => setForm(initialState);

  const validateBeforeSubmit = (): boolean => {
    const nameValue = form.name || "";
    const dateValue = form.dueDate;

    if (nameValue.trim() === "") {
      Swal.fire({
        icon: "info",
        title: "El nombre es obligatorio",
        timer: 2000,
        showConfirmButton: false,
      });
      return false;
    }

    if (!dateValue) {
        Swal.fire({
        icon: "info",
        title: "Fecha límite es obligatoria",
        timer: 2000,
        showConfirmButton: false,
      });
      return false;
    }

    return true;
  };

  return {
    ...form,
    form,
    handleChange,
    handleDirectChange,
    resetForm,
    validateBeforeSubmit,
  };
};