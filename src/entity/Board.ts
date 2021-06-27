import {Entity, Column, BaseEntity, PrimaryColumn} from "typeorm";

@Entity({name: 'boards'})
export default class Board extends BaseEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    title!: string;

    @Column({type: "json"})
    columns!: { id: string; title: string; order: number; }[];
}
