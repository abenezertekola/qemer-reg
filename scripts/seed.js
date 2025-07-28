const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.course.createMany({
    data: [
      {
        title: "Full-Stack Web Development",
        description: "Learn to build modern web applications.",
        category: "Web Development",
        duration: "3 months"
      },
      {
        title: "Graphics Design",
        description: "Master design tools and principles.",
        category: "Design",
        duration: "2 months"
      },
      {
        title: "App Development",
        description: "Create mobile apps for Android and iOS.",
        category: "Mobile",
        duration: "4 months"
      }
    ]
  });

  // Create a default admin user if not exists
  await prisma.admin.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: 'admin123', // Plain text for now
    },
  });

  console.log("Courses and admin seeded!");
}

main().finally(() => prisma.$disconnect()); 