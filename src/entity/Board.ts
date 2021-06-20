import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity({name: 'board'})
export class Board extends BaseEntity {
@PrimaryGeneratedColumn()
    id!: string;

    @Column()
    title!: string;

    @Column()
    columns!: { id: string; title: string; order: number; }[];
}
