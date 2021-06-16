import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrganizationTable1623799815969 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

        await queryRunner.createTable(new Table({
            name: "organization",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: 'uuid_generate_v4()'
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "photo",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "varchar"
                },
                {
                    name: "category",
                    type: "varchar"
                },
                {
                    name: "phone",
                    type: "varchar"
                },
                {
                    name: "street",
                    type: "varchar"
                },
                {
                    name: "number",
                    type: "integer"
                },
                {
                    name: "zipCode",
                    type: "varchar"
                },
                {
                    name: "neighborhood",
                    type: "varchar"
                },
                {
                    name: "complement",
                    type: "varchar"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("organization")
        await queryRunner.query('DROP EXTENSION "uuid-ossp"')
    }
}
