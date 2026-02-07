import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Volume2 } from "lucide-react";
import type { TestQuestion as TQuestion, ErrorPattern } from "@/lib/dsm5TestData";

interface TestQuestionProps {
  question: TQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string, responseTime: number, isCorrect: boolean, errorPattern?: ErrorPattern) => void;
  showStimulus?: boolean;
  stimulusDisplayTime?: number;
}

export function TestQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  showStimulus = true,
  stimulusDisplayTime,
}: TestQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [stimulusVisible, setStimulusVisible] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(question.timeLimit || 30);
  const startTime = useRef(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle stimulus display time (for dot estimation tests)
  useEffect(() => {
    if (stimulusDisplayTime && stimulusDisplayTime > 0) {
      setStimulusVisible(true);
      const hideTimer = setTimeout(() => {
        setStimulusVisible(false);
      }, stimulusDisplayTime);
      return () => clearTimeout(hideTimer);
    }
  }, [stimulusDisplayTime, question.id]);

  // Handle countdown timer
  useEffect(() => {
    startTime.current = Date.now();
    setTimeRemaining(question.timeLimit || 30);
    setSelectedOption(null);

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Auto-submit on timeout
          handleSubmit(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [question.id]);

  const handleSubmit = (answer: string | null) => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    const responseTime = (Date.now() - startTime.current) / 1000;
    const correctAnswer = Array.isArray(question.correctAnswer)
      ? question.correctAnswer.join(' ')
      : String(question.correctAnswer);
    const isCorrect = answer === correctAnswer;

    let errorPattern: ErrorPattern | undefined;
    if (!isCorrect && answer) {
      errorPattern = detectErrorPattern(answer, correctAnswer, question);
    }

    onAnswer(answer || 'timeout', responseTime, isCorrect, errorPattern);
  };

  const detectErrorPattern = (
    userAnswer: string,
    correctAnswer: string,
    q: TQuestion
  ): ErrorPattern => {
    const domain = q.dsm5Domain;
    
    // Check for reversal (e.g., "saw" vs "was", "43" vs "34")
    if (userAnswer.split('').reverse().join('') === correctAnswer) {
      return { type: 'reversal', detail: `Reversed ${correctAnswer} as ${userAnswer}`, questionId: q.id };
    }
    
    // Check for transposition
    if (userAnswer.length === correctAnswer.length) {
      let transposed = 0;
      for (let i = 0; i < userAnswer.length; i++) {
        if (userAnswer[i] !== correctAnswer[i] && correctAnswer.includes(userAnswer[i])) {
          transposed++;
        }
      }
      if (transposed >= 2) {
        return { type: 'transposition', detail: `Transposed letters in ${correctAnswer}`, questionId: q.id };
      }
    }

    // Check for omission
    if (userAnswer.length < correctAnswer.length && correctAnswer.includes(userAnswer)) {
      return { type: 'omission', detail: `Omitted characters from ${correctAnswer}`, questionId: q.id };
    }

    // Check for addition
    if (userAnswer.length > correctAnswer.length && userAnswer.includes(correctAnswer)) {
      return { type: 'addition', detail: `Added extra characters to ${correctAnswer}`, questionId: q.id };
    }

    // Check for magnitude error (number tests)
    if (domain === 'number-sense' || domain === 'approximate-number') {
      const userNum = parseFloat(userAnswer.replace(/[^\d.-]/g, ''));
      const correctNum = parseFloat(correctAnswer.replace(/[^\d.-]/g, ''));
      if (!isNaN(userNum) && !isNaN(correctNum) && userNum !== correctNum) {
        return { type: 'magnitude', detail: `Magnitude error: chose ${userAnswer} instead of ${correctAnswer}`, questionId: q.id };
      }
    }

    // Check for sequence error
    if (domain === 'sequential-logic') {
      return { type: 'sequence', detail: `Sequence pattern error on ${q.id}`, questionId: q.id };
    }

    // Default substitution
    return { type: 'substitution', detail: `Substituted ${correctAnswer} with ${userAnswer}`, questionId: q.id };
  };

  const renderStimulus = () => {
    if (!showStimulus || !stimulusVisible) return null;

    const stimulus = question.stimulus;
    
    if (Array.isArray(stimulus)) {
      return (
        <div className="flex flex-wrap justify-center gap-4 my-6">
          {stimulus.map((item, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-primary/10 rounded-lg text-xl font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      );
    }

    // Check if it's a dot pattern
    if (typeof stimulus === 'string' && stimulus.includes('●')) {
      return (
        <div className="text-center my-8">
          <span className="text-4xl tracking-widest">{stimulus}</span>
        </div>
      );
    }

    // Check if it's a passage (reading comprehension)
    if (typeof stimulus === 'string' && stimulus.length > 100) {
      return (
        <div className="bg-muted/30 rounded-lg p-4 my-6">
          <p className="text-lg leading-relaxed">{stimulus}</p>
        </div>
      );
    }

    return (
      <div className="text-center my-6">
        <p className="text-2xl font-medium">{stimulus}</p>
      </div>
    );
  };

  const progressPercent = (questionNumber / totalQuestions) * 100;
  const timePercent = (timeRemaining / (question.timeLimit || 30)) * 100;

  return (
    <Card className="max-w-2xl mx-auto border-2 border-primary/20">
      <CardContent className="pt-6 space-y-6">
        {/* Header with progress */}
        <div className="flex items-center justify-between">
          <Badge variant="outline">
            Question {questionNumber} of {totalQuestions}
          </Badge>
          <div className="flex items-center gap-2">
            <Clock className={`h-4 w-4 ${timeRemaining <= 5 ? 'text-destructive animate-pulse' : 'text-muted-foreground'}`} />
            <span className={`text-sm font-medium ${timeRemaining <= 5 ? 'text-destructive' : ''}`}>
              {timeRemaining}s
            </span>
          </div>
        </div>

        <Progress value={progressPercent} className="h-2" />

        {/* Time remaining bar */}
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              timeRemaining <= 5 ? 'bg-destructive' : 'bg-primary'
            }`}
            style={{ width: `${timePercent}%` }}
          />
        </div>

        {/* Instruction */}
        <div className="text-center">
          <p className="text-lg font-medium text-muted-foreground">
            {question.instruction}
          </p>
        </div>

        {/* Stimulus */}
        {renderStimulus()}

        {/* Hidden stimulus message */}
        {stimulusDisplayTime && !stimulusVisible && (
          <div className="text-center py-4">
            <p className="text-muted-foreground italic">
              Time's up! Now choose your answer.
            </p>
          </div>
        )}

        {/* Options */}
        {question.options && (
          <div className="grid grid-cols-2 gap-3">
            {question.options.map((option, idx) => (
              <Button
                key={idx}
                variant={selectedOption === option ? "default" : "outline"}
                className={`h-auto py-4 px-6 text-lg ${
                  selectedOption === option ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => {
                  setSelectedOption(option);
                  // Auto-submit after selection
                  setTimeout(() => handleSubmit(option), 300);
                }}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {/* For questions without options (voice response) */}
        {!question.options && (
          <div className="text-center">
            <Button variant="hero" size="lg" onClick={() => handleSubmit(selectedOption)}>
              <Volume2 className="h-5 w-5 mr-2" />
              Record Answer
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
