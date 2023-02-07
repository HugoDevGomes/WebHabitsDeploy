import   * as Checkbox  from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface HabitListProps {
    date: Date
    onCompletedChange: (completed: number) => void
}

interface HabitsInfo {
    possibleHabits: {
        id: string,
        userId: string,
        title: string,
        created_at: string,
    }[]
    completedHabits: string[]
}

export function HabitList ({date, onCompletedChange}: HabitListProps){
    const [habitInfo, setHabitInfo] = useState<HabitsInfo>()


    useEffect(() => {
        api.get('/day', {
            params: {
                date: date.toISOString()
            }
        }).then(response => {
            setHabitInfo(response.data);
        })
    }),[]

    async function handleToggleHabit(habitId: string){
        const isHabitAlreadyCompleted = habitInfo!.completedHabits.includes(habitId)

        await api.patch(`/habits/${habitId}/toggle`)

        let completedHabits: string[] = []

        if (isHabitAlreadyCompleted) {
            completedHabits = habitInfo!.completedHabits.filter(id => id !== habitId)

        } else {
            completedHabits = [...habitInfo!.completedHabits, habitId]
        }
        setHabitInfo({
            possibleHabits: habitInfo!.possibleHabits,
            completedHabits,
        })

        onCompletedChange(completedHabits.length)
    }

    const isDateInPast = dayjs(date).
    endOf('day').
    isBefore(new Date())   

            return (
                    <div className='mt-6 flex flex-col gap-3'>
                        {habitInfo?.possibleHabits.map(habit => {
                            return (
                                <Checkbox.Root
                                key={habit.id}
                                onCheckedChange={() => 
                                    handleToggleHabit(habit.id)
                                }
                                checked={habitInfo.completedHabits.includes(habit.id)}
                                disabled={isDateInPast}
                                className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed '
                                >
                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 focus:ring-violet-800 focus:ring-offset-2 focus:ring-offset-background'>
                            <Checkbox.Indicator>
                                <Check size={20} className='text-white'/>
                            </Checkbox.Indicator>
                            </div>

                            <span className='font-semibold text-xl text-zinc-200 leading-tight group-data-[state=checked]:line-through'>
                                {habit.title}
                            </span>
                        </Checkbox.Root>
                            )
                        })}



                        

                    </div>
)
}