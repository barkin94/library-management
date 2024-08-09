import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1722974456439 implements MigrationInterface {
    name = 'Init1722974456439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_return" ("id" SERIAL NOT NULL, "returned_at" TIMESTAMP WITH TIME ZONE NOT NULL, "rating" integer NOT NULL, "book_borrow_id" integer, CONSTRAINT "REL_26f02a80bd250ff9da7983319a" UNIQUE ("book_borrow_id"), CONSTRAINT "PK_898f1a16f36d8792fa5baf38a8a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_borrow" ("id" SERIAL NOT NULL, "user_id" integer, "book_id" integer, CONSTRAINT "PK_7e6c798bd941b04f7d8bf9cdfb9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "book_return" ADD CONSTRAINT "FK_26f02a80bd250ff9da7983319a9" FOREIGN KEY ("book_borrow_id") REFERENCES "book_borrow"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_borrow" ADD CONSTRAINT "FK_8cb271a33ca2fcd7442d52756a2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_borrow" ADD CONSTRAINT "FK_fd4c39fde9d45ef0a0140e185a2" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_borrow" DROP CONSTRAINT "FK_fd4c39fde9d45ef0a0140e185a2"`);
        await queryRunner.query(`ALTER TABLE "book_borrow" DROP CONSTRAINT "FK_8cb271a33ca2fcd7442d52756a2"`);
        await queryRunner.query(`ALTER TABLE "book_return" DROP CONSTRAINT "FK_26f02a80bd250ff9da7983319a9"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "book_borrow"`);
        await queryRunner.query(`DROP TABLE "book_return"`);
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
