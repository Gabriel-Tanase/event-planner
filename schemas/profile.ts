
			
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
			export type Fields = Prisma.ProfileSelect;
			export type Distinct = Prisma.Enumerable<Prisma.ProfileScalarFieldEnum>;
			export type Query = Prisma.ProfileWhereInput;
			export type QueryUnique = Prisma.ProfileWhereUniqueInput;
			export type QueryOptions = {
				orderBy?: Prisma.ProfileOrderByWithAggregationInput;
				limit?: number;
				offset?: number;
				include?: Include;
				fields?: Fields;
				distinct?: Distinct;
			};

			export type Profile = z.infer<typeof schema>
			export const schema = z.object({ id: z.string().min(25).optional(),created_at: z.union([z.string(), z.date()]).optional(),introduction: z.string().optional(),testimonial: z.string().optional(),sports: z.array(z.string()),sessionTypes: z.array(z.string()),sessionLocations: z.array(z.string()),userId: z.string() });
			export const empty = { created_at: new Date(),introduction: '',testimonial: '',sports: [],sessionTypes: [],sessionLocations: [],userId: '' };
			 
			export function toDraft() {
				const data = { ...empty } as Profile;
				const selected = schema.pick({ created_at: true,introduction: true,testimonial: true,sports: true,sessionTypes: true,sessionLocations: true,userId: true })

				return { data, schema: selected };
			}

			
		