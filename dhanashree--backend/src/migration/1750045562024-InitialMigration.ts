import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1750045562024 implements MigrationInterface {
    name = 'InitialMigration1750045562024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'admin', "phoneNumber" character varying, "refreshToken" text, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, "url" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'normal', "propertyId" uuid, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ward" ("id" SERIAL NOT NULL, "ward_number" integer NOT NULL, "ward_number_nepali" character varying NOT NULL, "municipality_id" integer, CONSTRAINT "PK_e6725fa4a50e449c4352d2230e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "municipality" ("id" SERIAL NOT NULL, "municipality_title" character varying NOT NULL, "municipality_title_nepali" character varying NOT NULL, "code" integer NOT NULL, "district_id" integer, CONSTRAINT "PK_281ad341f20df7c41b83a182e2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "province" ("id" SERIAL NOT NULL, "province_title" character varying NOT NULL, "province_title_nepali" character varying NOT NULL, "code" integer NOT NULL, CONSTRAINT "PK_4f461cb46f57e806516b7073659" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "district" ("id" SERIAL NOT NULL, "district_title" character varying NOT NULL, "district_title_nepali" character varying NOT NULL, "code" integer NOT NULL, "province_id" integer, CONSTRAINT "PK_ee5cb6fd5223164bb87ea693f1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, "provinceId" integer, "districtId" integer, "municipalityId" integer, "wardId" integer, "propertyId" uuid, CONSTRAINT "REL_da473673bcc33d4cf91cf39187" UNIQUE ("propertyId"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."booking_status_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'success')`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, "date" TIMESTAMP NOT NULL, "message" character varying, "isVerified" boolean NOT NULL DEFAULT false, "status" "public"."booking_status_enum" NOT NULL DEFAULT 'pending', "adminConfirmedAt" TIMESTAMP, "emailSentCount" integer NOT NULL DEFAULT '0', "lastEmailSentAt" TIMESTAMP, "userId" uuid, "propertyId" uuid, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."property_type_enum" AS ENUM('land', 'house', 'apartment', 'flat', 'space')`);
        await queryRunner.query(`CREATE TYPE "public"."property_status_enum" AS ENUM('latest', 'exclusive', 'featured', 'emerging', 'sold')`);
        await queryRunner.query(`CREATE TYPE "public"."property_purpose_enum" AS ENUM('rent', 'sale')`);
        await queryRunner.query(`CREATE TABLE "property" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, "propertyCode" character varying NOT NULL, "price" integer, "type" "public"."property_type_enum" NOT NULL, "status" "public"."property_status_enum" NOT NULL, "purpose" "public"."property_purpose_enum" NOT NULL, "details" jsonb, "addressId" uuid, "adminId" uuid, CONSTRAINT "UQ_ed05a20f49e070e088668b2711f" UNIQUE ("propertyCode"), CONSTRAINT "REL_276968c3960cc79910f8ef3cf4" UNIQUE ("addressId"), CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."request_listing_status_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'success')`);
        await queryRunner.query(`CREATE TABLE "request_listing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, "date" TIMESTAMP NOT NULL, "message" text, "isVerified" boolean NOT NULL DEFAULT false, "status" "public"."request_listing_status_enum" NOT NULL DEFAULT 'pending', "adminConfirmedAt" TIMESTAMP, "lastEmailSentAt" TIMESTAMP, "emailSentCount" integer NOT NULL DEFAULT '0', "address" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_81109f15347f8040e0e469f0bec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_e87199b269a72d071b3f4ff3b02" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ward" ADD CONSTRAINT "FK_c4fde0cc758686d4462ad1480a8" FOREIGN KEY ("municipality_id") REFERENCES "municipality"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "municipality" ADD CONSTRAINT "FK_1b013b7bf24cc1b204e596f6038" FOREIGN KEY ("district_id") REFERENCES "district"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "district" ADD CONSTRAINT "FK_20bbec53bfceb008df55035d900" FOREIGN KEY ("province_id") REFERENCES "province"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_6b08d352c02976faa2b4b2933c3" FOREIGN KEY ("provinceId") REFERENCES "province"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_89e09cf52a27eec4a04378bbdda" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_b592500e7d709b30397cfb513e6" FOREIGN KEY ("municipalityId") REFERENCES "municipality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_36a5ea1bf9f1a45fc696628bda2" FOREIGN KEY ("wardId") REFERENCES "ward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_da473673bcc33d4cf91cf391876" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_aaacfb3ddf4c074dc358a9a94a0" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_276968c3960cc79910f8ef3cf4b" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_fb6865b1cdd830fc1c7e50c62e8" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request_listing" ADD CONSTRAINT "FK_b941e71b30211a441b463bd544b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request_listing" DROP CONSTRAINT "FK_b941e71b30211a441b463bd544b"`);
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_fb6865b1cdd830fc1c7e50c62e8"`);
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_276968c3960cc79910f8ef3cf4b"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_aaacfb3ddf4c074dc358a9a94a0"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_da473673bcc33d4cf91cf391876"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_36a5ea1bf9f1a45fc696628bda2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_b592500e7d709b30397cfb513e6"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_89e09cf52a27eec4a04378bbdda"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_6b08d352c02976faa2b4b2933c3"`);
        await queryRunner.query(`ALTER TABLE "district" DROP CONSTRAINT "FK_20bbec53bfceb008df55035d900"`);
        await queryRunner.query(`ALTER TABLE "municipality" DROP CONSTRAINT "FK_1b013b7bf24cc1b204e596f6038"`);
        await queryRunner.query(`ALTER TABLE "ward" DROP CONSTRAINT "FK_c4fde0cc758686d4462ad1480a8"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_e87199b269a72d071b3f4ff3b02"`);
        await queryRunner.query(`DROP TABLE "request_listing"`);
        await queryRunner.query(`DROP TYPE "public"."request_listing_status_enum"`);
        await queryRunner.query(`DROP TABLE "property"`);
        await queryRunner.query(`DROP TYPE "public"."property_purpose_enum"`);
        await queryRunner.query(`DROP TYPE "public"."property_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."property_type_enum"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TYPE "public"."booking_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "district"`);
        await queryRunner.query(`DROP TABLE "province"`);
        await queryRunner.query(`DROP TABLE "municipality"`);
        await queryRunner.query(`DROP TABLE "ward"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
