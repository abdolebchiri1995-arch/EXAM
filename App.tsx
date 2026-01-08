
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  AppState, 
  Student, 
  ExamResult 
} from './types';
import { 
  EXAM_START_TIME, 
  EXAM_QUESTIONS, 
  POINTS_PER_CORRECT_ANSWER,
  MAX_VIOLATIONS,
  SECONDS_PER_QUESTION,
  EXAM_DURATION_MINUTES
} from './constants';

// --- Components ---
import LoginPage from './components/LoginPage';
import InstructionsPage from './components/InstructionsPage';
import ExamEngine from './components/ExamEngine';
import ResultsPage from './components/ResultsPage';
import ExclusionPage from './components/ExclusionPage';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOGIN);
  const [student, setStudent] = useState<Student | null>(null);
  const [violations, setViolations] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  // Anti-cheat: Visibility & Focus detection
  useEffect(() => {
    if (appState !== AppState.EXAM) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleViolation("تم اكتشاف محاولة خروج من الصفحة (Visibility Change)");
      }
    };

    const handleBlur = () => {
      handleViolation("تم اكتشاف فقدان التركيز على الصفحة (Blur Event)");
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [appState]);

  // Anti-cheat: Keyboard & Context Menu
  useEffect(() => {
    const preventShortcuts = (e: KeyboardEvent) => {
      // Prevent PrintScreen, Ctrl+C, Ctrl+V, Ctrl+U, F12
      if (
        e.key === 'PrintScreen' || 
        (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'u' || e.key === 'p')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        alert('هذا الإجراء غير مسموح به أثناء الامتحان');
        if (appState === AppState.EXAM) {
          handleViolation("محاولة استخدام اختصارات لوحة المفاتيح");
        }
      }
    };

    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener('keydown', preventShortcuts);
    window.addEventListener('contextmenu', preventContextMenu);

    return () => {
      window.removeEventListener('keydown', preventShortcuts);
      window.removeEventListener('contextmenu', preventContextMenu);
    };
  }, [appState]);

  const handleViolation = useCallback((reason: string) => {
    setViolations((prev) => {
      const newCount = prev + 1;
      if (newCount >= MAX_VIOLATIONS) {
        setAppState(AppState.EXCLUDED);
        return newCount;
      }
      alert(`تحذير غش: ${reason}. لقد قمت بـ ${newCount} مخالفات من أصل ${MAX_VIOLATIONS}`);
      return newCount;
    });
  }, []);

  const handleLogin = (data: Student) => {
    const now = Date.now();
    // Check if it's past 14:00 on exam day
    if (now > EXAM_START_TIME) {
      alert('عذراً، لقد بدأ الامتحان بالفعل. لا يمكن الدخول المتأخر.');
      setAppState(AppState.EXCLUDED);
      return;
    }
    
    // Check for device lock (simple localStorage check)
    const existingUser = localStorage.getItem('exam_user_active');
    if (existingUser && existingUser !== data.firstName + data.lastName) {
       alert('عذراً، هذه المنصة مفعلة على جهاز آخر بالفعل.');
       return;
    }
    localStorage.setItem('exam_user_active', data.firstName + data.lastName);

    setStudent(data);
    setAppState(AppState.INSTRUCTIONS);
  };

  const startExam = () => {
    setStartTime(Date.now());
    setAppState(AppState.EXAM);
  };

  const finishExam = () => {
    const now = Date.now();
    const timeTaken = Math.floor((now - startTime) / 1000);
    
    let correct = 0;
    EXAM_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const score = Math.min(20, correct * POINTS_PER_CORRECT_ANSWER);

    setExamResult({
      score,
      totalCorrect: correct,
      timeTaken,
      violations,
      timestamp: now
    });
    setAppState(AppState.RESULT);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
        {appState === AppState.LOGIN && (
          <LoginPage onLogin={handleLogin} />
        )}
        
        {appState === AppState.INSTRUCTIONS && student && (
          <InstructionsPage student={student} onStart={startExam} />
        )}

        {appState === AppState.EXAM && (
          <ExamEngine 
            questions={EXAM_QUESTIONS} 
            answers={answers} 
            setAnswers={setAnswers} 
            onFinish={finishExam}
          />
        )}

        {appState === AppState.RESULT && examResult && (
          <ResultsPage result={examResult} />
        )}

        {appState === AppState.EXCLUDED && (
          <ExclusionPage violations={violations} />
        )}
      </div>

      <footer className="mt-8 text-slate-500 text-sm flex flex-col items-center gap-1">
        <p>تحيات مقياس المادة</p>
        <p className="font-bold text-slate-800 text-lg">د. بعلي محمد</p>
        <p className="mt-2 text-xs opacity-60">© 2026 ExamPro System</p>
      </footer>
    </div>
  );
};

export default App;
