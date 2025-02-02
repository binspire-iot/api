import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

export const trashbinCredentials = pgTable(
  "trashbin_credentials",
  {
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
  },
  (table) => {
    return {
      usernameIdx: index("username_idx").on(table.username),
    };
  },
);

export const selectTrashbinCredentials =
  createSelectSchema(trashbinCredentials);

export const insertTrashbinCredentials = createInsertSchema(
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

export const updateTrashbinCredentials = insertTrashbinCredentials.partial();
