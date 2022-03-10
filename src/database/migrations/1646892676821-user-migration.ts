import {MigrationInterface, QueryRunner} from "typeorm";

export class userMigration1646892676821 implements MigrationInterface {
    name = 'userMigration1646892676821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "age" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "postsId" integer, CONSTRAINT "PK_a6c6d40f60c114cf5ece402be57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "users_email_index" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_db9b0f25440c663a967abc29712" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_db9b0f25440c663a967abc29712"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP INDEX "public"."users_email_index"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
