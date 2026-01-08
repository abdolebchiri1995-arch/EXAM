
import React from 'react';
import { Student } from '../types';

interface Props {
  student: Student;
  onStart: () => void;
}

const InstructionsPage: React.FC<Props> = ({ student, onStart }) => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">أهلاً بك، {student.firstName} {student.lastName}</h2>
        <p className="text-slate-600">يرجى قراءة الملاحظات التالية بعناية قبل بدء الامتحان:</p>
      </div>

      <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-red-500 text-xl font-bold">❗</span>
          <p className="text-sm">الخروج من المنصة أو فقدان التركيز (Tab Switching) يُعتبر حالة غش.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-red-500 text-xl font-bold">❗</span>
          <p className="text-sm">الخروج أكثر من <span className="font-bold">5 مرات</span> يؤدي إلى الإقصاء النهائي والتلقائي.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl font-bold">⏱</span>
          <p className="text-sm">مدة كل سؤال <span className="font-bold">دقيقة واحدة</span> (ينتقل النظام للسؤال التالي تلقائياً).</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl font-bold">⏱</span>
          <p className="text-sm">المدة الإجمالية للإجابة: <span className="font-bold">30 دقيقة</span>.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-slate-600 text-xl font-bold">🚫</span>
          <p className="text-sm">لا يمكن فتح المنصة على أكثر من جهاز في وقت واحد.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-600 text-xl font-bold">📊</span>
          <p className="text-sm">كل إجابة صحيحة تمنحك <span className="font-bold">1.5 نقطة</span> (العلامة النهائية من 20).</p>
        </div>
      </div>

      <button 
        onClick={onStart}
        className="w-full bg-blue-900 text-white font-bold py-5 rounded-lg hover:bg-blue-800 shadow-lg shadow-blue-900/20 transform active:scale-95 transition-all text-xl"
      >
        أوافق وأبدأ الامتحان
      </button>
    </div>
  );
};

export default InstructionsPage;
