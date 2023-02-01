
			
import type { Prisma } from '@prisma/client';
import { z } from 'zod';

const literal = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const jsonValue: z.ZodSchema<Prisma.JsonValue> = z.lazy(() =>
	z.union([literal, z.array(jsonValue), z.record(jsonValue)])
);
const jsonSchema: z.ZodSchema<Prisma.InputJsonValue> = z.lazy(() =>
	z.union([z.undefined(), literal, z.array(jsonValue), z.record(jsonValue)])
);


			export type Include = Prisma.HasInclude;
			export type Fields = Prisma.UserSelect;
			export type Distinct = Prisma.Enumerable<Prisma.UserScalarFieldEnum>;
			export type Query = Prisma.UserWhereInput;
			export type QueryUnique = Prisma.UserWhereUniqueInput;
			export type QueryOptions = {
				orderBy?: Prisma.UserOrderByWithAggregationInput;
				limit?: number;
				offset?: number;
				include?: Include;
				fields?: Fields;
				distinct?: Distinct;
			};

			export type User = z.infer<typeof schema>
			export const schema = z.object({ id: z.string().min(25).optional(),email: z.string().email(),firstName: z.string(),lastName: z.string(),password: z.string(),isTrainer: z.boolean(),verifyToken: z.string(),avatar: z.string(),isPremium: z.boolean().optional(),deleted: z.boolean().optional(),accountStatus: z.string().optional(),profileId: z.string().optional(),created_at: z.union([z.string(), z.date()]).optional() });
			export const empty = { email: '',firstName: '',lastName: '',password: '',isTrainer: false,verifyToken: '',avatar: '',isPremium: false,deleted: false,accountStatus: '',profileId: '',created_at: new Date() };
			 
			export function toDraft() {
				const data = { ...empty } as User;
				const selected = schema.pick({ email: true,firstName: true,lastName: true,password: true,isTrainer: true,verifyToken: true,avatar: true,isPremium: true,deleted: true,accountStatus: true,profileId: true,created_at: true })

				return { data, schema: selected };
			}

			
		