import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity({name: 'user'})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    password!: string;

    @Column()
    login!: string;

    @Column()
    name!: string;
}
