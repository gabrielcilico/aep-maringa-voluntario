import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateVoluntaryTable1623723814787 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

        await queryRunner.createTable(new Table({
            name: "voluntary",
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
                    name: "birthdate",
                    type: "date"
                },
                {
                    name: "gender",
                    type: "varchar"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("voluntary")
        await queryRunner.query('DROP EXTENSION "uuid-ossp"')
    }

}
