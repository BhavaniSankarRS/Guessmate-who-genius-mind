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
      matches: [0, 4, 6, 9, 20, 28, 41, 52, 54, 55],
      antiMatches: [1, 2, 3, 8, 11, 13, 15, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1,
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
    {
      name: "AR Rahman",
      matches: [0, 4, 6,
