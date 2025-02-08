-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_createdById_fkey";

-- AlterTable
ALTER TABLE "forms" ALTER COLUMN "createdById" DROP NOT NULL;
