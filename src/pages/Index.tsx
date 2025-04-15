
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
      matches: [0, 4, 6, 9, 20, 36, 41, 52, 54, 55, 57],
      antiMatches: [1, 3, 8, 15, 25, 32, 35, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Nayanthara",
      matches: [0, 1, 4, 9, 20, 36, 41, 49, 50, 51, 53, 56, 57],
      antiMatches: [3, 6, 8, 13, 15, 25, 32, 35, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Dhanush",
      matches: [0, 4, 6, 9, 20, 36, 41, 49, 50, 51, 53, 55, 56],
      antiMatches: [1, 3, 8, 13, 15, 25, 32, 35, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Sachin Tendulkar",
      matches: [0, 3, 4, 9, 17, 20, 35, 38, 41, 44, 46, 52, 57, 58],
      antiMatches: [1, 2, 6, 8, 11, 13, 15, 25, 32, 36, 37, 39, 43, 45, 47],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Rahul Dravid",
      matches: [0, 3, 4, 9, 20, 35, 38, 41, 42, 44, 46, 52],
      antiMatches: [1, 2, 6, 8, 11, 13, 15, 25, 32, 36, 37, 39, 43, 45, 47],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Rohit Sharma",
      matches: [0, 3, 4, 17, 20, 35, 41, 44, 46],
      antiMatches: [1, 2, 6, 8, 11, 13, 15, 25, 32, 36, 37, 39, 43, 45, 47],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Aishwarya Rai",
      matches: [0, 1, 4, 9, 17, 20, 41, 49, 50, 51, 52, 53, 56, 57],
      antiMatches: [3, 6, 8, 13, 15, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Amitabh Bachchan",
      matches: [0, 4, 5, 9, 20, 41, 49, 52, 53, 57, 58],
      antiMatches: [1, 3, 6, 8, 13, 15, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Aamir Khan",
      matches: [0, 4, 9, 20, 41, 48, 49, 52, 53, 57],
      antiMatches: [1, 3, 6, 8, 13, 15, 25, 32, 36, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Kamal Haasan",
      matches: [0, 4, 9, 20, 36, 41, 48, 49, 52, 53, 56, 57, 58],
      antiMatches: [1, 3, 6, 8, 13, 15, 25, 32, 35, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Vijay Sethupathi",
      matches: [0, 4, 9, 20, 36, 49, 53, 56],
      antiMatches: [1, 3, 6, 8, 13, 15, 25, 32, 35, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Vikram",
      matches: [0, 4, 9, 20, 36, 41, 49, 53, 56],
      antiMatches: [1, 3, 6, 8, 13, 15, 25, 32, 35, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Samantha Ruth Prabhu",
      matches: [0, 1, 4, 9, 20, 36, 41, 49, 50, 51, 53, 56],
      antiMatches: [3, 6, 8, 13, 15, 25, 32, 35, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    },
    {
      name: "Trisha Krishnan",
      matches: [0, 1, 4, 9, 20, 36, 50, 53, 56],
      antiMatches: [3, 6, 8, 13, 15, 25, 32, 35, 37, 38, 39, 40],
      score: 0,
      categoryWeight: 1.3,
    }
  ]);

  const [questionPath, setQuestionPath] = useState<number[]>([]);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());
  const [askedQuestions, setAskedQuestions] = useState<Set<number>>(new Set());

  const questionCategories = {
    initial: [0, 2, 21],
    realPerson: [1, 4, 7, 20],
    fictional: [25, 26, 32],
    celebrity: [3, 6, 8, 9, 10],
    movie: [28, 29, 30, 31],
    personal: [22, 23, 24],
    indian: [20, 35, 36, 37, 38, 39, 40, 52, 53],
    cricket: [36, 43, 44, 45, 46, 47],
    tamil: [36, 49, 50, 53, 56],
  };

  useEffect(() => {
    if (gameState === "playing" && questionPath.length === 0) {
      const initialQuestionIndex = 0;
      setCurrentQuestion(initialQuestionIndex);
      setQuestionPath([initialQuestionIndex]);
      setUsedQuestions(new Set([initialQuestionIndex]));
      setAskedQuestions(new Set([initialQuestionIndex]));
    }
  }, [gameState, questionPath.length]);

  const startGame = () => {
    setGameState("playing");
    setAnswers({});
    setUsedQuestions(new Set());
    setAskedQuestions(new Set());
    setQuestionPath([]);
    setCurrentQuestion(0);
    
    toast({
      title: "Game started!",
      description: "Think of a person and answer the questions.",
      className: "glass-card",
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
          score -= 3;
        } else if (answer === "no" && character.matches.includes(qIndex)) {
          score -= 3;
        } else if (answer === "maybe" && character.matches.includes(qIndex)) {
          score += 0.5;
        } else if (answer === "maybe" && character.antiMatches.includes(qIndex)) {
          score += 0.5;
        }
      });
      return { ...character, score: score * character.categoryWeight };
    });

    updatedProfiles.sort((a, b) => b.score - a.score);
    
    const topCandidates = updatedProfiles.filter(
      char => char.score > Math.max(updatedProfiles[0].score * 0.6, 2) && char.score > 0
    );
    
    if (topCandidates.length === 0) {
      const unusedInitial = questionCategories.initial.filter(q => !askedQuestions.has(q));
      if (unusedInitial.length > 0) {
        return unusedInitial[0];
      }
    }

    const remainingQuestions = allQuestions
      .map((_, index) => index)
      .filter(index => !askedQuestions.has(index));

    if (remainingQuestions.length === 0) {
      return -1;
    }

    // More specialized question selection based on previous answers
    let isIndianCharacter = false;
    let isCricketer = false;
    let isTamilCinema = false;
    
    if (answers["20"] === "yes") {
      isIndianCharacter = true;
    }
    
    if (answers["36"] === "yes") {
      isCricketer = true;
    }
    
    if (answers["37"] === "yes") {
      isTamilCinema = true;
    }
    
    // Track previously asked question types to avoid asking similar questions in a row
    const recentQuestionTypes = questionPath.slice(-3).map(qIndex => {
      if (questionCategories.cricket.includes(qIndex)) return 'cricket';
      if (questionCategories.tamil.includes(qIndex)) return 'tamil';
      if (questionCategories.indian.includes(qIndex)) return 'indian';
      if (questionCategories.personal.includes(qIndex)) return 'personal';
      if (questionCategories.fictional.includes(qIndex)) return 'fictional';
      if (questionCategories.movie.includes(qIndex)) return 'movie';
      return 'general';
    });
    
    // Calculate how related each question would be to the potential matches
    const questionScores = remainingQuestions.map(qIndex => {
      let yesCount = 0;
      let noCount = 0;
      let maybeCount = 0;
      
      topCandidates.forEach(character => {
        if (character.matches.includes(qIndex)) yesCount++;
        else if (character.antiMatches.includes(qIndex)) noCount++;
        else maybeCount++;
      });
      
      const totalResponses = topCandidates.length;
      
      // Calculate how divisive this question would be (closer to 0.5 split is better)
      // Using absolute difference from 0.5 gives us how far from ideal split
      const splitScore = Math.abs((yesCount / totalResponses) - 0.5) + 
                         Math.abs((noCount / totalResponses) - 0.5);
      
      // Start with base priority
      let priorityBonus = 0;
      
      // Special question type prioritization
      if (isIndianCharacter && questionCategories.indian.includes(qIndex)) {
        priorityBonus -= 2.5;
      }
      
      if (isCricketer && questionCategories.cricket.includes(qIndex)) {
        priorityBonus -= 3;
      }
      
      if (isTamilCinema && questionCategories.tamil.includes(qIndex)) {
        priorityBonus -= 3;
      }
      
      if (answers["21"] === "yes" && questionCategories.personal.includes(qIndex)) {
        priorityBonus -= 3.5;
      }
      
      if (answers["0"] === "no" && questionCategories.fictional.includes(qIndex)) {
        priorityBonus -= 2.5;
      }
      
      if (answers["0"] === "yes" && !askedQuestions.has(1) && qIndex === 1) {
        priorityBonus -= 1.5;
      }
      
      if (answers["2"] === "yes" && questionCategories.movie.includes(qIndex)) {
        priorityBonus -= 2;
      }
      
      if (answers["3"] === "yes" && qIndex === 35) {
        priorityBonus -= 3;
      }

      if (answers["20"] === "yes" && qIndex === 36) {
        priorityBonus -= 3;
      }
      
      // Avoid asking questions from the same category repeatedly
      let questionType = 'general';
      if (questionCategories.cricket.includes(qIndex)) questionType = 'cricket';
      else if (questionCategories.tamil.includes(qIndex)) questionType = 'tamil';
      else if (questionCategories.indian.includes(qIndex)) questionType = 'indian';
      else if (questionCategories.personal.includes(qIndex)) questionType = 'personal';
      else if (questionCategories.fictional.includes(qIndex)) questionType = 'fictional';
      else if (questionCategories.movie.includes(qIndex)) questionType = 'movie';
      
      // Add penalty for questions in the same category as recent questions
      const categoryRepetitionCount = recentQuestionTypes.filter(type => type === questionType).length;
      priorityBonus += categoryRepetitionCount * 1.5;

      return { qIndex, score: splitScore + priorityBonus };
    });
    
    questionScores.sort((a, b) => a.score - b.score);
    
    return questionScores.length > 0 ? questionScores[0].qIndex : -1;
  };

  const answerQuestion = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);
    
    const newQuestionPath = [...questionPath, currentQuestion];
    setQuestionPath(newQuestionPath);
    
    const newAskedQuestions = new Set(askedQuestions);
    newAskedQuestions.add(currentQuestion);
    setAskedQuestions(newAskedQuestions);
    
    // End the game after enough questions or when we're confident
    if (newQuestionPath.length >= 15 || (newQuestionPath.length >= 8 && getConfidenceLevel(newAnswers) > 85)) {
      setGameState("result");
      return;
    }
    
    const newUsedQuestions = new Set(usedQuestions);
    let nextQuestion = getNextBestQuestion();
    
    if (nextQuestion === -1) {
      setGameState("result");
      return;
    }
    
    if (!newUsedQuestions.has(nextQuestion)) {
      newUsedQuestions.add(nextQuestion);
    } else {
      const unusedQuestions = allQuestions
        .map((_, index) => index)
        .filter(index => !newUsedQuestions.has(index) && !newAskedQuestions.has(index));
      
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
  
  // Helper function to calculate confidence level in current best guess
  const getConfidenceLevel = (currentAnswers) => {
    const { characterGuess, accuracy } = guessCharacter(currentAnswers);
    return parseInt(accuracy, 10);
  };

  const goToPreviousQuestion = () => {
    if (questionPath.length <= 1) {
      return;
    }
    
    // Fix for the previous button
    const newQuestionPath = questionPath.slice(0, -1);
    const previousQuestionIndex = questionPath[questionPath.length - 2]; // Go back to the question before the current one
    
    setQuestionPath(newQuestionPath);
    setCurrentQuestion(previousQuestionIndex);
    
    const newAnswers = { ...answers };
    const lastAnsweredQuestion = questionPath[questionPath.length - 1];
    delete newAnswers[lastAnsweredQuestion];
    setAnswers(newAnswers);
    
    const newAskedQuestions = new Set(askedQuestions);
    newAskedQuestions.delete(lastAnsweredQuestion);
    setAskedQuestions(newAskedQuestions);
    
    toast({
      title: "Going back",
      description: "You can now change your previous answer.",
      className: "glass-card",
    });
  };

  const guessCharacter = (currentAnswers = answers) => {
    const scoredProfiles = characterProfiles.map(character => ({
      ...character,
      score: 0
    }));
    
    scoredProfiles.forEach(character => {
      let score = 0;
      let maxPossiblePoints = 0;
      let matchingPoints = 0;
      let antiMatchPoints = 0;
      let negativePoints = 0;
      
      Object.entries(currentAnswers).forEach(([questionIndex, answer]) => {
        const qIndex = Number(questionIndex);
        maxPossiblePoints += 2;
        
        // Improved scoring system
        if (answer === "yes" && character.matches.includes(qIndex)) {
          score += 4;
          matchingPoints += 4;
        } else if (answer === "no" && character.antiMatches.includes(qIndex)) {
          score += 3;
          antiMatchPoints += 3;
        } else if (answer === "yes" && character.antiMatches.includes(qIndex)) {
          score -= 6;
          negativePoints += 6;
        } else if (answer === "no" && character.matches.includes(qIndex)) {
          score -= 6;
          negativePoints += 6;
        } else if (answer === "maybe" && character.matches.includes(qIndex)) {
          score += 1;
          matchingPoints += 1;
        } else if (answer === "maybe" && character.antiMatches.includes(qIndex)) {
          score += 1;
          antiMatchPoints += 1;
        }
      });
      
      // Calculate more comprehensive coverage metrics
      const matchCoverage = character.matches.length > 0 ? 
        character.matches.filter(q => currentAnswers[q] === "yes").length / character.matches.length : 0;
      
      const antiMatchCoverage = character.antiMatches.length > 0 ? 
        character.antiMatches.filter(q => currentAnswers[q] === "no").length / character.antiMatches.length : 0;
      
      // Question coverage with diminishing returns - more questions are better but with diminishing returns
      const questionCoverage = Math.min(1, Object.keys(currentAnswers).length / 12);
      
      // Calculate negative match ratio - how many contradictions did we get?
      const contradictionCount = character.matches.filter(q => currentAnswers[q] === "no").length +
                               character.antiMatches.filter(q => currentAnswers[q] === "yes").length;
      
      const contradictionRatio = contradictionCount / Math.max(1, Object.keys(currentAnswers).length);
      
      // Final score calculation
      const finalScore = score * character.categoryWeight * 
        (1 + questionCoverage * 0.4) * 
        (1 + matchCoverage * 0.8) * 
        (1 + antiMatchCoverage * 0.6) * 
        Math.pow(0.7, contradictionRatio * 5); // Exponential penalty for contradictions
      
      character.score = finalScore;
    });

    const sortedProfiles = [...scoredProfiles].sort((a, b) => b.score - a.score);
    const topCharacter = sortedProfiles[0];

    let confidence = 50;
    
    if (topCharacter.score > 0) {
      // Get score difference with runner-up
      const runnerUpScore = sortedProfiles[1]?.score || 0;
      const scoreDifference = Math.max(0, topCharacter.score - runnerUpScore);
      const questionCount = Object.keys(currentAnswers).length;
      
      // More sophisticated confidence calculation based on multiple factors
      confidence = Math.min(99, 50 + 
                  (scoreDifference * 4) + 
                  (questionCount * 2) + 
                  (topCharacter.score > 15 ? 20 : topCharacter.score > 10 ? 15 : 0));
      
      // Extra confidence for well-known characters
      if (["MS Dhoni", "Virat Kohli", "Sachin Tendulkar", "Rajinikanth", "Shah Rukh Khan"].includes(topCharacter.name)) {
        confidence = Math.min(99, confidence + 5);
      }
    }
    
    // Minimum confidence level based on question count
    if (Object.keys(currentAnswers).length >= 12) {
      confidence = Math.max(confidence, 75);
    } else if (Object.keys(currentAnswers).length >= 8) {
      confidence = Math.max(confidence, 65);
    }
    
    confidence = Math.min(99, Math.round(confidence));
    
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
        className: "glass-card",
      });
      return;
    }

    const existingCharacterIndex = characterProfiles.findIndex(
      char => char.name.toLowerCase() === correctCharacter.toLowerCase()
    );
    
    const newCharacterProfile = {
      name: correctCharacter,
      matches: feedbackAnswers,
      antiMatches: feedbackAntiAnswers,
      score: 0,
      categoryWeight: 1.3,
    };

    let updatedProfiles = [...characterProfiles];
    
    if (existingCharacterIndex !== -1) {
      const existingChar = characterProfiles[existingCharacterIndex];
      
      const mergedMatches = [...new Set([...existingChar.matches, ...feedbackAnswers])];
      const mergedAntiMatches = [...new Set([...existingChar.antiMatches, ...feedbackAntiAnswers])];
      
      // Remove any conflicts (same question in both matches and antiMatches)
      const finalMatches = mergedMatches.filter(q => !mergedAntiMatches.includes(q));
      const finalAntiMatches = mergedAntiMatches.filter(q => !mergedMatches.includes(q));
      
      updatedProfiles[existingCharacterIndex] = {
        ...existingChar,
        matches: finalMatches,
        antiMatches: finalAntiMatches,
        categoryWeight: 1.3,
      };
      
      toast({
        title: "Character updated!",
        description: `I've updated my knowledge about "${correctCharacter}" and will do better next time!`,
        className: "glass-card",
      });
    } else {
      updatedProfiles.push(newCharacterProfile);
      
      toast({
        title: "Thank you!",
        description: `I've learned about "${correctCharacter}" and will do better next time!`,
        className: "glass-card",
      });
    }
    
    // Save to localStorage
    try {
      localStorage.setItem("characterProfiles", JSON.stringify(updatedProfiles));
      setCharacterProfiles(updatedProfiles);
      setCorrectCharacter("");
      setFeedbackAnswers([]);
      setFeedbackAntiAnswers([]);
      setGameState("start");
    } catch (error) {
      toast({
        title: "Storage error",
        description: "There was a problem saving the character data. Your browser storage may be full.",
        variant: "destructive",
        className: "glass-card",
      });
    }
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

  const renderGameContent = () => {
    switch (gameState) {
      case "start":
        return (
          <Card className="w-full max-w-md mx-auto glass-card animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Guess Mate</CardTitle>
              <CardDescription className="text-lg mt-2">
                Think of a person and answer the questions.
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
                  className="flex flex-col gap-2 hover-scale transition-all border-2 hover:border-green-500"
                  onClick={() => answerQuestion("yes")}
                >
                  <ThumbsUp className="h-5 w-5 text-green-500" />
                  <span>Yes</span>
                </Button>
                <Button 
                  variant="outline"
                  className="flex flex-col gap-2 hover-scale transition-all border-2 hover:border-red-500"
                  onClick={() => answerQuestion("no")}
                >
                  <ThumbsDown className="h-5 w-5 text-red-500" />
                  <span>No</span>
                </Button>
                <Button 
                  variant="outline"
                  className="flex flex-col gap-2 hover-scale transition-all border-2 hover:border-amber-500"
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
                    style={{ width: `${(questionPath.length / 15) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {questionPath.length} / 15
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
                      className: "glass-card",
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
      default:
        return null;
    }
  };
  
  const renderContactContent = () => {
    return (
      <Card className="w-full max-w-md mx-auto glass-card animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Contact Information
          </CardTitle>
          <CardDescription>
            Get in touch with the developer
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-6 py-4">
          <div className="flex items-center space-x-4 p-3 rounded-lg bg-primary/5 hover-scale">
            <div className="rounded-full bg-primary/10 p-2">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Email</p>
              <a href="mailto:hamsadakshin5@gmail.com" className="text-sm text-indigo-600 dark:text-indigo-400">
                hamsadakshin5@gmail.com
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 rounded-lg bg-primary/5 hover-scale">
            <div className="rounded-full bg-primary/10 p-2">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Phone</p>
              <a href="tel:8008031676" className="text-sm text-indigo-600 dark:text-indigo-400">
                8008031676
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 rounded-lg bg-primary/5 hover-scale">
            <div className="rounded-full bg-primary/10 p-2">
              <Linkedin className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">LinkedIn</p>
              <a 
                href="https://www.linkedin.com/in/dakshina-prasath/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 dark:text-indigo-400"
              >
                dakshina-prasath
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 rounded-lg bg-primary/5 hover-scale">
            <div className="rounded-full bg-primary/10 p-2">
              <Instagram className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Instagram</p>
              <a 
                href="https://www.instagram.com/dakshin__dp?igsh=MXMweWpjazV2bGplcg%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 dark:text-indigo-400"
              >
                dakshin__dp
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  useEffect(() => {
    const savedProfiles = localStorage.getItem("characterProfiles");
    if (savedProfiles) {
      try {
        setCharacterProfiles(JSON.parse(savedProfiles));
      } catch (error) {
        console.error("Error loading saved character profiles:", error);
      }
    }
  }, []);

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
      
      <Tabs defaultValue="game" className="w-full max-w-md" onValueChange={(value) => setActiveTab(value as "game" | "contact")}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="game" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">Game</TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">Contact</TabsTrigger>
        </TabsList>
        
        <TabsContent value="game" className="mt-0">
          {renderGameContent()}
        </TabsContent>
        
        <TabsContent value="contact" className="mt-0">
          {renderContactContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;

