import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateJobTable1623894459588 implements MigrationInterface {
    name = 'CreateJobTable1623894459588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "job" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, "hoursRegistered" integer NOT NULL, "organizationId" uuid, "voluntaryId" uuid, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "FK_e4d9a1a72f4cfd52e7a07f30e6e" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "FK_299d5c153ea6aa46099f301895c" FOREIGN KEY ("voluntaryId") REFERENCES "voluntary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_299d5c153ea6aa46099f301895c"`);
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_e4d9a1a72f4cfd52e7a07f30e6e"`);
        await queryRunner.query(`DROP TABLE "job"`);
    }

}
