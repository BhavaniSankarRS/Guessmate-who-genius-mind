
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ThumbsUp, ThumbsDown, HelpCircle, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [gameState, setGameState] = useState<"start" | "playing" | "result">("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { toast } = useToast();

  // Enhanced question set for the guessing game
  const questions = [
    "Is your character real (not fictional)?",
    "Is your character female?",
    "Is your character from a movie or TV show?",
    "Is your character associated with sports?",
    "Is your character currently alive?",
    "Is your character over 40 years old?",
    "Is your character primarily known for music?",
    "Is your character American?",
    "Is your character known for being in politics?",
    "Has your character won major awards in their field?",
    "Is your character known for their business success?",
    "Is your character primarily known for comedy?",
    "Is your character from a book or novel series?",
    "Is your character associated with science or technology?",
    "Has your character appeared in multiple franchises?",
    "Is your character considered a villain?",
    "Is your character from the last 50 years?",
    "Does your character have children?",
    "Is your character associated with social media?",
    "Has your character been involved in major controversies?",
  ];

  const startGame = () => {
    setGameState("playing");
    setCurrentQuestion(0);
    setAnswers({});
    toast({
      title: "Game started!",
      description: "Think of a person and answer the questions.",
    });
  };

  const answerQuestion = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameState("result");
    }
  };

  const guessCharacter = () => {
    // Enhanced guessing algorithm
    const yesAnswers = Object.entries(answers).filter(([_, value]) => value === "yes").map(([key]) => Number(key));
    const noAnswers = Object.entries(answers).filter(([_, value]) => value === "no").map(([key]) => Number(key));
    
    // Character profiles with their corresponding question patterns
    const characterProfiles = [
      {
        name: "Taylor Swift",
        matches: [0, 1, 6, 7, 9, 17, 18],
        antiMatches: [2, 3, 8, 11, 13, 15],
        score: 0
      },
      {
        name: "Elon Musk",
        matches: [0, 4, 7, 10, 13, 17, 18, 19],
        antiMatches: [1, 2, 3, 6, 11, 15],
        score: 0
      },
      {
        name: "LeBron James",
        matches: [0, 3, 4, 7, 9, 17, 18],
        antiMatches: [1, 2, 6, 8, 11, 13, 15],
        score: 0
      },
      {
        name: "Emma Watson",
        matches: [0, 1, 2, 4, 9, 18],
        antiMatches: [3, 6, 8, 10, 11, 13, 15],
        score: 0
      },
      {
        name: "Barack Obama",
        matches: [0, 4, 7, 8, 9, 17, 18],
        antiMatches: [1, 2, 3, 6, 11, 13, 15],
        score: 0
      },
      {
        name: "Spider-Man",
        matches: [2, 15],
        antiMatches: [0, 8, 10, 13],
        score: 0
      },
      {
        name: "Wonder Woman",
        matches: [1, 2, 15],
        antiMatches: [0, 7, 8, 10, 13, 18],
        score: 0
      },
      {
        name: "Harry Potter",
        matches: [2, 12, 14],
        antiMatches: [0, 3, 6, 8, 10, 13, 18],
        score: 0
      },
      {
        name: "Beyoncé",
        matches: [0, 1, 4, 6, 7, 9, 17, 18],
        antiMatches: [2, 3, 8, 13, 15],
        score: 0
      },
      {
        name: "Bill Gates",
        matches: [0, 4, 7, 10, 13, 17],
        antiMatches: [1, 2, 3, 6, 8, 11, 15],
        score: 0
      },
      {
        name: "Oprah Winfrey",
        matches: [0, 1, 4, 7, 9, 10, 17, 18],
        antiMatches: [2, 3, 6, 8, 13, 15],
        score: 0
      },
      {
        name: "The Joker",
        matches: [2, 11, 15, 19],
        antiMatches: [0, 3, 8, 10, 13],
        score: 0
      },
      {
        name: "Daenerys Targaryen",
        matches: [1, 2, 12, 15],
        antiMatches: [0, 3, 6, 7, 8, 10, 13, 18],
        score: 0
      },
      {
        name: "Michael Jordan",
        matches: [0, 3, 4, 7, 9, 10],
        antiMatches: [1, 2, 6, 8, 11, 13, 15],
        score: 0
      },
      {
        name: "Albert Einstein",
        matches: [0, 13],
        antiMatches: [1, 2, 3, 4, 6, 8, 11, 15, 18],
        score: 0
      }
    ];

    // Calculate scores for each character
    characterProfiles.forEach(character => {
      // Add points for matching yes answers
      yesAnswers.forEach(questionIndex => {
        if (character.matches.includes(questionIndex)) {
          character.score += 2;
        }
        if (character.antiMatches.includes(questionIndex)) {
          character.score -= 2;
        }
      });

      // Add points for matching no answers
      noAnswers.forEach(questionIndex => {
        if (character.antiMatches.includes(questionIndex)) {
          character.score += 2;
        }
        if (character.matches.includes(questionIndex)) {
          character.score -= 2;
        }
      });
    });

    // Sort by score and get top character
    characterProfiles.sort((a, b) => b.score - a.score);
    const topCharacter = characterProfiles[0];

    // Calculate confidence percentage
    const maxPossibleScore = (topCharacter.matches.length + topCharacter.antiMatches.length) * 2;
    let confidence = Math.min(100, Math.max(0, (topCharacter.score / maxPossibleScore) * 100));
    
    // Add a baseline confidence
    confidence = Math.round(50 + (confidence / 2));
    
    return { 
      characterGuess: topCharacter.name, 
      accuracy: `${confidence}%` 
    };
  };

  const renderContent = () => {
    switch (gameState) {
      case "start":
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Guess Mate</CardTitle>
              <CardDescription className="text-lg mt-2">
                Think of a character, and I'll try to guess it!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 py-6">
              <div className="rounded-full bg-primary/10 p-6">
                <Brain className="h-12 w-12 text-primary" />
              </div>
              <p className="text-center text-muted-foreground">
                I'll ask you a series of questions and guess who you're thinking of.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={startGame}>
                Start the Game
              </Button>
            </CardFooter>
          </Card>
        );
      case "playing":
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Question {currentQuestion + 1}</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-center text-lg mb-6">{questions[currentQuestion]}</p>
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  variant="outline"
                  className="flex flex-col gap-2"
                  onClick={() => answerQuestion("yes")}
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span>Yes</span>
                </Button>
                <Button 
                  variant="outline"
                  className="flex flex-col gap-2"
                  onClick={() => answerQuestion("no")}
                >
                  <ThumbsDown className="h-5 w-5" />
                  <span>No</span>
                </Button>
                <Button 
                  variant="outline"
                  className="flex flex-col gap-2"
                  onClick={() => answerQuestion("maybe")}
                >
                  <HelpCircle className="h-5 w-5" />
                  <span>Maybe</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                {currentQuestion + 1} / {questions.length}
              </p>
            </CardFooter>
          </Card>
        );
      case "result":
        const { characterGuess, accuracy } = guessCharacter();
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">I think you're thinking of...</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-6 py-6">
              <div className="rounded-full bg-primary/10 p-6">
                <Brain className="h-12 w-12 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold">{characterGuess}</h3>
                <p className="text-lg text-muted-foreground mt-2">Confidence: {accuracy}</p>
              </div>
              <div className="flex gap-4 mt-6">
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    toast({
                      title: "Great! I guessed it right! 🎉",
                      description: "I'm getting better every day!",
                    });
                    setGameState("start");
                  }}
                >
                  <Check className="h-4 w-4" />
                  <span>Correct!</span>
                </Button>
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    toast({
                      title: "I'll try to do better next time!",
                      description: "Thanks for playing!",
                    });
                    setGameState("start");
                  }}
                >
                  <X className="h-4 w-4" />
                  <span>Wrong</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={startGame}
              >
                Play Again
              </Button>
            </CardFooter>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Guess Mate
        </h1>
        <p className="text-center text-muted-foreground mt-2">
          The character guessing game
        </p>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default Index;
