export const SUMMARY_STEP = 9;

export const DEFAULT_ANSWERS = {
  attending: null,
  events: [],
  starter: null,
  main: null,
  dietary: "",
  hotel: null,
  transport: null,
  email: "",
  plusOne: { first_name: "", last_name: "" },
};

export const DECLINE_ANSWERS = {
  ...DEFAULT_ANSWERS,
  attending: "decline",
  events: [],
  starter: null,
  main: null,
  dietary: null,
  hotel: null,
  transport: null,
  email: null,
};

export const EDIT_STEP_MAP = {
  rsvp: 1,
  events: 2,
  starter: 3,
  main: 4,
  dietary: 5,
  hotel: 6,
  transport: 7,
  email: 8,
};

// DB keys -> UI event ids
export const EVENT_KEYS = [
  "attending_wedding",
  "attending_welcome_party",
  "attending_farewell_brunch",
  "attending_rehearsal_dinner",
];

export const DIET_KEYS = ["vegetarian", "vegan", "gluten_free", "lactose_free", "other"];
