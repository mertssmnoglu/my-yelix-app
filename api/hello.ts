import { Ctx, ValidationType } from "jsr:@murat/yelix";
import { z } from "npm:zod@^3.24.1";

export async function GET(ctx: Ctx) {
  const requestData = ctx.get('dataValidation').user;
  const query: QueryType = requestData.query;

  return await ctx.text('Hello, ' + query.name, 200);
}

export const path = '/api/hello';
export const middlewares = ['dataValidation'];

export const validation: ValidationType = {
  query: {
    name: z.string().min(40),
  },
};
const querySchema = z.object(validation.query as z.ZodRawShape);
type QueryType = z.infer<typeof querySchema>;

export const openAPI = {
  description: '![](https://github.com/mertssmnoglu.png)',
  tags: ['General'],
  title: "Mert",
  responses: {
    200: {
      type: 'application/json',
      zodSchema: z.object({
        username: z.string(),
        email: z.string().email(),
        age: z.number().min(18).max(99),
        friendNames: z.array(z.string()),
        country: z.enum(['USA', 'UK', 'India']),
      }),
    },
  },
};
