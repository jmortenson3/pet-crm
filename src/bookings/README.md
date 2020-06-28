#### Booking Flow

This is the flow that a user will go through to create a booking.

1. A customer/client creates a booking request. - `booking.entity.ts`
2. They add their pets to the booking. - `pet.entity.ts`, `booking-details.entity.ts`
3. They are asked what kind of booking it is: "Select the type of appointment: Grooming, Boarding, etc.". - `booking-details.entity.ts` properties.
4. They are asked to fill in details for each pet. - `boarding-details.entity.ts` and/or `grooming-details.entity.ts`

#### Relationships

This is a brief description of the entity relationships in a booking.

- 1 `booking` to M `booking-details`
- 1 `booking-details` to 1 `pet`
- 1 `booking-details` to 1 `boarding-details`
- 1 `booking-details` to 1 `grooming-details`
