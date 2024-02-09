/**
 * User's profile, you can add more fields here
 */

import { relations } from "drizzle-orm";
import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./authjs";

export const profiles = pgTable("profile", {
  id: uuid("id").defaultRandom().primaryKey(),
  isStaff: boolean("isStaff").notNull().default(false),
  isResumePublic: boolean("isResumePublic").notNull().default(false),
  userId: text("userId")
    .unique()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
});

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id]
  })
}));
