export interface taskFormI {
    name: string;
    description: string;
    dueDate: string;
    priority: 'Baja' | 'Media' | 'Alta';
}