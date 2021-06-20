import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateMainTables1624212633662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "login",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "name",
                    type: "varchar",
                }
            ]
        }), true)

        await queryRunner.createTable(new Table({
            name: "tasks",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "order",
                    type: "numeric",
                    isNullable: false
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "userId",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "boardId",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "columnId",
                    type: "varchar",
                    isNullable: true,
                }
            ]
        }), true, true)

        await queryRunner.createTable(new Table({
            name: "boards",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "columns",
                    type: "JSON",
                    isNullable: false
                }
            ]
        }), true)

        await queryRunner.createForeignKey("tasks", new TableForeignKey({
            columnNames: ["boardId"],
            referencedColumnNames: ["id"],
            referencedTableName: "boards",
            onDelete: "CASCADE"
        }));
    }

    public async down(_: QueryRunner): Promise<void> {
        _;
    }

}
