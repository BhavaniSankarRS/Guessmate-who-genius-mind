
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, ThumbsUp, ThumbsDown, HelpCircle, Check, X, ChevronLeft, Sparkles, Mail, Phone, Linkedin, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [gameState, setGameState] = useState<"start" | "playing" | "result" | "feedback" | "contact">("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [correctCharacter, setCorrectCharacter] = useState<string>("");
  const [feedbackAnswers, setFeedbackAnswers] = useState<number[]>([]);
  const [feedbackAntiAnswers, setFeedbackAntiAnswers] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"game" | "contact">("game");
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
    "Is your character a cricketer?",
    "Is your character associated with Tamil cinema?",
    "Is your character a politician in India?",
    "Is your character considered a cricket legend?",
    "Does your character play for Royal Challengers Bangalore?",
    "Is your character known for their philanthropic work?",
    "Does your character have a distinctive hairstyle or facial hair?",
    "Has your character won an IPL trophy as captain?",
    "Is your character known for their batting skills?",
    "Is your character known for their bowling skills?",
    "Has your character played international cricket for more than 10 years?",
    "Is your character a wicketkeeper?",
    "Is your character a film director as well as an actor?",
    "Has your character acted in over 100 films?",
    "Does your character have a fan base called an 'army'?",
    "Is your character known for their dancing skills?",
    "Has your character received a Padma award?",
    "Is your character associated with Kollywood?",
    "Is your character associated with Bollywood?",
    "Is your character a playback singer?",
    "Has your character composed music for films?",
    "Is your character considered a 'superstar' in their industry?",
    "Is your character known for breaking world records?",
    "Is your character mostly known for their work in the 80s or 90s?",
    "Has your character appeared in reality TV shows?",
    "Is your character a successful entrepreneur?",
  ];

  const [characterProfiles, setCharacterProfiles] = useState([
    {
      name: "Taylor Swift",
      matches: [0, 1, 6, 7, 9, 17, 18, 50, 57, 59],
      antiMatches: [2, 3, 8, 11, 13, 15, 20, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Elon Musk",
      matches: [0, 4, 7, 10, 13, 17, 18, 19, 41, 60],
      antiMatches: [1, 2, 3, 6, 11, 15, 20, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "LeBron James",
      matches: [0, 3, 4, 7, 9, 17, 18, 41, 57],
      antiMatches: [1, 2, 6, 8, 11, 13, 15, 20, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Emma Watson",
      matches: [0, 1, 2, 4, 9, 18, 41],
      antiMatches: [3, 6, 8, 10, 11, 13, 15, 20, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Barack Obama",
      matches: [0, 4, 7, 8, 9, 17, 18, 41, 52],
      antiMatches: [1, 2, 3, 6, 11, 13, 15, 20, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Spider-Man",
      matches: [2, 15, 25, 28, 32, 33, 34],
      antiMatches: [0, 8, 10, 13, 20, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Wonder Woman",
      matches: [1, 2, 15, 25, 27, 28, 32, 33],
      antiMatches: [0, 7, 8, 10, 13, 18, 20, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Harry Potter",
      matches: [2, 12, 14, 32, 33],
      antiMatches: [0, 3, 6, 8, 10, 13, 18, 20, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Beyoncé",
      matches: [0, 1, 4, 6, 7, 9, 17, 18, 41, 50, 51, 57],
      antiMatches: [2, 3, 8, 13, 15, 20, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Bill Gates",
      matches: [0, 4, 7, 10, 13, 17, 41, 60],
      antiMatches: [1, 2, 3, 6, 8, 11, 15, 20, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Oprah Winfrey",
      matches: [0, 1, 4, 7, 9, 10, 17, 18, 41, 59],
      antiMatches: [2, 3, 6, 8, 13, 15, 20, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "The Joker",
      matches: [2, 11, 15, 19, 28, 29, 31],
      antiMatches: [0, 3, 8, 10, 13, 20, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Daenerys Targaryen",
      matches: [1, 2, 12, 15, 32],
      antiMatches: [0, 3, 6, 7, 8, 10, 13, 18, 20, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Michael Jordan",
      matches: [0, 3, 4, 7, 9, 10, 57],
      antiMatches: [1, 2, 6, 8, 11, 13, 15, 20, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Albert Einstein",
      matches: [0, 13, 26, 52],
      antiMatches: [1, 2, 3, 4, 6, 8, 11, 15, 18, 20, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1,
    },
    
    {
      name: "Shah Rukh Khan",
      matches: [0, 2, 4, 9, 17, 18, 19, 20, 28, 31, 41, 49, 51, 53, 57],
      antiMatches: [1, 7, 8, 13, 15, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Priyanka Chopra",
      matches: [0, 1, 2, 4, 9, 18, 20, 34, 41, 49, 50, 53, 59],
      antiMatches: [3, 8, 11, 13, 15, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Virat Kohli",
      matches: [0, 3, 4, 17, 18, 20, 34, 36, 38, 39, 44, 46, 52, 57, 58],
      antiMatches: [1, 2, 6, 8, 13, 15, 25, 32, 37, 43, 45, 47],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Deepika Padukone",
      matches: [0, 1, 2, 4, 9, 18, 20, 50, 51, 53, 57],
      antiMatches: [3, 6, 7, 8, 13, 15, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "Narendra Modi",
      matches: [0, 4, 8, 17, 19, 20, 26, 34, 37, 41, 42, 52, 57],
      antiMatches: [1, 2, 3, 6, 11, 15, 25, 32, 36, 38, 39, 40],
      score: 0,
      categoryWeight: 1,
    },
    {
      name: "A.R. Rahman",
      matches: [0, 4, 6, 9, 20, 41, 52, 54, 55, 56],
      antiMatches: [1, 3, 8, 13, 15, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    },
    
    {
      name: "Your Mom",
      matches: [0, 1, 21, 22],
      antiMatches: [2, 3, 8, 15, 19, 24, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.5,
    },
    {
      name: "Your Dad",
      matches: [0, 21, 22],
      antiMatches: [1, 2, 3, 8, 15, 19, 24, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.5,
    },
    {
      name: "Your Sister",
      matches: [0, 1, 21, 23],
      antiMatches: [2, 8, 15, 19, 22, 24, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.5,
    },
    {
      name: "Your Brother",
      matches: [0, 21, 23],
      antiMatches: [1, 2, 8, 15, 19, 22, 24, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.5,
    },
    {
      name: "Your Best Friend",
      matches: [0, 21],
      antiMatches: [8, 15, 19, 22, 23, 24, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.5,
    },
    {
      name: "Your Crush",
      matches: [0, 21, 24],
      antiMatches: [15, 19, 22, 23, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.5,
    },
    {
      name: "Your Spouse/Partner",
      matches: [0, 21, 24],
      antiMatches: [15, 19, 22, 23, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.5,
    },
    
    {
      name: "Iron Man",
      matches: [2, 10, 13, 25, 26, 27, 30, 31, 32, 34],
      antiMatches: [0, 1, 6, 8, 12, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Captain Jack Sparrow",
      matches: [2, 14, 27, 28, 29, 31],
      antiMatches: [0, 1, 3, 8, 10, 13, 21, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Darth Vader",
      matches: [2, 15, 27, 28, 29, 32, 34],
      antiMatches: [0, 1, 3, 8, 10, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Princess Leia",
      matches: [1, 2, 14, 27, 29, 33],
      antiMatches: [0, 3, 6, 10, 11, 15, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Batman",
      matches: [2, 25, 27, 29, 31, 34],
      antiMatches: [0, 1, 3, 6, 8, 21, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Katniss Everdeen",
      matches: [1, 2, 12, 27, 31],
      antiMatches: [0, 6, 8, 10, 13, 15, 21, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Sherlock Holmes",
      matches: [2, 12, 26, 27, 28, 29],
      antiMatches: [0, 1, 3, 6, 8, 21, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "James Bond",
      matches: [2, 14, 27, 29, 31, 34],
      antiMatches: [0, 1, 3, 6, 8, 21, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2,
    },
    {
      name: "Tom Hanks",
      matches: [0, 4, 7, 9, 14, 30, 41],
      antiMatches: [1, 3, 6, 8, 15, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1
    },
    {
      name: "Lady Gaga",
      matches: [0, 1, 4, 6, 7, 9, 18, 27, 50, 51, 55, 57],
      antiMatches: [2, 3, 8, 13, 15, 25, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1
    },
    {
      name: "Cristiano Ronaldo",
      matches: [0, 3, 4, 7, 17, 18, 34, 41, 57, 58],
      antiMatches: [1, 2, 6, 8, 11, 13, 15, 20, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1
    },
    {
      name: "Dwayne Johnson",
      matches: [0, 2, 4, 7, 9, 14, 18, 31, 41, 42],
      antiMatches: [1, 6, 8, 13, 15, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1
    },
    {
      name: "Sundar Pichai",
      matches: [0, 4, 7, 10, 13, 20, 60],
      antiMatches: [1, 2, 3, 6, 8, 11, 15, 25, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1
    },
  
    {
      name: "Gandalf",
      matches: [2, 12, 15, 26, 27, 28, 32],
      antiMatches: [0, 1, 3, 4, 6, 7, 8, 18, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2
    },
    {
      name: "Black Panther",
      matches: [2, 25, 27, 31, 32, 34],
      antiMatches: [0, 1, 6, 8, 11, 13, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2
    },
    {
      name: "Hermione Granger",
      matches: [1, 2, 12, 14, 26, 32],
      antiMatches: [0, 3, 6, 8, 10, 15, 21, 25, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2
    },
    {
      name: "Tony Soprano",
      matches: [2, 4, 5, 7, 15, 19],
      antiMatches: [1, 3, 6, 8, 13, 21, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2
    },
    {
      name: "Jon Snow",
      matches: [2, 12, 14, 27, 31, 32],
      antiMatches: [0, 6, 8, 10, 13, 21, 25, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2
    },
  
    {
      name: "Cleopatra",
      matches: [0, 1, 5],
      antiMatches: [2, 3, 4, 6, 7, 8, 13, 15, 17, 18, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1
    },
    {
      name: "Mahatma Gandhi",
      matches: [0, 5, 8, 20, 26, 41, 52],
      antiMatches: [1, 2, 3, 6, 7, 15, 18, 21, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1
    },
    {
      name: "Marie Curie",
      matches: [0, 1, 5, 13, 52],
      antiMatches: [2, 3, 6, 7, 8, 15, 18, 21, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1
    },
  
    {
      name: "Your Grandmother",
      matches: [0, 1, 5, 21, 22],
      antiMatches: [2, 3, 6, 8, 15, 18, 24, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.5
    },
    {
      name: "Your Grandfather",
      matches: [0, 5, 21, 22],
      antiMatches: [1, 2, 3, 6, 8, 15, 18, 24, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.5
    },
    {
      name: "Your Teacher",
      matches: [0, 21, 22, 26],
      antiMatches: [2, 3, 8, 15, 19, 23, 24, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.5
    },
  
    {
      name: "MrBeast",
      matches: [0, 4, 7, 18, 41, 60],
      antiMatches: [1, 2, 3, 6, 8, 13, 15, 20, 25, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1
    },
    {
      name: "PewDiePie",
      matches: [0, 4, 7, 18, 59],
      antiMatches: [1, 2, 3, 6, 8, 13, 15, 20, 25, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1
    },
  
    {
      name: "Goku",
      matches: [2, 15, 25, 31, 32, 33, 57],
      antiMatches: [0, 1, 6, 7, 8, 10, 13, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2
    },
    {
      name: "Naruto Uzumaki",
      matches: [2, 15, 25, 28, 31, 32, 33],
      antiMatches: [0, 1, 6, 7, 8, 10, 13, 21, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.2
    },
    {
      name: "MS Dhoni",
      matches: [0, 3, 4, 9, 17, 20, 35, 37, 38, 41, 42, 43, 44, 46, 47, 52, 57, 58],
      antiMatches: [1, 2, 6, 8, 11, 13, 15, 25, 32, 39, 45, 48],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Rajinikanth",
      matches: [0, 4, 9, 20, 36, 37, 41, 42, 48, 49, 52, 53, 56, 57, 58],
      antiMatches: [1, 3, 6, 8, 13, 15, 25, 32, 35, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Vijay",
      matches: [0, 4, 9, 20, 36, 41, 49, 50, 51, 53, 56, 57, 58],
      antiMatches: [1, 3, 6, 8, 13, 15, 25, 32, 35, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Ajith Kumar",
      matches: [0, 4, 9, 20, 36, 41, 42, 49, 50, 51, 53, 56, 57],
      antiMatches: [1, 3, 6, 8, 13, 15, 25, 32, 35, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Suriya",
      matches: [0, 4, 9, 20, 36, 41, 48, 49, 50, 51, 53, 56],
      antiMatches: [1, 3, 6, 8, 13, 15, 25, 32, 35, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    },
  ]);

  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  // Calculate scores based on answers
  const calculateScores = () => {
    // Clone the character profiles to update scores
    const updatedProfiles = [...characterProfiles];
    
    // Calculate scores for each character based on answers
    updatedProfiles.forEach((profile) => {
      let score = 0;
      Object.entries(answers).forEach(([questionIndex, answer]) => {
        const qIndex = parseInt(questionIndex);
        
        // If the answer is "yes" and the question is in matches
        if (answer === "yes" && profile.matches.includes(qIndex)) {
          score += 10 * profile.categoryWeight;
        }
        // If the answer is "no" and the question is in antiMatches
        else if (answer === "no" && profile.antiMatches.includes(qIndex)) {
          score += 10 * profile.categoryWeight;
        }
        // If the answer is "no" and the question is in matches (penalty)
        else if (answer === "no" && profile.matches.includes(qIndex)) {
          score -= 5 * profile.categoryWeight;
        }
        // If the answer is "yes" and the question is in antiMatches (penalty)
        else if (answer === "yes" && profile.antiMatches.includes(qIndex)) {
          score -= 5 * profile.categoryWeight;
        }
        // For "maybe" answers
        else if (answer === "maybe") {
          if (profile.matches.includes(qIndex)) {
            score += 3 * profile.categoryWeight;
          }
          if (profile.antiMatches.includes(qIndex)) {
            score += 3 * profile.categoryWeight;
          }
        }
      });
      
      profile.score = score;
    });
    
    // Sort by score in descending order
    updatedProfiles.sort((a, b) => b.score - a.score);
    setCharacterProfiles(updatedProfiles);
    
    return updatedProfiles[0]; // Return the top character guess
  };

  const handleNextQuestion = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const topCharacter = calculateScores();
      setCorrectCharacter(topCharacter.name);
      setGameState("result");
      toast({
        title: "Game finished!",
        description: `I think your character is ${topCharacter.name}!`,
      });
    }
  };

  const handleStartGame = () => {
    setGameState("playing");
    setCurrentQuestion(0);
    setAnswers({});
    toast({
      title: "Game Started",
      description: "Think of a character and I'll try to guess it!",
    });
  };

  const handleCorrectGuess = () => {
    toast({
      title: "I got it right!",
      description: "Thanks for playing!",
    });
    setGameState("start");
  };

  const handleWrongGuess = () => {
    setGameState("feedback");
    toast({
      title: "I'll do better next time",
      description: "Please provide feedback to help me learn!",
    });
  };

  const handleFeedbackSubmit = (characterName: string) => {
    // Here you would typically send the feedback to a backend
    // For now, we'll just reset the game
    toast({
      title: "Thank you for your feedback!",
      description: `I'll remember that ${characterName} next time.`,
    });
    setGameState("start");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "game" | "contact")} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="game">Game</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>
        
        <TabsContent value="game" className="mt-6">
          <div className="flex flex-col items-center justify-center">
            <Card className="w-full max-w-md glass-card animate-fade-in">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <Brain size={28} className="text-purple-500" />
                  Guess Mate
                </CardTitle>
                <CardDescription>
                  The character guessing game that learns from you
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-6">
                {gameState === "start" && (
                  <div className="text-center space-y-6">
                    <div className="p-6">
                      <div className="text-xl font-semibold mb-2">Welcome to Guess Mate!</div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Think of any character (real or fictional) and I'll try to guess it
                        by asking you up to 20 questions.
                      </p>
                    </div>
                    <Button onClick={handleStartGame} className="glow-button px-8 py-4 rounded-lg">
                      <Sparkles className="mr-2" size={20} />
                      Start Game
                    </Button>
                  </div>
                )}
                
                {gameState === "playing" && (
                  <div className="space-y-6">
                    <div className="mb-4 text-center">
                      <div className="text-sm text-gray-500 mb-1">Question {currentQuestion + 1} of 20</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div 
                          className="bg-purple-600 h-2.5 rounded-full" 
                          style={{ width: `${((currentQuestion + 1) / 20) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="text-lg font-medium text-center mb-6 py-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      {allQuestions[currentQuestion]}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <Button 
                        variant="outline" 
                        className="hover-scale flex items-center justify-center py-6"
                        onClick={() => {
                          handleAnswer(currentQuestion, "yes");
                          handleNextQuestion();
                        }}
                      >
                        <ThumbsUp className="mr-2 text-green-500" size={20} />
                        Yes
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="hover-scale flex items-center justify-center py-6"
                        onClick={() => {
                          handleAnswer(currentQuestion, "no");
                          handleNextQuestion();
                        }}
                      >
                        <ThumbsDown className="mr-2 text-red-500" size={20} />
                        No
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="hover-scale flex items-center justify-center py-6"
                        onClick={() => {
                          handleAnswer(currentQuestion, "maybe");
                          handleNextQuestion();
                        }}
                      >
                        <HelpCircle className="mr-2 text-amber-500" size={20} />
                        Maybe
                      </Button>
                    </div>
                  </div>
                )}
                
                {gameState === "result" && (
                  <div className="text-center space-y-6">
                    <div className="p-6">
                      <div className="text-2xl font-bold mb-4 animate-pulse-gentle">My Guess Is</div>
                      <div className="text-3xl text-purple-600 font-bold mb-6">{correctCharacter}</div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Is this correct?
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        onClick={handleCorrectGuess}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Check className="mr-2" size={18} />
                        Yes
                      </Button>
                      
                      <Button 
                        onClick={handleWrongGuess}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        <X className="mr-2" size={18} />
                        No
                      </Button>
                    </div>
                  </div>
                )}
                
                {gameState === "feedback" && (
                  <div className="space-y-6">
                    <div className="text-center mb-4">
                      <div className="text-xl font-semibold mb-2">Who were you thinking of?</div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Help me learn by telling me the correct character
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="character-name">Character Name</Label>
                        <Input 
                          id="character-name" 
                          placeholder="Enter the character name"
                          value={correctCharacter}
                          onChange={(e) => setCorrectCharacter(e.target.value)}
                        />
                      </div>
                      
                      <Button 
                        onClick={() => handleFeedbackSubmit(correctCharacter)}
                        disabled={!correctCharacter.trim()}
                        className="w-full"
                      >
                        Submit Feedback
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              
              {(gameState === "playing" || gameState === "result" || gameState === "feedback") && (
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="flex items-center"
                    onClick={() => setGameState("start")}
                  >
                    <ChevronLeft className="mr-1" size={16} />
                    Back to Start
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="contact" className="mt-6">
          <Card className="glass-card animate-fade-in">
            <CardHeader>
              <CardTitle>Contact the Developer</CardTitle>
              <CardDescription>
                Feel free to reach out if you have any questions or feedback
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-purple-500" />
                  <span>hamsadakshin5@gmail.com</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="text-purple-500" />
                  <span>8008031676</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Linkedin className="text-purple-500" />
                  <a 
                    href="https://www.linkedin.com/in/dakshina-prasath/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-500"
                  >
                    linkedin.com/in/dakshina-prasath
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Instagram className="text-purple-500" />
                  <a 
                    href="https://www.instagram.com/dakshin__dp" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-500"
                  >
                    @dakshin__dp
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
