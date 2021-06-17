"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInviteTable1623813220959 = void 0;
class CreateInviteTable1623813220959 {
    constructor() {
        this.name = 'CreateInviteTable1623813220959';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "invite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, "organizationId" uuid, "voluntaryId" uuid, CONSTRAINT "PK_fc9fa190e5a3c5d80604a4f63e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "UQ_5d06de67ef6ab02cbd938988bb1"`);
        await queryRunner.query(`ALTER TABLE "voluntary" DROP CONSTRAINT "UQ_5e3c2b2cd1214d169e48e41a30e"`);
        await queryRunner.query(`ALTER TABLE "invite" ADD CONSTRAINT "FK_68eef4ab86b67747f24f288a16c" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite" ADD CONSTRAINT "FK_b6809bf9f6511ac6e5376f2d382" FOREIGN KEY ("voluntaryId") REFERENCES "voluntary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "invite" DROP CONSTRAINT "FK_b6809bf9f6511ac6e5376f2d382"`);
        await queryRunner.query(`ALTER TABLE "invite" DROP CONSTRAINT "FK_68eef4ab86b67747f24f288a16c"`);
        await queryRunner.query(`ALTER TABLE "voluntary" ADD CONSTRAINT "UQ_5e3c2b2cd1214d169e48e41a30e" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "UQ_5d06de67ef6ab02cbd938988bb1" UNIQUE ("email")`);
        await queryRunner.query(`DROP TABLE "invite"`);
    }
}
exports.CreateInviteTable1623813220959 = CreateInviteTable1623813220959;
