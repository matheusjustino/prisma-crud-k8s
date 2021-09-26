import { INestApplication } from '@nestjs/common';

export const PRISMA_SERVICE = 'PRISMA SERVICE';
export interface IPrismaService {
	onModuleInit(): Promise<void>;
	onModuleDestroy(): Promise<void>;
	enableShutdownHooks(app: INestApplication): Promise<void>;
}
