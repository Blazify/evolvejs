export enum OPCODE {
	Dispatch = 0, // Receive an dispatched event.
	Heartbeat = 1, // Send or receive periodically fired heartbeat which keeps connection alive.
	Identify = 2, // Starts a new session during the initial handshake.
	Presence_Update = 3, // Update the client's presence status.
	Voice_State_Update = 4, // Used to join/leave or move between voice channels.
	Resume = 6, // Resume a previous session that was disconnected.
	Reconnect = 7, // When received	attempt to reconnect and resume should be made immediately.
	Request = 8, // Send or request information about offline guild members in a large guild.
	Invalid = 9, // Received when session has been invalidated. You should reconnect and resume accordingly.
	Hello = 10, // Sent immediately after connecting, contains the heartbeat_interval to use.
	Heartbeat_ACK = 11 // Sent in response to receiving a heartbeat to acknowledge that it has been received.
}
