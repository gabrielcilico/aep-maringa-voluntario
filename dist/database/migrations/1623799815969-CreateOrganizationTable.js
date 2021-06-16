"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrganizationTable1623799815969 = void 0;
const typeorm_1 = require("typeorm");
class CreateOrganizationTable1623799815969 {
    async up(queryRunner) {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("organization");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}
exports.CreateOrganizationTable1623799815969 = CreateOrganizationTable1623799815969;
