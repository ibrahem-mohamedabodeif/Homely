import { Calender } from "./calender";

export default function SelectDates(searchParams: any) {
  return (
    <div className="mt-5 pb-5">
                <div className="mb-10">
                  <h1 className="text-2xl font-medium pb-3">
                    Select Bookings Dates</h1>
                  <span className="text-base font-light"> Add your travel dates for exact pricing</span>
                </div>
                <div className="flex justify-start">
                  <Calender searchParams={searchParams} />
                </div>
              </div>
  )
}
