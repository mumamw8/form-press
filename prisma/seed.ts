import { PrismaClient } from '@prisma/client';
import { RoleTypeEnum, RolePermissions } from './constants';

const prisma = new PrismaClient();

async function seedRoles() {
  for (const roleType of RoleTypeEnum.options) {
    const permissions = RolePermissions[roleType];
    await prisma.role.upsert({
      where: { name: roleType },
      update: {},
      create: {
        name: roleType,
        permissions,
      },
    });
  }
}

async function main() {
  await seedRoles();
  console.log('Database has been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
