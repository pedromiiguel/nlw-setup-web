import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { api } from '../lib/axios';
import { generateDateFromYearBeginning } from '../utils/generate-dates-from-year-beginning';
import { HabitDay } from './HabitDay';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
};

export const SummaryTable = () => {
  const summaryDays = generateDateFromYearBeginning();

  const minimiumSummaryDatesSize = 18 * 7; //18weeks
  const amountOfDaysToFill = minimiumSummaryDatesSize - summaryDays.length;

  const { data: summary, isLoading } = useQuery(['summary'], async () => {
    const { data } = await api.get<Summary[]>('/summary');
    return data;
  });

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {!isLoading &&
          summaryDays.map((date) => {
            const dayInSummary = summary?.find((day) => {
              return dayjs(date).isSame(day.date, 'day');
            });

            return (
              <HabitDay
                defaultCompleted={dayInSummary?.completed}
                amount={dayInSummary?.amount}
                date={date}
                key={date.toString()}
              />
            );
          })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => (
            <div
              key={index}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          ))}
      </div>
    </div>
  );
};
