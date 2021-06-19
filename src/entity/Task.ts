import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

interface task {
  id: string
  title: string
  order: number
  description: string
  userId?: string
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    title!: string;

    @Column()
    order!: number;

    @Column()
    description!: string;

    @Column()
    userId?: string;

    @Column()
    boardId?: string;

    @Column()
    columnId?: string;

    static toResponse(task: Task): task {
      const { id, title, order, description, userId } = task;
      return { id, title, order, description, userId };
    }
}
