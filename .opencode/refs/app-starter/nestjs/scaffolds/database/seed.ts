import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const mobile = '0999999999';
  const email = 'admin@example.app';
  const password = 'password';

  // Create Roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN', description: 'Administrator' },
  });

  await prisma.role.upsert({
    where: { name: 'STAFF' },
    update: {},
    create: { name: 'STAFF', description: 'Staff' },
  });

  await prisma.role.upsert({
    where: { name: 'USER' },
    update: {},
    create: { name: 'USER', description: 'General User' },
  });

  // hash password
  const hashed = await bcrypt.hash(password, 12);

  // Check existing super admin
  const existing = await prisma.user.findFirst({
    where: { mobile }
  });

  if (existing) {
    console.log('Super admin already exists:', existing.mobile);
    return;
  }

  // Create user
  const user = await prisma.user.create({
    data: {
      mobile,
      email,
      password: hashed,
      status: 'active',
      roleId: adminRole.id,
      employeeNo: 'EMP00001',
    },
  });

  console.log('Super admin created:');
  console.log(' User ID:', user.id);
  console.log(' Mobile:', mobile);
  console.log(' Email:', email);
  console.log(' Role:', adminRole.name);
  console.log(' Employee No:', 'EMP00001');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
