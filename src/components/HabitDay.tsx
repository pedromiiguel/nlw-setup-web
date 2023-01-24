import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';

interface HabitDayProps {
  defaultCompleted?: number;
  amount?: number;
  date: Date;
}

export const HabitDay = ({
  defaultCompleted = 0,
  amount = 0,
  date
}: HabitDayProps) => {
  const [completed, setCompleted] = useState(defaultCompleted);
  const completedPercent =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  const handleCompletedChange = (completed: number) => {
    setCompleted(completed);
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <div
          className={clsx(
            'w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background',
            {
              'bg-zinc-900 border-zinc-800': completedPercent === 0,
              'bg-violet-900 border-violet-800':
                completedPercent > 0 && completedPercent < 20,
              'bg-violet-800 border-violet-700':
                completedPercent >= 20 && completedPercent < 40,
              'bg-violet-700 border-violet-600':
                completedPercent >= 40 && completedPercent < 60,
              'bg-violet-600 border-violet-500':
                completedPercent >= 60 && completedPercent < 80,
              'bg-violet-500 border-violet-400': completedPercent >= 80
            }
          )}
        />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] w-full bg-zinc-900 p-6 rounded-2xl flex flex-col">
          <Popover.Arrow width={16} height={8} className="fill-zinc-900" />
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercent} />
          <HabitsList date={date} onCompletedChanged={handleCompletedChange} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
