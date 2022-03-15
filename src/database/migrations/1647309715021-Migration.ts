import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1647309715021 implements MigrationInterface {
  name = 'Migration1647309715021'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "user_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
    await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")`);
    await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "userId" uuid`);
    await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
}
