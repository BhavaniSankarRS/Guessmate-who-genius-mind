import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, ThumbsUp, ThumbsDown, HelpCircle, Check, X, ChevronLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [gameState, setGameState] = useState<"start" | "playing" | "result" | "feedback">("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [correctCharacter, setCorrectCharacter] = useState<string>("");
  const [feedbackAnswers, setFeedbackAnswers] = useState<number[]>([]);
  const [feedbackAntiAnswers, setFeedbackAntiAnswers] = useState<number[]>([]);
  const { toast } = useToast();

  const allQuestions = [
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
    "Is your character Indian or of Indian origin?",
    "Is your character related to you personally?",
    "Is your character a parent figure?",
    "Is your character your sibling?",
    "Is your character your romantic interest?",
    "Is your character from a superhero universe?",
    "Is your character known for being wise or intellectual?",
    "Does your character wear distinctive clothing or costume?",
    "Is your character known for a specific catchphrase?",
    "Has your character been portrayed by multiple actors?",
    "Did your character appear in a movie released after 2010?",
    "Is your character known for action scenes?",
    "Does your character have supernatural or magical abilities?",
    "Is your character associated with a specific location or city?",
    "Does your character use advanced technology or gadgets?",
  ];

  const characterProfiles = [
    {
      name: "Taylor Swift",
      matches: [0, 1, 6, 7, 9, 17, 18],
      antiMatches: [2, 3, 8, 11, 13, 15],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Elon Musk",
      matches: [0, 4, 7, 10, 13, 17, 18, 19],
      antiMatches: [1, 2, 3, 6, 11, 15],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "LeBron James",
      matches: [0, 3, 4, 7, 9, 17, 18],
      antiMatches: [1, 2, 6, 8, 11, 13, 15],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Emma Watson",
      matches: [0, 1, 2, 4, 9, 18],
      antiMatches: [3, 6, 8, 10, 11, 13, 15],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Barack Obama",
      matches: [0, 4, 7, 8, 9, 17, 18],
      antiMatches: [1, 2, 3, 6, 11, 13, 15],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Spider-Man",
      matches: [2, 15, 25, 28, 32, 33, 34],
      antiMatches: [0, 8, 10, 13],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Wonder Woman",
      matches: [1, 2, 15, 25, 27, 28, 32, 33],
      antiMatches: [0, 7, 8, 10, 13, 18],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Harry Potter",
      matches: [2, 12, 14, 32, 33],
      antiMatches: [0, 3, 6, 8, 10, 13, 18],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Beyoncé",
      matches: [0, 1, 4, 6, 7, 9, 17, 18],
      antiMatches: [2, 3, 8, 13, 15],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Bill Gates",
      matches: [0, 4, 7, 10, 13, 17],
      antiMatches: [1, 2, 3, 6, 8, 11, 15],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Oprah Winfrey",
      matches: [0, 1, 4, 7, 9, 10, 17, 18],
      antiMatches: [2, 3, 6, 8, 13, 15],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "The Joker",
      matches: [2, 11, 15, 19, 28, 29, 31],
      antiMatches: [0, 3, 8, 10, 13],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Daenerys Targaryen",
      matches: [1, 2, 12, 15, 32],
      antiMatches: [0, 3, 6, 7, 8, 10, 13, 18],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Michael Jordan",
      matches: [0, 3, 4, 7, 9, 10],
      antiMatches: [1, 2, 6, 8, 11, 13, 15],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Albert Einstein",
      matches: [0, 13, 26],
      antiMatches: [1, 2, 3, 4, 6, 8, 11, 15, 18],
      score: 0,
      categoryWeight: 1,
    },
    
    {
      name: "Shah Rukh Khan",
      matches: [0, 2, 4, 9, 17, 18, 19, 20, 28, 31],
      antiMatches: [1, 7, 8, 13, 15, 25, 32],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Priyanka Chopra",
      matches: [0, 1, 2, 4, 9, 18, 20, 34],
      antiMatches: [3, 8, 11, 13, 15, 25, 32],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Virat Kohli",
      matches: [0, 3, 4, 17, 18, 20, 34],
      antiMatches: [1, 2, 6, 8, 13, 15, 25, 32],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Deepika Padukone",
      matches: [0, 1, 2, 4, 9, 18, 20],
      antiMatches: [3, 6, 7, 8, 13, 15, 25, 32],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Narendra Modi",
      matches: [0, 4, 8, 17, 19, 20, 26, 34],
      antiMatches: [1, 2, 3, 6, 11, 15, 25, 32],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "A.R. Rahman",
      matches: [0, 4, 6, 9, 20, 28],
      antiMatches: [1, 2, 3, 8, 11, 13, 15, 25, 32],
      score: 0,
      categoryWeight: 1,
    },
    
    {
      name: "Your Mom",
      matches: [0, 1, 21, 22],
      antiMatches: [2, 3, 8, 15, 19, 24, 25, 32],
      score: 0,
      categoryWeight: 1.5,
    },
    {
      name: "Your Dad",
      matches: [0, 21, 22],
      antiMatches: [1, 2, 3, 8, 15, 19, 24, 25, 32],
      score: 0,
      categoryWeight: 1.5,
    },
    {
      name: "Your Sister",
      matches: [0, 1, 21, 23],
      antiMatches: [2, 8, 15, 19, 22, 24, 25, 32],
      score: 0,
      categoryWeight: 1.5,
    },
    {
      name: "Your Brother",
      matches: [0, 21, 23],
      antiMatches: [1, 2, 8, 15, 19, 22, 24, 25, 32],
      score: 0,
      categoryWeight: 1.5,
    },
    {
      name: "Your Best Friend",
      matches: [0, 21],
      antiMatches: [8, 15, 19, 22, 23, 24, 25, 32],
      score: 0,
      categoryWeight: 1.5,
    },
    {
      name: "Your Crush",
      matches: [0, 21, 24],
      antiMatches: [15, 19, 22, 23, 25, 32],
      score: 0,
      categoryWeight: 1.5,
    },
    {
      name: "Your Spouse/Partner",
      matches: [0, 21, 24],
      antiMatches: [15, 19, 22, 23, 25, 32],
      score: 0,
      categoryWeight: 1.5,
    },
    
    {
      name: "Iron Man",
      matches: [2, 10, 13, 25, 26, 27, 30, 31, 32, 34],
      antiMatches: [0, 1, 6, 8, 12, 21],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Captain Jack Sparrow",
      matches: [2, 14, 27, 28, 29, 31],
      antiMatches: [0, 1, 3, 8, 10, 13, 21, 25, 32],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Darth Vader",
      matches: [2, 15, 27, 28, 29, 32, 34],
      antiMatches: [0, 1, 3, 8, 10, 21],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Princess Leia",
      matches: [1, 2, 14, 27, 29, 33],
      antiMatches: [0, 3, 6, 10, 11, 15, 21],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Batman",
      matches: [2, 25, 27, 29, 31, 34],
      antiMatches: [0, 1, 3, 6, 8, 21, 32],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Katniss Everdeen",
      matches: [1, 2, 12, 27, 31],
      antiMatches: [0, 6, 8, 10, 13, 15, 21, 32],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Sherlock Holmes",
      matches: [2, 12, 26, 27, 28, 29],
      antiMatches: [0, 1, 3, 6, 8, 21, 25, 32],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "James Bond",
      matches: [2, 14, 27, 29, 31, 34],
      antiMatches: [0, 1, 3, 6, 8, 21, 32],
      score: 0,
      categoryWeight: 1.2,
    }
  ];

  const [questionPath, setQuestionPath] = useState<number[]>([]);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());

  const questionCategories = {
    initial: [0, 2, 21],
    realPerson: [1, 4, 7, 20],
    fictional: [25, 26, 32],
    celebrity: [3, 6, 8, 9, 10],
    movie: [28, 29, 30, 31],
    personal: [22, 23, 24],
  };

  useEffect(() => {
    if (gameState === "playing" && questionPath.length === 0) {
      const initialQuestionIndex = 0;
      setCurrentQuestion(initialQuestionIndex);
      setQuestionPath([initialQuestionIndex]);
      setUsedQuestions(new Set([initialQuestionIndex]));
    }
  }, [gameState, questionPath.length]);

  const startGame = () => {
    setGameState("playing");
    setAnswers({});
    setUsedQuestions(new Set());
    setQuestionPath([]);
    setCurrentQuestion(0);
    
    toast({
      title: "Game started!",
      description: "Think of a person and answer the questions.",
    });
  };

  const getNextBestQuestion = () => {
    if (Object.keys(answers).length === 0) {
      return 0;
    }

    const updatedProfiles = characterProfiles.map(character => {
      let score = 0;
      Object.entries(answers).forEach(([questionIndex, answer]) => {
        const qIndex = Number(questionIndex);
        if (answer === "yes" && character.matches.includes(qIndex)) {
          score += 2;
        } else if (answer === "no" && character.antiMatches.includes(qIndex)) {
          score += 2;
        } else if (answer === "yes" && character.antiMatches.includes(qIndex)) {
          score -= 2;
        } else if (answer === "no" && character.matches.includes(qIndex)) {
          score -= 2;
        }
      });
      return { ...character, score };
    });

    updatedProfiles.sort((a, b) => (b.score * b.categoryWeight) - (a.score * a.categoryWeight));
    
    const topCandidates = updatedProfiles.filter(
      char => char.score > (updatedProfiles[0].score / 2) && char.score > 0
    );

    if (topCandidates.length === 0) {
      const unusedInitial = questionCategories.initial.filter(q => !usedQuestions.has(q));
      if (unusedInitial.length > 0) {
        return unusedInitial[0];
      }
    }

    const remainingQuestions = allQuestions
      .map((_, index) => index)
      .filter(index => !usedQuestions.has(index));

    if (remainingQuestions.length === 0) {
      return 0;
    }

    const questionScores = remainingQuestions.map(qIndex => {
      let yesCount = 0;
      let noCount = 0;
      
      topCandidates.forEach(character => {
        if (character.matches.includes(qIndex)) yesCount++;
        else if (character.antiMatches.includes(qIndex)) noCount++;
      });
      
      const splitScore = Math.abs(yesCount - noCount);
      
      if (answers["21"] === "yes" && questionCategories.personal.includes(qIndex)) {
        return { qIndex, score: -1000 };
      }
      
      if (answers["0"] === "no" && questionCategories.fictional.includes(qIndex)) {
        return { qIndex, score: -700 };
      }
      
      if (answers["0"] === "yes" && !usedQuestions.has(1) && qIndex === 1) {
        return { qIndex, score: -600 };
      }

      return { qIndex, score: splitScore };
    });
    
    questionScores.sort((a, b) => a.score - b.score);
    
    return questionScores.length > 0 ? questionScores[0].qIndex : 0;
  };

  const answerQuestion = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);
    
    const newQuestionPath = [...questionPath, currentQuestion];
    setQuestionPath(newQuestionPath);
    
    if (newQuestionPath.length >= 10) {
      setGameState("result");
      return;
    }
    
    const newUsedQuestions = new Set(usedQuestions);
    let nextQuestion = getNextBestQuestion();
    
    if (!newUsedQuestions.has(nextQuestion)) {
      newUsedQuestions.add(nextQuestion);
    } else {
      const unusedQuestions = allQuestions
        .map((_, index) => index)
        .filter(index => !newUsedQuestions.has(index));
      
      if (unusedQuestions.length === 0) {
        setGameState("result");
        return;
      }
      
      nextQuestion = unusedQuestions[0];
      newUsedQuestions.add(nextQuestion);
    }
    
    setCurrentQuestion(nextQuestion);
    setUsedQuestions(newUsedQuestions);
  };

  const goToPreviousQuestion = () => {
    if (questionPath.length <= 1) {
      return;
    }
    
    const newQuestionPath = [...questionPath];
    newQuestionPath.pop();
    
    const previousQuestionIndex = newQuestionPath[newQuestionPath.length - 1];
    
    setQuestionPath(newQuestionPath);
    setCurrentQuestion(previousQuestionIndex);
    
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion];
    setAnswers(newAnswers);
    
    toast({
      title: "Going back",
      description: "You can now change your previous answer.",
    });
  };

  const guessCharacter = () => {
    const scoredProfiles = characterProfiles.map(character => ({
      ...character,
      score: 0
    }));
    
    scoredProfiles.forEach(character => {
      let score = 0;
      
      Object.entries(answers).forEach(([questionIndex, answer]) => {
        const qIndex = Number(questionIndex);
        
        if (answer === "yes" && character.matches.includes(qIndex)) {
          score += 2;
        } else if (answer === "no" && character.antiMatches.includes(qIndex)) {
          score += 2;
        } else if (answer === "yes" && character.antiMatches.includes(qIndex)) {
          score -= 2;
        } else if (answer === "no" && character.matches.includes(qIndex)) {
          score -= 2;
        }
        else if (answer === "maybe" && character.matches.includes(qIndex)) {
          score += 0.5;
        } else if (answer === "maybe" && character.antiMatches.includes(qIndex)) {
          score += 0.5;
        }
      });
      
      character.score = score * character.categoryWeight;
    });

    const sortedProfiles = [...scoredProfiles].sort((a, b) => b.score - a.score);
    const topCharacter = sortedProfiles[0];

    const maxPossibleScore = Math.max(1, topCharacter.matches.length + topCharacter.antiMatches.length);
    let confidence = Math.min(100, Math.max(0, (topCharacter.score / (maxPossibleScore * 2)) * 100));
    
    confidence = Math.round(50 + (confidence / 2));
    
    if (Object.keys(answers).length > 15) {
      confidence = Math.min(99, confidence + 5);
    }
    
    return { 
      characterGuess: topCharacter.name, 
      accuracy: `${confidence}%` 
    };
  };

  const saveNewCharacter = () => {
    if (correctCharacter.trim() === "") {
      toast({
        title: "Character name required",
        description: "Please enter the name of the character you were thinking of.",
        variant: "destructive",
      });
      return;
    }

    const newCharacterProfile = {
      name: correctCharacter,
      matches: feedbackAnswers,
      antiMatches: feedbackAntiAnswers,
      score: 0,
      categoryWeight: 1,
    };

    setCharacterProfiles(prevProfiles => [...prevProfiles, newCharacterProfile]);

    toast({
      title: "Thank you!",
      description: `I've learned about "${correctCharacter}" and will do better next time!`,
    });
    
    setCorrectCharacter("");
    setFeedbackAnswers([]);
    setFeedbackAntiAnswers([]);
    setGameState("start");
  };

  const processAnswersForFeedback = () => {
    const yesAnswers: number[] = [];
    const noAnswers: number[] = [];
    
    Object.entries(answers).forEach(([questionIndex, answer]) => {
      const qIndex = Number(questionIndex);
      if (answer === "yes") {
        yesAnswers.push(qIndex);
      } else if (answer === "no") {
        noAnswers.push(qIndex);
      }
    });
    
    setFeedbackAnswers(yesAnswers);
    setFeedbackAntiAnswers(noAnswers);
  };

  const renderContent = () => {
    switch (gameState) {
      case "start":
        return (
          <Card className="w-full max-w-md mx-auto glass-card animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Guess Mate</CardTitle>
              <CardDescription className="text-lg mt-2">
                Think of a character, and I'll try to guess it!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 py-6">
              <div className="rounded-full bg-primary/10 p-6 hover-glow">
                <Brain className="h-12 w-12 text-primary" />
              </div>
              <p className="text-center text-muted-foreground">
                I'll ask you a series of questions and guess who you're thinking of.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full glow-button" onClick={startGame}>
                <Sparkles className="h-4 w-4 mr-2" />
                Start the Game
              </Button>
            </CardFooter>
          </Card>
        );
      case "playing":
        return (
          <Card className="w-full max-w-md mx-auto glass-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Question {questionPath.length}</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-center text-lg mb-6 font-medium">{allQuestions[currentQuestion]}</p>
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  variant="outline"
                  className="flex flex-col gap-2 hover-scale transition-all border-2"
                  onClick={() => answerQuestion("yes")}
                >
                  <ThumbsUp className="h-5 w-5 text-green-500" />
                  <span>Yes</span>
                </Button>
                <Button 
                  variant="outline"
                  className="flex flex-col gap-2 hover-scale transition-all border-2"
                  onClick={() => answerQuestion("no")}
                >
                  <ThumbsDown className="h-5 w-5 text-red-500" />
                  <span>No</span>
                </Button>
                <Button 
                  variant="outline"
                  className="flex flex-col gap-2 hover-scale transition-all border-2"
                  onClick={() => answerQuestion("maybe")}
                >
                  <HelpCircle className="h-5 w-5 text-amber-500" />
                  <span>Maybe</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex justify-between items-center w-full">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={goToPreviousQuestion}
                  disabled={questionPath.length <= 1}
                  className="flex items-center gap-1 hover-scale"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>
                <div className="h-2 bg-secondary rounded-full w-32">
                  <div 
                    className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" 
                    style={{ width: `${(questionPath.length / 20) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {questionPath.length} / {Math.min(20, allQuestions.length)}
                </p>
              </div>
            </CardFooter>
          </Card>
        );
      case "result":
        const { characterGuess, accuracy } = guessCharacter();
        return (
          <Card className="w-full max-w-md mx-auto glass-card animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                I think you're thinking of...
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-6 py-6">
              <div className="rounded-full bg-primary/10 p-6 hover-glow">
                <Brain className="h-12 w-12 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {characterGuess}
                </h3>
                <p className="text-lg text-muted-foreground mt-2">Confidence: {accuracy}</p>
              </div>
              <div className="flex gap-4 mt-6">
                <Button 
                  variant="outline"
                  className="flex items-center gap-2 border-green-400 border-2 hover:bg-green-500/10 hover-scale"
                  onClick={() => {
                    toast({
                      title: "Great! I guessed it right! 🎉",
                      description: "I'm getting better every day!",
                    });
                    setGameState("start");
                  }}
                >
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Correct!</span>
                </Button>
                <Button 
                  variant="outline"
                  className="flex items-center gap-2 border-red-400 border-2 hover:bg-red-500/10 hover-scale"
                  onClick={() => {
                    processAnswersForFeedback();
                    setGameState("feedback");
                  }}
                >
                  <X className="h-4 w-4 text-red-500" />
                  <span>Wrong</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full glow-button"
                onClick={startGame}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Play Again
              </Button>
            </CardFooter>
          </Card>
        );
      case "feedback":
        return (
          <Card className="w-full max-w-md mx-auto glass-card animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Help Me Learn
              </CardTitle>
              <CardDescription>
                Tell me who you were thinking of so I can make better guesses next time
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="character-name">Who were you thinking of?</Label>
                <Input 
                  id="character-name"
                  placeholder="Enter character name" 
                  value={correctCharacter}
                  onChange={(e) => setCorrectCharacter(e.target.value)}
                  className="border-2"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                I'll remember your answers to improve my guessing ability.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button 
                className="w-full glow-button" 
                onClick={saveNewCharacter}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Save & Continue
              </Button>
              <Button 
                variant="outline" 
                className="w-full hover-scale"
                onClick={() => setGameState("start")}
              >
                Skip
              </Button>
            </CardFooter>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
          Guess Mate
        </h1>
        <p className="text-center text-muted-foreground mt-2">
          The intelligent character guessing game
        </p>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default Index;
