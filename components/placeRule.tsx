export default function PlaceRule() {
  return (
    <div className="mt-10 border-t-2 pt-10 pb-5">
      <h1 className="text-2xl font-medium mb-10">Things to know</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-medium">House rules</h1>
          <span className="font-light">Check-in after 3:00 PM</span>
          <span className="font-light">Checkout before 10:00 AM</span>
          <span className="font-light">6 guests maximum</span>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-medium">Safety & property</h1>
          <span className="font-light">Carbon monoxide alarm not reported</span>
          <span className="font-light">Smoke alarm not reported</span>
          <span className="font-light">Not suitable for infants (under 2 years)</span>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-medium">Cancellation policy</h1>
          <span className="font-light">
            Add your trip dates to get the cancellation details for this stay.
          </span>
        </div>
      </div>
    </div>
  );
}
