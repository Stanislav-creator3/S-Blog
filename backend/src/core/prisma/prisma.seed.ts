import { Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '../../../prisma/generated';
import { Faker, ru } from '@faker-js/faker';
import { hash } from 'argon2';

const faker = new Faker({
  locale: ru,
});

const prisma = new PrismaClient({
  transactionOptions: {
    maxWait: 5000,
    timeout: 10000,
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
  },
});

async function main() {
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.socialLink.deleteMany(),
    prisma.post.deleteMany(),
  ]);
  const users = [];

  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: await hash('123456'),
        username: faker.internet.username(),
        displayName: faker.person.fullName(),
        bio: faker.lorem.sentence(),
        // isVerified: faker.datatype.boolean(),
        // isEmailVerified: faker.datatype.boolean(),
        // isTotpEnabled: faker.datatype.boolean(),
        // totpSecret: faker.datatype.uuid(),
        // isDeactivated: false,
        posts: {
          create: Array.from({ length: 10 }).map(() => ({
            title: faker.lorem.words(5),
            content: faker.lorem.paragraph(),
            imageUrl: faker.image.dataUri(),
            tags: [faker.lorem.word(), faker.lorem.word()],
            createdAt: faker.date.past(),
          })),
        },
        socialLinks: {
          create: [
            {
              title: 'GitHub',
              url: 'https://github.com/' + faker.internet.username(),
              position: 1,
            },
            {
              title: 'Twitter',
              url: 'https://twitter.com/' + faker.internet.username(),
              position: 2,
            },
          ],
        },
      },
    });

    users.push(user);
  }

  // Создание подписок (Follow)
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (i !== j) {
        await prisma.follow.create({
          data: {
            followerId: users[i].id,
            followingId: users[j].id,
          },
        });
      }
    }
  }
}

main()
  .then(() => {
    Logger.log('Заполнение базы данных завершено успешно');
    return prisma.$disconnect();
  })
  .catch((e) => {
    Logger.error(e);
    return prisma.$disconnect();
  });
