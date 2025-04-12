
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

  // Sample questions for the guessing game
  const questions = [
    "Is your character real (not fictional)?",
    "Is your character female?",
    "Is your character from a movie or TV show?",
    "Is your character associated with sports?",
    "Is your character currently alive?",
    "Is your character over 40 years old?",
    "Is your character primarily known for music?",
    "Is your character American?",
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
    // This is a simplified version - in a real app, this would use a more complex algorithm
    // Based on the answers, we're just showing a predefined guess
    const positiveAnswers = Object.values(answers).filter(a => a === "yes").length;
    
    let characterGuess = "Taylor Swift";
    let accuracy = "65%";

    // Very simple logic just for demonstration
    if (answers[0] === "yes") { // Real person
      if (answers[1] === "yes") { // Female
        if (answers[6] === "yes") { // Known for music
          characterGuess = "Taylor Swift";
          accuracy = "85%";
        } else {
          characterGuess = "Emma Watson";
          accuracy = "70%";
        }
      } else { // Male
        if (answers[3] === "yes") { // Sports
          characterGuess = "LeBron James";
          accuracy = "80%";
        } else {
          characterGuess = "Elon Musk";
          accuracy = "75%";
        }
      }
    } else { // Fictional
      if (answers[1] === "yes") { // Female
        characterGuess = "Wonder Woman";
        accuracy = "60%";
      } else {
        characterGuess = "Spider-Man";
        accuracy = "65%";
      }
    }

    return { characterGuess, accuracy };
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
