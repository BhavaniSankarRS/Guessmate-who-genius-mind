
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ThumbsUp, ThumbsDown, HelpCircle, Check, X, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [gameState, setGameState] = useState<"start" | "playing" | "result">("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { toast } = useToast();

  // Enhanced question set for the guessing game
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

  // Character profiles with their corresponding question patterns
  const characterProfiles = [
    // Original characters
    {
      name: "Taylor Swift",
      matches: [0, 1, 6, 7, 9, 17, 18],
      antiMatches: [2, 3, 8, 11, 13, 15],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    {
      name: "Elon Musk",
      matches: [0, 4, 7, 10, 13, 17, 18, 19],
      antiMatches: [1, 2, 3, 6, 11, 15],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    {
      name: "LeBron James",
      matches: [0, 3, 4, 7, 9, 17, 18],
      antiMatches: [1, 2, 6, 8, 11, 13, 15],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    {
      name: "Emma Watson",
      matches: [0, 1, 2, 4, 9, 18],
      antiMatches: [3, 6, 8, 10, 11, 13, 15],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    {
      name: "Barack Obama",
      matches: [0, 4, 7, 8, 9, 17, 18],
      antiMatches: [1, 2, 3, 6, 11, 13, 15],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    {
      name: "Spider-Man",
      matches: [2, 15, 25, 28, 32, 33, 34],
      antiMatches: [0, 8, 10, 13],
      score: 0,
      categoryWeight: 1.2, // Fictional Character
    },
    {
      name: "Wonder Woman",
      matches: [1, 2, 15, 25, 27, 28, 32, 33],
      antiMatches: [0, 7, 8, 10, 13, 18],
      score: 0,
      categoryWeight: 1.2, // Fictional Character
    },
    {
      name: "Harry Potter",
      matches: [2, 12, 14, 32, 33],
      antiMatches: [0, 3, 6, 8, 10, 13, 18],
      score: 0,
      categoryWeight: 1.2, // Fictional Character
    },
    {
      name: "Beyoncé",
      matches: [0, 1, 4, 6, 7, 9, 17, 18],
      antiMatches: [2, 3, 8, 13, 15],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    {
      name: "Bill Gates",
      matches: [0, 4, 7, 10, 13, 17],
      antiMatches: [1, 2, 3, 6, 8, 11, 15],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    {
      name: "Oprah Winfrey",
      matches: [0, 1, 4, 7, 9, 10, 17, 18],
      antiMatches: [2, 3, 6, 8, 13, 15],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    {
      name: "The Joker",
      matches: [2, 11, 15, 19, 28, 29, 31],
      antiMatches: [0, 3, 8, 10, 13],
      score: 0,
      categoryWeight: 1.2, // Fictional Character
    },
    {
      name: "Daenerys Targaryen",
      matches: [1, 2, 12, 15, 32],
      antiMatches: [0, 3, 6, 7, 8, 10, 13, 18],
      score: 0,
      categoryWeight: 1.2, // Fictional Character
    },
    {
      name: "Michael Jordan",
      matches: [0, 3, 4, 7, 9, 10],
      antiMatches: [1, 2, 6, 8, 11, 13, 15],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    {
      name: "Albert Einstein",
      matches: [0, 13, 26],
      antiMatches: [1, 2, 3, 4, 6, 8, 11, 15, 18],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    
    // Indian characters
    {
      name: "Shah Rukh Khan",
      matches: [0, 2, 4, 9, 17, 18, 19, 20, 28, 31],
      antiMatches: [1, 7, 8, 13, 15, 25, 32],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    {
      name: "Priyanka Chopra",
      matches: [0, 1, 2, 4, 9, 18, 20, 34],
      antiMatches: [3, 8, 11, 13, 15, 25, 32],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    {
      name: "Virat Kohli",
      matches: [0, 3, 4, 17, 18, 20, 34],
      antiMatches: [1, 2, 6, 8, 13, 15, 25, 32],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    {
      name: "Deepika Padukone",
      matches: [0, 1, 2, 4, 9, 18, 20],
      antiMatches: [3, 6, 7, 8, 13, 15, 25, 32],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    {
      name: "Narendra Modi",
      matches: [0, 4, 8, 17, 19, 20, 26, 34],
      antiMatches: [1, 2, 3, 6, 11, 15, 25, 32],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    {
      name: "A.R. Rahman",
      matches: [0, 4, 6, 9, 20, 28],
      antiMatches: [1, 2, 3, 8, 11, 13, 15, 25, 32],
      score: 0,
      categoryWeight: 1, // Celebrity
    },
    
    // Family members and relationships
    {
      name: "Your Mom",
      matches: [0, 1, 21, 22],
      antiMatches: [2, 3, 8, 15, 19, 24, 25, 32],
      score: 0,
      categoryWeight: 1.5, // Personal Relation
    },
    {
      name: "Your Dad",
      matches: [0, 21, 22],
      antiMatches: [1, 2, 3, 8, 15, 19, 24, 25, 32],
      score: 0,
      categoryWeight: 1.5, // Personal Relation
    },
    {
      name: "Your Sister",
      matches: [0, 1, 21, 23],
      antiMatches: [2, 8, 15, 19, 22, 24, 25, 32],
      score: 0,
      categoryWeight: 1.5, // Personal Relation
    },
    {
      name: "Your Brother",
      matches: [0, 21, 23],
      antiMatches: [1, 2, 8, 15, 19, 22, 24, 25, 32],
      score: 0,
      categoryWeight: 1.5, // Personal Relation
    },
    {
      name: "Your Best Friend",
      matches: [0, 21],
      antiMatches: [8, 15, 19, 22, 23, 24, 25, 32],
      score: 0,
      categoryWeight: 1.5, // Personal Relation
    },
    {
      name: "Your Crush",
      matches: [0, 21, 24],
      antiMatches: [15, 19, 22, 23, 25, 32],
      score: 0,
      categoryWeight: 1.5, // Personal Relation
    },
    {
      name: "Your Spouse/Partner",
      matches: [0, 21, 24],
      antiMatches: [15, 19, 22, 23, 25, 32],
      score: 0,
      categoryWeight: 1.5, // Personal Relation
    },
    
    // Famous movie characters
    {
      name: "Iron Man",
      matches: [2, 10, 13, 25, 26, 27, 30, 31, 32, 34],
      antiMatches: [0, 1, 6, 8, 12, 21],
      score: 0,
      categoryWeight: 1.2, // Fictional Character
    },
    {
      name: "Captain Jack Sparrow",
      matches: [2, 14, 27, 28, 29, 31],
      antiMatches: [0, 1, 3, 8, 10, 13, 21, 25, 32],
      score: 0,
      categoryWeight: 1.2, // Fictional Character
    },
    {
      name: "Darth Vader",
      matches: [2, 15, 27, 28, 29, 32, 34],
      antiMatches: [0, 1, 3, 8, 10, 21],
      score: 0,
      categoryWeight: 1.2, // Fictional Character
    },
    {
      name: "Princess Leia",
      matches: [1, 2, 14, 27, 29, 33],
      antiMatches: [0, 3, 6, 10, 11, 15, 21],
      score: 0,
      categoryWeight: 1.2, // Fictional Character
    },
    {
      name: "Batman",
      matches: [2, 25, 27, 29, 31, 34],
      antiMatches: [0, 1, 3, 6, 8, 21, 32],
      score: 0,
      categoryWeight: 1.2, // Fictional Character
    },
    {
      name: "Katniss Everdeen",
      matches: [1, 2, 12, 27, 31],
      antiMatches: [0, 6, 8, 10, 13, 15, 21, 32],
      score: 0,
      categoryWeight: 1.2, // Fictional Character
    },
    {
      name: "Sherlock Holmes",
      matches: [2, 12, 26, 27, 28, 29],
      antiMatches: [0, 1, 3, 6, 8, 21, 25, 32],
      score: 0,
      categoryWeight: 1.2, // Fictional Character
    },
    {
      name: "James Bond",
      matches: [2, 14, 27, 29, 31, 34],
      antiMatches: [0, 1, 3, 6, 8, 21, 32],
      score: 0,
      categoryWeight: 1.2, // Fictional Character
    }
  ];

  // Initialize question selection state
  const [questionPath, setQuestionPath] = useState<number[]>([]);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());

  // Grouped questions by categories for dynamic selection
  const questionCategories = {
    initial: [0, 2, 21], // Real/Fiction, Movie/TV, Personal
    realPerson: [1, 4, 7, 20], // Gender, Alive, American, Indian
    fictional: [25, 26, 32], // Superhero, Intellectual, Magical
    celebrity: [3, 6, 8, 9, 10], // Sports, Music, Politics, Awards, Business
    movie: [28, 29, 30, 31], // Catchphrase, Multiple actors, After 2010, Action
    personal: [22, 23, 24], // Parent, Sibling, Romantic
  };

  // Reset game state
  const startGame = () => {
    setGameState("playing");
    setAnswers({});
    setUsedQuestions(new Set());
    setQuestionPath([]);
    
    // Start with a common initial question: real or fictional
    const initialQuestionIndex = 0;
    setCurrentQuestion(initialQuestionIndex);
    setUsedQuestions(new Set([initialQuestionIndex]));
    
    toast({
      title: "Game started!",
      description: "Think of a person and answer the questions.",
    });
  };

  // Calculate information gain for each question based on current answers
  const getNextBestQuestion = () => {
    // If no questions answered yet, start with the basics
    if (Object.keys(answers).length === 0) {
      return 0; // "Is your character real (not fictional)?"
    }

    // Clone and update character scores based on current answers
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

    // Sort characters by score to find current top candidates
    updatedProfiles.sort((a, b) => (b.score * b.categoryWeight) - (a.score * a.categoryWeight));
    
    // Get the top candidates (characters that still match well)
    const topCandidates = updatedProfiles.filter(
      char => char.score > (updatedProfiles[0].score / 2) && char.score > 0
    );

    // Find key distinguishing questions that would help narrow down top candidates
    const remainingQuestions = allQuestions
      .map((_, index) => index)
      .filter(index => !usedQuestions.has(index));

    // For each question, calculate how well it would split the candidate pool
    const questionScores = remainingQuestions.map(qIndex => {
      let yesCount = 0;
      let noCount = 0;
      
      topCandidates.forEach(character => {
        if (character.matches.includes(qIndex)) yesCount++;
        else if (character.antiMatches.includes(qIndex)) noCount++;
      });
      
      // Ideal questions split the candidates evenly
      const splitScore = Math.abs(yesCount - noCount);
      
      // Special case: if we detected a personal character from Q21
      if (answers["21"] === "yes" && questionCategories.personal.includes(qIndex)) {
        return { qIndex, score: -1000 }; // Prioritize personal questions
      }
      
      // Special case: if we know it's fictional
      if (answers["0"] === "no" && questionCategories.fictional.includes(qIndex)) {
        return { qIndex, score: -700 }; // Prioritize fictional character questions
      }
      
      // Special case: if we know it's real
      if (answers["0"] === "yes" && !usedQuestions.has(1) && qIndex === 1) {
        return { qIndex, score: -600 }; // Prioritize gender question for real people
      }

      return { qIndex, score: splitScore };
    });
    
    // Sort by score (lower is better - splits candidates more evenly)
    questionScores.sort((a, b) => a.score - b.score);
    
    // Return the question that best splits the candidates
    return questionScores[0].qIndex;
  };

  // Handle answering a question and moving to the next best question
  const answerQuestion = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);
    
    // Add this question to the path
    const newQuestionPath = [...questionPath, currentQuestion];
    setQuestionPath(newQuestionPath);
    
    // Check if we've asked enough questions to make a confident guess
    if (newQuestionPath.length >= 10 || Object.keys(answers).length >= 20) {
      setGameState("result");
      return;
    }
    
    // Find the next best question
    const newUsedQuestions = new Set(usedQuestions);
    let nextQuestion;
    
    do {
      nextQuestion = getNextBestQuestion();
      newUsedQuestions.add(nextQuestion);
    } while (usedQuestions.has(nextQuestion) && newUsedQuestions.size < allQuestions.length);
    
    // Update state for next question
    setCurrentQuestion(nextQuestion);
    setUsedQuestions(newUsedQuestions);
  };

  // NEW FUNCTION: Go back to previous question
  const goToPreviousQuestion = () => {
    if (questionPath.length <= 1) {
      return; // Can't go back if we're on the first question
    }
    
    // Remove the current question from the path
    const newQuestionPath = [...questionPath];
    newQuestionPath.pop();
    
    // Get the previous question index
    const previousQuestionIndex = newQuestionPath[newQuestionPath.length - 1];
    
    // Update the state
    setQuestionPath(newQuestionPath);
    setCurrentQuestion(previousQuestionIndex);
    
    // Remove the answer for the current question
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion];
    setAnswers(newAnswers);
    
    toast({
      title: "Going back",
      description: "You can now change your previous answer.",
    });
  };

  // Guess character based on answers given
  const guessCharacter = () => {
    // Apply weighted scoring to characters based on answers
    characterProfiles.forEach(character => {
      let score = 0;
      
      // Calculate score based on yes/no answers and their match/antimatch with character traits
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
        // 'maybe' answers don't affect the score as much
        else if (answer === "maybe" && character.matches.includes(qIndex)) {
          score += 0.5;
        } else if (answer === "maybe" && character.antiMatches.includes(qIndex)) {
          score += 0.5;
        }
      });
      
      // Apply category weights (e.g., personal relations get boosted)
      character.score = score * character.categoryWeight;
    });

    // Sort by score and get top character
    const sortedProfiles = [...characterProfiles].sort((a, b) => b.score - a.score);
    const topCharacter = sortedProfiles[0];

    // Calculate confidence percentage
    const maxPossibleScore = topCharacter.matches.length + topCharacter.antiMatches.length;
    let confidence = Math.min(100, Math.max(0, (topCharacter.score / (maxPossibleScore * 2)) * 100));
    
    // Add a baseline confidence
    confidence = Math.round(50 + (confidence / 2));
    
    // If we've asked many questions, boost confidence
    if (Object.keys(answers).length > 15) {
      confidence = Math.min(99, confidence + 5);
    }
    
    return { 
      characterGuess: topCharacter.name, 
      accuracy: `${confidence}%` 
    };
  };

  // Render the current game state
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
              <CardTitle className="text-center">Question {questionPath.length + 1}</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-center text-lg mb-6">{allQuestions[currentQuestion]}</p>
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
              <div className="flex justify-between items-center w-full">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={goToPreviousQuestion}
                  disabled={questionPath.length <= 1}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>
                <p className="text-sm text-muted-foreground">
                  {questionPath.length + 1} / {Math.min(20, allQuestions.length)}
                </p>
              </div>
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
          The intelligent character guessing game
        </p>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default Index;
