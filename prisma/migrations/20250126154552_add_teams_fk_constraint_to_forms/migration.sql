/*
  Warnings:

  - Added the required column `teamId` to the `forms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "teamId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
