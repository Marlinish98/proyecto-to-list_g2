import { useState, type ChangeEvent } from "react"; 


export const useForm = <T>(initialState: T) => {
   const [form, setForm] = useState<T>(initialState);
   const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
   const { name, value } = target;

    setForm({ ...form, [name]: value });
    };
    const handleDirectChange = <K extends keyof T>(name: K, value: T[K]) => {
        setForm({ ...form, [name]: value });
    };

    const resetForm = () => setForm(initialState);
    return {
        ...form,  
        form,             
        handleChange,
        handleDirectChange,
        resetForm
    };
};