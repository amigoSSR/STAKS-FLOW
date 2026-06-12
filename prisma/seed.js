const { PrismaClient } = require('../src/generated/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const userData = [
  { name: 'Ibat I', email: 'sholihulibat_26@kharisma.ac.id', password: '123456' },
  { name: 'Ariel', email: 'arielchristian_26@kharisma.ac.id', password: 'Kharisma#25' },
  { name: 'Rayyan', email: 'muhammadrayyan_24@kharisma.ac.id', password: '123456', role: 'admin' },
  { name: 'Muflihat', email: 'nurmuflihat_24@kharisma.ac.id', password: 'enemypro' },
  { name: 'Andrew', email: 'andrewimanuel_25@kharisma.ac.id', password: 'Epic25Game!' },
  { name: 'Fabio', email: 'fabiojavier_24@kharisma.ac.id', password: 'fabiokharisma02' },
  { name: 'inda', email: 'nurulaswinda_26@kharisma.ac.id', password: '14062006' },
  { name: 'Sammy', email: 'sammyanders_25@kharisma.ac.id', password: 'cingkucingimut05' },
  { name: 'Aurel', email: 'aurel_26@kharisma.ac.id', password: 'sakiara_01' },
  { name: 'Syarifa', email: 'syarifakurniah_25@kharisma.ac.id', password: 'PbSyarifa07' },
  { name: 'jaya', email: 'sahrulmarjayajaya@gmail.com', password: '123' },
  { name: 'Alif', email: 'alifputra_25@kharisma.ac.id', password: '0061121613' },
  { name: 'nando', email: 'fernandochristian_25@kharisma.ac.id', password: 'Flinardy150207' },
  { name: 'Yepta', email: 'yeptaadonia_25@kharisma.ac.id', password: '@Yepta999' }
];

async function main() {
  console.log('Start seeding...');
  
  for (const u of userData) {
    const hashedPassword = await bcrypt.hash(u.password, 10);
    
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        username: u.name,
        email: u.email,
        password: hashedPassword,
        role: 'user'
      }
    });
    
    console.log(`Upserted user: ${user.username} (${user.email})`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
