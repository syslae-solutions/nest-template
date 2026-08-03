import { prisma } from '@/lib/prisma';
import { UserRole } from '../generated/client';
import { hash } from 'bcryptjs';
import 'dotenv/config';

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'default' },
    update: {
      name: 'Default Tenant',
      isActive: true,
    },
    create: {
      name: 'Default Tenant',
      slug: 'default',
      isActive: true,
    },
  });

  const passwordHash = await hash('password', 8);

  const existingUser = await prisma.user.findUnique({
    where: { email: 'admin@syslae.com' },
  });

  if (existingUser) {
    await prisma.user.update({
      where: {
        email: 'admin@syslae.com',
      },
      data: {
        tenantId: tenant.id,
        name: 'Template Admin',
        phone: '85999999999',
        password: passwordHash,
        role: UserRole.admin,
      },
    });
  } else {
    await prisma.user.create({
      data: {
        tenantId: tenant.id,
        name: 'Template Admin',
        email: 'admin@syslae.com',
        phone: '85999999999',
        password: passwordHash,
        role: UserRole.admin,
      },
    });
  }

  console.info('Seed executado com sucesso.');
  console.info('Tenant slug: default');
  console.info('Admin email: admin@syslae.com');
  console.info('Admin password: password');
}

main()
  .catch((error) => {
    console.error('Erro ao executar seed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
