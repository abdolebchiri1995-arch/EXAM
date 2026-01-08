
import React, { useState } from 'react';
import { Student } from '../types';
import { BAC_YEARS, EXAM_START_TIME } from '../constants';

interface Props {
  onLogin: (data: Student) => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bacYear, setBacYear] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !bacYear) {
      alert('يرجى ملء جميع الحقول');
      return;
    }
    onLogin({ firstName, lastName, bacYear, deviceId: navigator.userAgent });
  };

  const getTimeRemaining = () => {
    const now = Date.now();
    const diff = EXAM_START_TIME - now;
    if (diff <= 0) return "حان موعد الامتحان";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours} ساعة و ${minutes} دقيقة و ${seconds} ثانية`;
  };

  const [timerStr, setTimerStr] = useState(getTimeRemaining());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimerStr(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">منصة الامتحانات الإلكترونية</h1>
        <p className="text-slate-500">يرجى تسجيل الدخول قبل الساعة 14:00</p>
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg inline-block border border-blue-100">
          <span className="font-bold">الوقت المتبقي: </span>
          {timerStr}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">الاسم (بالعربية)</label>
          <input 
            type="text" 
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="مثال: محمد"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">اللقب (بالعربية)</label>
          <input 
            type="text" 
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="مثال: بعلي"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">سنة البكالوريا</label>
          <select 
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={bacYear}
            onChange={(e) => setBacYear(e.target.value)}
            required
          >
            <option value="">اختر السنة</option>
            {BAC_YEARS.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit"
          className="w-full bg-blue-900 text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition duration-200"
        >
          دخول إلى منصة التعليمات
        </button>
      </form>

      <div className="mt-8 border-t pt-6 text-center text-red-600 text-xs font-bold uppercase tracking-widest">
        ⚠️ نظام مراقبة صارم مفعل ⚠️
      </div>
    </div>
  );
};

export default LoginPage;
