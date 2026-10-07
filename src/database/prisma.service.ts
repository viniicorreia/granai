import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class PrismaService implements OnModuleDestroy {
  readonly db = db;

  async onModuleInit() {
    await this.db.connect();
  } 

  get orm() {
    return this.db.orm;
  }

  async onModuleDestroy() {
    await this.db.close();
  }

}
