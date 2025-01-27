/*
  Warnings:

  - You are about to drop the column `ownerId` on the `workspaces` table. All the data in the column will be lost.
  - You are about to drop the `workspace_memberships` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teamId` to the `workspaces` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "workspace_memberships" DROP CONSTRAINT "workspace_memberships_roleId_fkey";

-- DropForeignKey
ALTER TABLE "workspace_memberships" DROP CONSTRAINT "workspace_memberships_userId_fkey";

-- DropForeignKey
ALTER TABLE "workspace_memberships" DROP CONSTRAINT "workspace_memberships_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "workspaces" DROP CONSTRAINT "workspaces_ownerId_fkey";

-- AlterTable
ALTER TABLE "workspaces" DROP COLUMN "ownerId",
ADD COLUMN     "teamId" TEXT NOT NULL;

-- DropTable
DROP TABLE "workspace_memberships";

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_memberships" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "team_memberships_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_memberships" ADD CONSTRAINT "team_memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_memberships" ADD CONSTRAINT "team_memberships_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_memberships" ADD CONSTRAINT "team_memberships_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
