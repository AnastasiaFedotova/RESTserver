import {MigrationInterface, QueryRunner} from "typeorm";
import bcrypt from 'bcrypt';
import User from "../entity/User";
import * as uuid from "uuid"

export class AddAdminUser1625415520630 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let user = new User();
        user.id = uuid.v4();
        user.login = "admin";
        user.name = "admin"
        user.password = "admin";

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash
        queryRunner.manager.createQueryBuilder()
            .insert()
            .into(User)
            .values(user)
            .execute()
    }

    public async down(_: QueryRunner): Promise<void> {
        _;
    }
}
