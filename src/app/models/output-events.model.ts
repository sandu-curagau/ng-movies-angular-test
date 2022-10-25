import { NavbarEventTypes } from "../enums/event-types.enum";

export interface NavbarEvent {
  data: any;
  eventType: NavbarEventTypes;
}
