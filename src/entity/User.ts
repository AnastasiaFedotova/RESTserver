import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    password!: string;

    @Column()
    login!: string;

    @Column()
    name!: string;
}
