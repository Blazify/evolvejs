import { Objex } from "@evolvejs/objex.ts";
import { Emoji } from "../../Structures/Guild/Emoji.ts";

export class EmojisManager extends Objex<string | null, Emoji> {}
