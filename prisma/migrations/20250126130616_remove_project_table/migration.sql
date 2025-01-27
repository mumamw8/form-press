/*
  Warnings:

  - You are about to drop the column `projectId` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_projectId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_createdById_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_workspaceId_fkey";

-- AlterTable
ALTER TABLE "forms" DROP COLUMN "projectId";

-- DropTable
DROP TABLE "projects";
