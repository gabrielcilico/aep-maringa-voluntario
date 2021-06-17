import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSubscriptionTable1623886786723 implements MigrationInterface {
    name = 'CreateSubscriptionTable1623886786723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, "organizationId" uuid, "voluntaryId" uuid, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_8ccdfc22892c16950b568145d53" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_4724d1f4a2cd9c7317ed88b3bfa" FOREIGN KEY ("voluntaryId") REFERENCES "voluntary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_4724d1f4a2cd9c7317ed88b3bfa"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_8ccdfc22892c16950b568145d53"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
    }

}
