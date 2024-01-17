"use server";

import { getDb } from "../db";
import { auth } from "@/auth";
import { SAResponse } from "../types";
import {
  TProfileSettingFormSchema,
  profileSettingFormSchema
} from "@/app/(root)/profile/setting/_components/profile-setting-form/schema";

/**
 * Retrieves the profile settings for a given login. If the user does not have any profile settings, it will return defaults.
 * @param login - The login of the user.
 * @returns A Promise that resolves to an object containing the profile settings data and any potential error.
 */
export async function getProfileSettings(
  login: string
): Promise<SAResponse<TProfileSettingFormSchema>> {
  const db = await getDb();
  const res = await db.collection("profileSettings").findOne({ login: login });
  return { data: profileSettingFormSchema.parse(res), error: null };
}

/**
 * Updates the profile settings for current user. If the user does not have any profile settings, it will create a new document.
 *
 * @param payload - The profile settings to be updated.
 * @returns A promise that resolves to a SAResponse object containing a boolean indicating success and an error message if applicable.
 */
export async function putProfileSettings(
  payload: TProfileSettingFormSchema
): Promise<SAResponse<boolean>> {
  const session = await auth();
  if (!session) {
    return { data: null, error: "not authenticated" };
  }
  const login = session.user.login;
  const db = await getDb();
  const res = await db
    .collection("profileSettings")
    .findOneAndUpdate(
      { login: login },
      { $set: { ...payload, login: login } },
      { upsert: true }
    );
  if (!res) {
    console.log(res);
    return { data: null, error: "Something went wrong" };
  }
  return { data: true, error: null };
}
