export interface taskI{
    id:number;
    name:string;
    description:string;
    dueDate:string;
    dateCreated:string;
    priority:'Baja' | 'Media' | 'Alta';
    status:'Pendiente ' | 'Completada';
    expired:boolean;
}