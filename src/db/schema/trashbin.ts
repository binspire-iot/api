import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { trashbinCredentials } from "./credentials";
import { nanoid } from "nanoid";

export const trashbinsTable = pgTable("trashbins", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid())
    .notNull(),
  name: text("name").notNull(),
  organization: text("organization").notNull(),
  credentialId: text("credential_id")
    .references(() => trashbinCredentials.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const selectTrashbin = createSelectSchema(trashbinsTable);

export const insertTrashbin = createInsertSchema(trashbinsTable, {
  name: (schema) => schema.nonempty(),
  organization: (schema) => schema.nonempty(),
})
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .required();

export const updateTrashbins = insertTrashbin.partial();
