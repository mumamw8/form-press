-- CreateEnum
CREATE TYPE "FormStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED');

-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "status" "FormStatus" NOT NULL DEFAULT 'DRAFT';
