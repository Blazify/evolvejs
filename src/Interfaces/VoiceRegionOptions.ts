export interface IVoiceRegion {
  id: string; // Unique ID for the region
  name: string; // Name of the region
  vip: boolean; // Whether this is a vip-only server
  optimal: boolean; // Whether this is closest to the current user's client
  deprecated: boolean; // Whether this is a deprecated voice region (avoid switching to these)
  custom: boolean; // Whether this is a custom voice region (used for events/etc)
}
