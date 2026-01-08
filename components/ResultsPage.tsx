
import React from 'react';
import { ExamResult } from '../types';

interface Props {
  result: ExamResult;
}

const ResultsPage: React.FC<Props> = ({ result }) => {
  const getStatusColor = () => {
    if (result.score >= 10) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <div className="p-10 text-center">
      <div className="mb-6 inline-flex p-4 bg-blue-50 rounded-full">
        <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      
      <h2 className="text-3xl font-bold text-slate-800 mb-2">تم إرسال إجاباتك بنجاح!</h2>
      <p className="text-slate-500 mb-8">شكراً لالتزامك بقوانين المنصة.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-right">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <p className="text-xs text-slate-400 font-bold mb-1">العلامة النهائية</p>
          <p className={`text-4xl font-black ${getStatusColor()}`}>{result.score.toFixed(1)} / 20</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <p className="text-xs text-slate-400 font-bold mb-1">الإجابات الصحيحة</p>
          <p className="text-4xl font-black text-slate-800">{result.totalCorrect}</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <p className="text-xs text-slate-400 font-bold mb-1">الوقت المستغرق</p>
          <p className="text-2xl font-bold text-slate-700">{Math.floor(result.timeTaken / 60)}د {result.timeTaken % 60}ث</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <p className="text-xs text-slate-400 font-bold mb-1">محاولات الخروج</p>
          <p className={`text-2xl font-bold ${result.violations > 0 ? 'text-orange-500' : 'text-green-600'}`}>
            {result.violations} مخالفات
          </p>
        </div>
      </div>

      <div className="bg-blue-900 text-white p-6 rounded-xl">
        <p className="mb-2 italic opacity-80">تم تسجيل النتيجة وتوثيق الجلسة.</p>
        <p className="font-bold text-lg">تحيات مقياس المادة – د. بعلي محمد</p>
      </div>

      <button 
        onClick={() => window.location.reload()}
        className="mt-8 text-blue-600 font-semibold hover:underline"
      >
        العودة للرئيسية
      </button>
    </div>
  );
};

export default ResultsPage;
