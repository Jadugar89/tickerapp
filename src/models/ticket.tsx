export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  progress: number;
  status: string;
  active: boolean;
  createdAt: Date;
}
