import { v4 as uuidv4 } from "uuid";

export function generateInviteCode(): string {
  return uuidv4();
}
