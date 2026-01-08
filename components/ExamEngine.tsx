
import React, { useState, useEffect, useCallback } from 'react';
import { Question } from '../types';
import { SECONDS_PER_QUESTION, EXAM_DURATION_MINUTES } from '../constants';

interface Props {
  questions: Question[];
  answers: Record<number, number>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  onFinish: () => void;
}

const ExamEngine: React.FC<Props> = ({ questions, answers, setAnswers, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [totalTimeLeft, setTotalTimeLeft] = useState(EXAM_DURATION_MINUTES * 60);

  const currentQuestion = questions[currentIndex];

  const goToNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setQuestionTimeLeft(SECONDS_PER_QUESTION);
    } else {
      onFinish();
    }
  }, [currentIndex, questions.length, onFinish]);

  // Question Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setQuestionTimeLeft((prev) => {
        if (prev <= 1) {
          goToNext();
          return SECONDS_PER_QUESTION;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [goToNext]);

  // Total Exam Timer
  useEffect(() => {
    const totalTimer = setInterval(() => {
      setTotalTimeLeft((prev) => {
        if (prev <= 1) {
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(totalTimer);
  }, [onFinish]);

  const handleSelect = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-col h-full min-h-[500px]">
      {/* Top Header */}
      <div className="p-4 bg-slate-50 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            سؤال {currentIndex + 1} / {questions.length}
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${questionTimeLeft < 10 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-200 text-slate-700'}`}>
            المؤقت: {questionTimeLeft} ثانية
          </div>
        </div>
        <div className="text-sm font-bold text-slate-500">
          الوقت الكلي المتبقي: {formatTime(totalTimeLeft)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-200">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Content */}
      <div className="p-8 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-slate-800 mb-8" dir="ltr">
          {currentQuestion.text}
        </h3>

        <div className="space-y-4">
          {currentQuestion.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-150 flex items-center gap-4 ${
                answers[currentQuestion.id] === idx 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
              dir="ltr"
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                answers[currentQuestion.id] === idx ? 'border-blue-600' : 'border-slate-300'
              }`}>
                {answers[currentQuestion.id] === idx && <div className="w-3 h-3 rounded-full bg-blue-600"></div>}
              </div>
              <span className="text-lg">{opt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-6 border-t flex justify-between items-center bg-slate-50">
        <button 
          onClick={onFinish}
          className="px-6 py-2 border-2 border-slate-300 text-slate-500 font-bold rounded-lg hover:bg-white hover:text-red-500 hover:border-red-500 transition-colors"
        >
          إنهاء الامتحان وإرسال
        </button>
        
        <button 
          onClick={goToNext}
          className="bg-blue-900 text-white px-10 py-3 rounded-lg font-bold hover:bg-blue-800 shadow-md shadow-blue-900/10 active:scale-95 transition-all"
        >
          {currentIndex === questions.length - 1 ? 'إنهاء الإرسال' : 'السؤال التالي ⏭'}
        </button>
      </div>
    </div>
  );
};

export default ExamEngine;
