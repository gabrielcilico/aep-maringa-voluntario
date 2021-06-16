"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVoluntaryTable1623723814787 = void 0;
const typeorm_1 = require("typeorm");
class CreateVoluntaryTable1623723814787 {
    async up(queryRunner) {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new typeorm_1.Table({
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
                    name: "photo",
                    type: "varchar"
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("voluntary");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}
exports.CreateVoluntaryTable1623723814787 = CreateVoluntaryTable1623723814787;
