import "./db"
import { Hono } from 'hono'
import { batchTable, geoPointTable } from "./db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from 'drizzle-orm/bun-sql'
import { SQL } from 'bun'
import isValidUuid from "./util/util";
const app = new Hono()

const client = new SQL(process.env.DATABASE_URL!)
export const db = drizzle(client)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post("/batch/register", async (c) => {
  const body = await c.req.json()
  if (isValidUuid(body.uuid) != true){
    return c.json({"message": "invalid uuid"}, 400)
  }
  const batchUuid = body.uuid
  console.log(batchUuid)
  try {
  await db.insert(batchTable).values({ uuid: batchUuid }).returning()
  } catch (err) {
    return c.json({"message": "something went wrong or batch already exists"}, 500)
  }
  return c.json({ success: true }, 201)
})

app.post("/ping/:batch",  async (c) => {
  const batchUuid = c.req.param("batch");
    if (isValidUuid(batchUuid) != true){
    return c.json({"message": "invalid uuid"}, 400)
  }
  if (batchUuid == null) {
    return c.json({ error: "Missing batch UUID" }, 400);
  }
  const [batch] = await db.select().from(batchTable).where(eq(batchTable.uuid, batchUuid));
  if (batch == null) {
    return c.json({ error: "Batch not found" }, 404);
  }
  const body = await c.req.json();
  const longitude: number = body.longitude;
  const latitude: number = body.latitude;
  await db.insert(geoPointTable).values({ longitude, latitude, batchId: batch.id });
  return c.json({ success: true }, 201);
});

app.get("/datapoints", async (c) => {
  const dataPoints = await db.select().from(geoPointTable)
  return c.json({"message": "all of the datapoints", "datapoints": dataPoints})
})

export default app
