"use server";
import { v4 as uuid } from "uuid";
import prisma from "@/app/lib/prisma";
import { AddRatingRequestBody } from "@/app/types";
import { sleepWhenSlowdown } from "@/app/sleep";
import { revalidatePath } from "next/cache";

export async function addRating({
  beerId,
  username,
  stars,
  comment,
}: AddRatingRequestBody) {
  const errors: Record<string, string> = {};
  if (username.length < 3)
    errors.username = "Username must be at least 3 chars";
  if (stars < 1 || stars > 5) errors.stars = "Stars must be between 1 and 5";
  if (comment.length < 5) errors.comment = "Comment must be at lease 5 chars";

  if (Object.keys(errors).length) {
    return {
      result: "error",
      errors,
      data: { username, stars, comment } as const,
    } as const;
  }

  const id = uuid();
  await prisma.rating.create({
    data: {
      id,
      beerId,
      username,
      stars,
      comment,
    },
  });

  await sleepWhenSlowdown(1600);

  revalidatePath(`/beers/${beerId}`);

  return {
    result: "success",
  } as const;
}
