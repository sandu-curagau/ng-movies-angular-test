import { FilterWithOptionsEventTypes, NavbarEventTypes } from "../enums/event-types.enum";

export interface NavbarEvent {
  data: any;
  eventType: NavbarEventTypes;
}

export interface FilterWithOptionsEvent {
  data: any;
  eventType: FilterWithOptionsEventTypes;
}
