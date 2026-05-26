import { integer, varchar, pgTable, doublePrecision, timestamp } from "drizzle-orm/pg-core";

export const geoPointTable = pgTable("GEOPOINT", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    longitude: doublePrecision().notNull(),
    latitude: doublePrecision().notNull(),
    timeStamp: timestamp({withTimezone: true}).defaultNow().notNull(),
    batchId: integer().references(() => batchTable.id)
})

export const batchTable = pgTable("BATCH", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    uuid: varchar({length: 32}).notNull().unique()
})

export default { geoPointTable, batchTable }