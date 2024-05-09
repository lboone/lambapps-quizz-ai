"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProgressBar from "@/components/progressBar";
import { ChevronLeft, X } from "lucide-react";
import ResultCard from "./ResultCard";
import QuizzSubmittion from "./QuizzSubmittion";


type Answer = {
    answerText: string;
    isCorrect: boolean;
    id: number;
  };
  type Question = {
    quesitonText: string;
    answers: Answer[];
  };

const questions = [
  {
    quesitonText: "What is React?",
    answers: [
      {
        answerText: "A JavaScript library for building user interfaces",
        isCorrect: false,
        id: 1,
      },
      {
        answerText: "A front-end framework",
        isCorrect: false,
        id: 2,
      },
      {
        answerText: "A framework for building user interfaces",
        isCorrect: true,
        id: 3,
      },
      {
        answerText: "A library for building user interfaces",
        isCorrect: false,
        id: 4,
      },
    ],
  },
  {
    quesitonText: "What is React Native?",
    answers: [
      {
        answerText: "A JavaScript library for building user interfaces",
        isCorrect: false,
        id: 1,
      },
      {
        answerText: "A front-end framework",
        isCorrect: false,
        id: 2,
      },
      {
        answerText: "A framework for building user interfaces",
        isCorrect: true,
        id: 3,
      },
      {
        answerText: "A library for building user interfaces",
        isCorrect: false,
        id: 4,
      },
    ],
  },
  {
    quesitonText: "What is the Virtual DOM?",
    answers: [
      {
        answerText: "A virtual represenation of the DOM",
        isCorrect: true,
        id: 1,
      },
      {
        answerText: "A real DOM",
        isCorrect: false,
        id: 2,
      },
      {
        answerText: "A virtual representation of the browser",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "A virtual representation of the server",
        isCorrect: false,
        id: 4,
      },
    ],
  },
] as Question[];

export default function Home() {
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleNext = () => {
    if (!started) {
      setStarted(true);
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSubmitted(true);
      return;
    }
    setSelectedAnswer(null);
    setIsCorrect(null);
  };
  const handleAnswer = (answer: Answer) => {

    setSelectedAnswer(answer.id);
    const isCurrentCorrect = answer.isCorrect;
    if(isCurrentCorrect){
      setScore(score + 1);
    }
    setIsCorrect(isCurrentCorrect);
  };
  if(submitted){
    return ( <QuizzSubmittion scorePercentage={Math.round(score / questions.length * 100) as number} score={score} totalQuestions={questions.length} /> )
  }
  return (
    <>
      <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
        <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">
          {started ? (
            <Button
              size="icon"
              variant="outline"
              onClick={() =>
                currentQuestion > 0
                  ? setCurrentQuestion(currentQuestion - 1)
                  : setStarted(false)
              }
            >
              <ChevronLeft />
            </Button>
          ) : (
            <Button size="icon" variant="outline">
              
            </Button>
          )}
          <ProgressBar value={(currentQuestion / questions.length) * 100} />
          <Button
            size="icon"
            variant="outline"
            onClick={() => {}}
          >
            <X />
          </Button>
        </header>
      </div>
      <main className="flex justify-center flex-1">
        {!started ? (
          <h1 className="text-3xl font-bold">Welcome to the Quizz Page</h1>
        ) : (
          <div>
            <h2 className="text-3xl font-bold">
              {questions[currentQuestion].quesitonText}
            </h2>
            <div className="grid grid-cols-1 gap-6 mt-6">
              {questions[currentQuestion].answers.map((answer) => {
                const variant = selectedAnswer === answer.id ? (answer.isCorrect ? "neoSuccess" : "neoDanger") : "neoOutline";
                return ( 
                <Button
                  key={answer.id}
                  variant={variant}
                  onClick={() => handleAnswer(answer)}
                  size="xl"
                >
                  <p className="whitespace-normal">{answer.answerText}</p>
                </Button>
              )})}
            </div>
          </div>
        )}
      </main>
      <footer className="footer pb-9 px-6 relative mb-0">
        <ResultCard 
          isCorrect={isCorrect} 
          correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect === true)?.answerText as string} />  
        <Button
          onClick={handleNext}
          variant="neo"
          size="lg"
        >
          {!started ? "Start" : (currentQuestion === questions.length - 1) ? "Submit" : "Next"} 
        </Button>
      </footer>
    </>
  );
}
