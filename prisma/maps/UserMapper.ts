

import { User } from '@/lib/entities/User';
import { User as PrismaUserModel } from '@prisma/client';

export const mapPrismaUserToEntity = (prismaUser: PrismaUserModel): User => {
  return new User(
    prismaUser.id,
    prismaUser.firstName,
    prismaUser.lastName,
    prismaUser.email,
    prismaUser.passwordEnabled,
    prismaUser.emailVerified,
    prismaUser.image,
    prismaUser.createdAt,
    prismaUser.lastLoginAt,
    prismaUser.username,
    prismaUser.tfaEnabled,
    prismaUser.birthday,
    prismaUser.gender,

  );
};

export const mapEntityToPrismaUser = (user: User): PrismaUserModel => {
    
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    image: user.image,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
    username: user.username,
    tfaEnabled: user.tfaEnabled,
    birthday: user.birthday,
    gender: user.gender,
    passwordEnabled: user.passwordEnabled,
    emailVerified: user.emailVerified,
  };
};
