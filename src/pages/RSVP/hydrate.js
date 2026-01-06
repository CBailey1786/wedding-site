import { DIET_KEYS, EVENT_KEYS } from "./constants";

export function hydrateDietaryFromFood(food) {
    const dbValue = food?.dietary_requirements;

    // ✅ preserve null
    if (dbValue === null || dbValue === undefined) {
        return null;
    }

    // explicitly "no"
    if (dbValue === false) {
        return { hasRequirements: "no", options: [], other: "" };
    }

  const raw = (food?.dietary_requirements_details ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const normalize = (t) => t.toLowerCase().replace(/\s+/g, "_");
  const normalized = raw.map(normalize);

  const options = normalized.filter((t) => DIET_KEYS.includes(t));

  const otherDetails = raw
    .filter((s) => !DIET_KEYS.includes(normalize(s)))
    .join(", ");

  return {
    hasRequirements: "yes",
    options,
    other: otherDetails,
  };
}

export function hydrateHotels(hotels) {
  const dbValue = hotels?.hotel ?? null;

    // ✅ preserve null
    if (dbValue === null || dbValue === undefined) {
        return null;
    }

  if (dbValue === "grosvenor" || dbValue === "treehouse") {
    return { hotel: dbValue, otherHotel: "" };
  }

  return { hotel: "other", otherHotel: dbValue ?? "" };
}

export function hydrateTransport(hotels) {
  if (hotels?.transport_required === true) return "accept";
  if (hotels?.transport_required === false) return "decline";
  return null;
}

// NOTE: your current call site passes guest.events into this.
// Adjust if you actually want guest.has_RSVP or guest.events.rsvp etc.
export function hydrateAttending(eventsRow) {
  if (eventsRow?.rsvp === true) return "accept";
  return "decline";
}

export function hydrateAnswersFromGuest(guest) {
  return {
    attending: hydrateAttending(guest.events),

    events: EVENT_KEYS
      .filter((key) => guest.events?.[key] === true)
      .map((key) => key.replace("attending_", "")),

    starter: guest.food?.starter ?? null,
    main: guest.food?.main ?? null,

    dietary: hydrateDietaryFromFood(guest.food),

    hotel: hydrateHotels(guest.hotels) ?? null,
    transport: hydrateTransport(guest.hotels) ?? null,

    email: guest.events?.email ?? "",

    plusOne: {
  first_name: guest.first_name ?? "",
  last_name: guest.last_name ?? "",
},
  };
}
