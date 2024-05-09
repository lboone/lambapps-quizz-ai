import React from 'react'
import { clsx } from 'clsx'
import { cn } from '@/lib/utils'

type Props = {
    isCorrect: boolean | null,
    correctAnswer: string
}
const ResultCard = (props: Props) => {
  const { isCorrect, correctAnswer } = props;
  if(isCorrect === null){
    return null;
  }
  const text = isCorrect ? 'Correct!' : `Incorrect! The correct answer is ${correctAnswer}`; 

  const borderClasses = {
    'border-green-500': isCorrect,
    'border-red-500': !isCorrect,
  }
  return (
    <div className={cn(borderClasses,"border-2","rounded-lg","p-4","text-center","text-lg","font-semibold","my-4","bg-secondary")}>
    {isCorrect ? (
        <span className="text-green-500 uppercase text-2xl font-bold">Correct</span>
    ) : (
        <span><span className="text-red-500 uppercase block font-bold text-2xl">Incorrect!</span> <span className="block">The correct answer is:</span> "{correctAnswer}"</span> 
    )}
    </div>
  )
}

export default ResultCard