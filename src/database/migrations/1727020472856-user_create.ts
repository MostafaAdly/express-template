import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserCreate1727020472856 implements MigrationInterface {
  name = 'UserCreate1727020472856';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying(255) NOT NULL, "hashed_password" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "isSuperuser" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
