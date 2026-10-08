import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";
import { db } from "../../../prisma/db.js";

type UserCreateInput = Parameters<
  typeof db.orm.public.User.create
>[0];

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}
  
  create(data : UserCreateInput){
    return this.prismaService.orm.public.User.create(data);
  }

  findByEmail(email: string) {
    return this.prismaService.orm.public.User.where({ email }).first();
  }
}