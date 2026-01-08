
import React from 'react';

interface Props {
  violations: number;
}

const ExclusionPage: React.FC<Props> = ({ violations }) => {
  return (
    <div className="p-12 text-center bg-red-50 min-h-[400px] flex flex-col items-center justify-center">
      <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      </div>
      <h2 className="text-4xl font-black text-red-900 mb-4">⛔ تم إقصاؤك نهائياً</h2>
      <p className="text-red-700 text-lg mb-8 max-w-md">
        لقد تم استبعادك من الامتحان بسبب خرق قوانين المنصة وتجاوز الحد المسموح للمخالفات (<span className="font-bold">{violations}</span> مخالفات).
      </p>
      
      <div className="p-4 border-2 border-red-200 rounded-lg text-red-800 font-bold bg-white/50">
        سيتم إرسال تقرير مفصل إلى د. بعلي محمد يتضمن تفاصيل محاولات الغش.
      </div>

      <p className="mt-8 text-slate-400 text-sm italic">نظام مراقبة ExamPro مفعّل</p>
    </div>
  );
};

export default ExclusionPage;
