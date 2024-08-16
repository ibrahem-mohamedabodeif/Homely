export default function PlaceRule() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-medium">House rules</h1>
        <span>Check-in after 3:00 PM</span>
        <span>Checkout before 10:00 AM</span>
        <span>6 guests maximum</span>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-medium">Safety & property</h1>
        <span>Carbon monoxide alarm not reported</span>
        <span>Smoke alarm not reported</span>
        <span>Not suitable for infants (under 2 years)</span>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-medium">Cancellation policy</h1>
        <span>
          Add your trip dates to get the cancellation details for this stay.
        </span>
      </div>
    </div>
  );
}
