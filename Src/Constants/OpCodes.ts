export enum OPCODE {
Dispatch = 0,//	Receive	An event was dispatched.
Heartbeat = 1,//	Send/Receive	Fired periodically by the client to keep the connection alive.
Identify = 2,//	Starts a new session during the initial handshake.
Presence_Update	= 3, //Update the client's presence.
Voice_State_Update = 4,	//Used to join/leave or move between voice channels.
Resume = 6,	//Resume a previous session that was disconnected.
Reconnect = 7,//Receive	You should attempt to reconnect and resume immediately.
Request = 8,//Guild Members	Send	Request information about offline guild members in a large guild.
Invalid = 9,//Session	Receive	The session has been invalidated. You should reconnect and identify/resume accordingly.
Hello = 10,//Sent immediately after connecting, contains the heartbeat_interval to use.
Heartbeat_ACK = 11//Sent in response to receiving a heartbeat to acknowledge that it has been received.
}