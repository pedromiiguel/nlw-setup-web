/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as Checkbox from '@radix-ui/react-checkbox';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useState } from 'react';
import { api } from '../lib/axios';

interface HabitsListProps {
  date: Date;
  onCompletedChanged: (completes: number) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  useQuery(
    ['day', date],
    async () => {
      const { data } = await api.get<HabitsInfo>('/day', {
        params: { date: date.toISOString() }
      });
      return data;
    },
    {
      onSuccess: (data: HabitsInfo) => {
        setHabitsInfo(data);
      }
    }
  );

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  const { mutateAsync } = useMutation(async (habitId: string) => {
    await api.patch(`/habits/${habitId}/toggle`);
  });

  const handleToggleHabit = async (habitId: string) => {
    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId);

    await mutateAsync(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits
    });

    onCompletedChanged(completedHabits?.length);
  };

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          key={habit.id}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          onCheckedChange={() => {
            handleToggleHabit(habit.id);
          }}
        >
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>
          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
}
