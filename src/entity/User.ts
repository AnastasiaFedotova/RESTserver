import {Entity, Column, BaseEntity, PrimaryColumn} from "typeorm";

@Entity({name: 'users'})
export default class User extends BaseEntity {
    @PrimaryColumn()
    id?: string;

    @Column()
    password!: string;

    @Column()
    login!: string;

    @Column()
    name!: string;
}
