import { useState, type ChangeEvent } from "react";

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
      alert("El nombre no puede estar vacio");
      return false;
    }

    if (!dateValue) {
      alert("Selecciona una fecha en el calendario");
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