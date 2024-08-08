"use client";
import { format, parse } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange, DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

export function Calender({
  searchParams,
}: {
  searchParams: {
    startDay: string;
    endDay: string;
  };
}) {
  const defaultClassNames = getDefaultClassNames();
  const [range, setRange] = useState<DateRange | undefined>();
  const router = useRouter();

  useEffect(() => {
    if (searchParams?.startDay && searchParams?.endDay) {
      setRange({
        from: parse(searchParams.startDay, "yyyy-MM-dd", new Date()),
        to: parse(searchParams.endDay, "yyyy-MM-dd", new Date()),
      });
    }
  }, [searchParams]);

  const handleDate = (range: DateRange | undefined) => {
    setRange(range);

    if (range?.from && range?.to) {
      const startDay = format(range.from, "yyyy-MM-dd");
      const endDay = format(range.to, "yyyy-MM-dd");
      const nights = Math.ceil(
        (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
      );
      router.push(`?startDay=${startDay}&endDay=${endDay}&nights=${nights}`, {
        scroll: false,
      });
    }
  };

  return (
    <DayPicker
      // numberOfMonths={2}
      mode="range"
      selected={range}
      onSelect={handleDate}
      classNames={{
        chevron: `${defaultClassNames.chevron}: fill-gray-700`,
        // selected: `bg-gray-300 border-gray-300 rounded-full`,
      }}
    />
  );
}
