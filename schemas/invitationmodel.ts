
			
import type { Prisma } from '@prisma/client';
import { z } from 'zod';

const literal = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const jsonValue: z.ZodSchema<Prisma.JsonValue> = z.lazy(() =>
	z.union([literal, z.array(jsonValue), z.record(jsonValue)])
);


			export type Include = Prisma.HasInclude;
			export type Fields = Prisma.InvitationModelSelect;
			export type Distinct = Prisma.Enumerable<Prisma.InvitationModelScalarFieldEnum>;
			export type Query = Prisma.InvitationModelWhereInput;
			export type QueryUnique = Prisma.InvitationModelWhereUniqueInput;
			export type QueryOptions = {
				orderBy?: Prisma.InvitationModelOrderByWithAggregationInput;
				limit?: number;
				offset?: number;
				include?: Include;
				fields?: Fields;
				distinct?: Distinct;
			};

			export type InvitationModel = z.infer<typeof schema>
			export const schema = z.object({ id: z.string().min(25).optional(),name: z.string(),eventType: z.string(),componentName: z.string(),isPremium: z.boolean().optional(),deleted: z.boolean().optional(),created_at: z.union([z.string(), z.date()]).optional() });
			export const empty = { name: '',eventType: '',componentName: '',isPremium: false,deleted: false,created_at: new Date() };
			 
			export function toDraft() {
				const data = { ...empty } as InvitationModel;
				const selected = schema.pick({ name: true,eventType: true,componentName: true,isPremium: true,deleted: true,created_at: true })

				return { data, schema: selected };
			}

			
		