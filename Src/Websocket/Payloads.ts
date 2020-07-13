import  { Payload } from ".."
import { OPCODE } from "../Constants/OpCodes"
export const Hello: Payload = {
    op: OPCODE.Hello,
    t: null,
    s: null,
    d: null
}

export const Heartbeat: Payload = {
    op: OPCODE.Heartbeat,
    t: null,
    s: null,
    d: null
}

export const Identify: Payload = {
    op: OPCODE.Identify,
    t: null,
    s: null,
    d: {
      token: "",
      properties: {
        $os: "linux",
        $browser: "zodiac_ts",
        $device: "discord"
      }
    }
}