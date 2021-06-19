import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    title!: string;

    @Column()
    columns!: { id: string; title: string; order: number; }[];
}
