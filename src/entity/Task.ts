import {Entity, Column, BaseEntity, PrimaryColumn} from "typeorm";

interface task {
  id: string
  title: string
  order: number
  description: string
  userId?: string | null
}

@Entity({name: 'tasks'})
export default class Task extends BaseEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    title!: string;

    @Column()
    order!: number;

    @Column()
    description!: string;

    @Column({type: "varchar"})
    userId?: string | null;

    @Column()
    boardId?: string;

    @Column()
    columnId?: string;

    static toResponse(task: Task): task {
      const { id, title, order, description, userId } = task;
      return { id, title, order, description, userId };
    }
}
