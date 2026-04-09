"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { getRandomQuestions, QuizQuestion } from "@/lib/quiz-data";
import { saveQuizResult, getUserQuizResults } from "@/lib/tippa-store";
import { QuizResult } from "@/lib/tippa-types";
import { Trophy, RotateCcw, Check, X } from "lucide-react";
import Link from "next/link";

type QuizState = "idle" | "playing" | "result";

export default function QuizPage() {
  const { user } = useAuth();
  const [state, setState] = useState<QuizState>("idle");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (user) {
      getUserQuizResults(user.id).then((results) => {
        setAttempts(results.length);
        if (results.length > 0) {
          setBestScore(Math.max(...results.map(r => r.score)));
        }
      });
    }
  }, [user]);

  const startQuiz = useCallback(() => {
    setQuestions(getRandomQuestions(10));
    setCurrentIndex(0);
    setAnswers([]);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setState("playing");
  }, []);

  function handleAnswer(optionIndex: number) {
    if (revealed) return;
    setSelected(optionIndex);
    setRevealed(true);

    const isCorrect = optionIndex === questions[currentIndex].correctIndex;
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    if (isCorrect) setScore(prev => prev + 1);

    setTimeout(() => {
      if (currentIndex < 9) {
        setCurrentIndex(prev => prev + 1);
        setSelected(null);
        setRevealed(false);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        setState("result");
        if (user) {
          saveQuizResult(user.id, finalScore).then(() => {
            setAttempts(prev => prev + 1);
            if (bestScore === null || finalScore > bestScore) setBestScore(finalScore);
          });
        }
      }
    }, 1200);
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {state === "idle" && (
        <div className="text-center">
          <div className="text-6xl mb-6">🧠</div>
          <h1 className="text-4xl font-black text-white mb-3">VM-quizet</h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Testa dina kunskaper om fotbolls-VM! 10 slumpmässiga frågor om VM-historia, VM 2026 och svensk fotboll.
          </p>

          {bestScore !== null && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 inline-block">
              <p className="text-gray-400 text-sm">Ditt bästa resultat: <span className="text-[#f5c518] font-black text-lg">{bestScore}/10</span></p>
              <p className="text-gray-500 text-xs">{attempts} försök</p>
            </div>
          )}

          <div className="space-y-3">
            <button onClick={startQuiz} className="w-full max-w-xs mx-auto bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-black py-3.5 rounded-full text-lg transition-colors block">
              Starta quiz
            </button>
            {!user && (
              <p className="text-gray-500 text-xs">Logga in för att spara ditt resultat och låsa upp utmärkelser.</p>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-10 text-left max-w-sm mx-auto">
            <h3 className="font-bold text-white mb-3">Så funkar det</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-3"><span className="bg-[#f5c518] text-[#0a1628] font-black px-2 py-0.5 rounded text-xs">10</span> Slumpmässiga frågor</div>
              <div className="flex items-center gap-3"><span className="bg-white/20 text-white font-black px-2 py-0.5 rounded text-xs">4</span> Svarsalternativ per fråga</div>
              <div className="flex items-center gap-3"><span className="bg-[#f5c518] text-[#0a1628] font-black px-2 py-0.5 rounded text-xs">🧠</span> 10/10 = utmärkelsen VM-experten</div>
            </div>
          </div>
        </div>
      )}

      {state === "playing" && currentQ && (
        <div>
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-400 text-sm font-medium">Fråga {currentIndex + 1}/10</span>
            <span className="text-[#f5c518] font-bold text-sm">{score} rätt</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5 mb-8">
            <div className="bg-[#f5c518] h-1.5 rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / 10) * 100}%` }} />
          </div>

          {/* Question */}
          <h2 className="text-xl font-bold text-white mb-6 leading-relaxed">{currentQ.question}</h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, i) => {
              let style = "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 cursor-pointer";
              if (revealed) {
                if (i === currentQ.correctIndex) {
                  style = "bg-green-500/20 border-green-500/50 text-green-300";
                } else if (i === selected && i !== currentQ.correctIndex) {
                  style = "bg-red-500/20 border-red-500/50 text-red-300";
                } else {
                  style = "bg-white/5 border-white/10 text-gray-600";
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={revealed}
                  className={`w-full text-left px-5 py-4 rounded-xl border font-medium transition-all flex items-center justify-between ${style}`}
                >
                  <span>{option}</span>
                  {revealed && i === currentQ.correctIndex && <Check size={18} className="text-green-400" />}
                  {revealed && i === selected && i !== currentQ.correctIndex && <X size={18} className="text-red-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {state === "result" && (
        <div className="text-center">
          <div className="text-6xl mb-4">
            {score === 10 ? "🏆" : score >= 7 ? "🎉" : score >= 4 ? "👍" : "😅"}
          </div>
          <h2 className="text-3xl font-black text-white mb-2">
            {score === 10 ? "Perfekt!" : score >= 7 ? "Imponerande!" : score >= 4 ? "Bra jobbat!" : "Bättre lycka nästa gång!"}
          </h2>
          <p className="text-5xl font-black text-[#f5c518] mb-2">{score}/10</p>
          <p className="text-gray-400 mb-8">rätta svar</p>

          {score === 10 && (
            <div className="bg-[#f5c518]/10 border border-[#f5c518]/40 rounded-2xl p-6 mb-8 inline-block">
              <p className="text-4xl mb-2">🧠</p>
              <p className="text-[#f5c518] font-black text-lg">VM-experten</p>
              <p className="text-gray-400 text-sm">Du låste upp utmärkelsen!</p>
            </div>
          )}

          {/* Review answers */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 text-left">
            <h3 className="font-bold text-white mb-3 text-sm">Dina svar</h3>
            <div className="space-y-2">
              {questions.map((q, i) => {
                const isCorrect = answers[i] === q.correctIndex;
                return (
                  <div key={q.id} className="flex items-start gap-2 text-sm">
                    <span className={`shrink-0 mt-0.5 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                      {isCorrect ? <Check size={14} /> : <X size={14} />}
                    </span>
                    <div>
                      <span className="text-gray-300">{q.question}</span>
                      {!isCorrect && (
                        <span className="text-green-400 text-xs block mt-0.5">Rätt svar: {q.options[q.correctIndex]}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={startQuiz} className="inline-flex items-center justify-center gap-2 bg-[#f5c518] hover:bg-[#d4a017] text-[#0a1628] font-black px-8 py-3 rounded-full transition-colors">
              <RotateCcw size={18} /> Spela igen
            </button>
            <Link href="/tippa" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-full transition-colors">
              <Trophy size={18} /> Tippa matcher
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
