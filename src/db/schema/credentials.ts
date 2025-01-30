import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

export const trashbinCredentials = pgTable("trashbin_credentials", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid())
    .notNull(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const selectTrashbinCredential = createSelectSchema(trashbinCredentials);

export const insertTrashbinCredential = createInsertSchema(
  trashbinCredentials,
  {
    username: (schema) => schema.nonempty(),
    password: (schema) => schema.nonempty(),
  },
)
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .required();

export const updateTrashbinCredential = insertTrashbinCredential.partial();
