import React, { useState, useRef } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { ConfirmationResult } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const {
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    sendPhoneOtp,
    verifyPhoneOtp,
  } = useAuth();

  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [isRegister, setIsRegister] = useState(false);

  // Email fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Phone fields
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const recaptchaContainerRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const resetPhoneState = () => {
    setOtpSent(false);
    setConfirmationResult(null);
    setOtpCode('');
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  // Format Bangladesh phone numbers: 017xxxxxxxx or +88017xxxxxxxx
  const formatPhoneNumber = (raw: string) => {
    let clean = raw.trim().replace(/[\s-]/g, '');
    if (clean.startsWith('01')) {
      clean = '+880' + clean.slice(1);
    } else if (clean.startsWith('8801')) {
      clean = '+' + clean;
    } else if (!clean.startsWith('+')) {
      clean = '+88' + clean;
    }
    return clean;
  };

  // Handle Sending Phone OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const formatted = formatPhoneNumber(phoneNumber);
    if (formatted.length < 13) {
      setErrorMsg('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)');
      return;
    }

    setLoading(true);
    try {
      if (!recaptchaContainerRef.current) {
        throw new Error('reCAPTCHA container missing');
      }
      const confirmation = await sendPhoneOtp(formatted, recaptchaContainerRef.current);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setSuccessMsg(`৬ ডিজিটের ভেরিফিকেশন কোডটি ${phoneNumber}-এ পাঠানো হয়েছে`);
    } catch (err: any) {
      console.error('Phone OTP error:', err);
      let msg = 'মোবাইলে ওটিপি কোড পাঠাতে সমস্যা হয়েছে।';
      if (err.code === 'auth/invalid-phone-number') {
        msg = 'ভুল ফোন নম্বর দেওয়া হয়েছে। সঠিক ১১ ডিজিটের নম্বর দিন।';
      } else if (err.code === 'auth/quota-exceeded' || err.code === 'auth/too-many-requests') {
        msg = 'অতিরিক্ত বার চেষ্টা করা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন অথবা ইমেইল দিয়ে লগইন করুন।';
      } else if (err.code === 'auth/captcha-check-failed') {
        msg = 'ক্যাপচা ভেরিফিকেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।';
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  // Handle Verifying OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) return;
    if (!otpCode.trim() || otpCode.trim().length < 6) {
      setErrorMsg('৬ ডিজিটের ওটিপি কোডটি লিখুন');
      return;
    }

    setErrorMsg(null);
    setLoading(true);
    try {
      await verifyPhoneOtp(confirmationResult, otpCode.trim(), name.trim() || undefined);
      onClose();
    } catch (err: any) {
      console.error('Verify OTP error:', err);
      let msg = 'ভুল কোড দেওয়া হয়েছে। কোডটি পুনরায় চেক করুন।';
      if (err.code === 'auth/invalid-verification-code') {
        msg = 'ভুল ওটিপি কোড। অনুগ্রহ করে সঠিক কোড দিন।';
      } else if (err.code === 'auth/code-expired') {
        msg = 'কোডটির মেয়াদ শেষ হয়েছে। আবার নতুন কোড পাঠান।';
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  // Handle Email submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (isRegister) {
        if (!name.trim()) {
          setErrorMsg('অনুগ্রহ করে আপনার নাম দিন');
          setLoading(false);
          return;
        }
        await registerWithEmail(email.trim(), password, name.trim());
      } else {
        await loginWithEmail(email.trim(), password);
      }
      onClose();
    } catch (err: any) {
      console.error('Auth error:', err);
      let message = 'লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        message = 'ভুল ইমেইল বা পাসওয়ার্ড দেওয়া হয়েছে।';
      } else if (err.code === 'auth/email-already-in-use') {
        message = 'এই ইমেইলে ইতিমধ্যে অ্যাকাউন্ট রয়েছে। লগইন করুন।';
      } else if (err.code === 'auth/weak-password') {
        message = 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।';
      }
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      console.error('Google Sign In error:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setErrorMsg('গুগল লগইনে সমস্যা হয়েছে। অনুগ্রহ করে মোবাইল নম্বর বা ইমেইল দিয়ে লগইন করুন।');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#e8ece3] flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Invisible Recaptcha Container for Phone OTP */}
        <div ref={recaptchaContainerRef} id="recaptcha-container" />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-[#2e7d32] uppercase tracking-wider">
              Healify Naturals
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#1b4332]">
              {authMethod === 'phone'
                ? otpSent
                  ? 'ওটিপি কোড যাচাই করুন'
                  : 'মোবাইল নম্বর দিয়ে লগইন'
                : isRegister
                ? 'নতুন একাউন্ট তৈরি করুন'
                : 'ইমেইল দিয়ে লগইন করুন'}
            </h2>
            <p className="text-xs text-[#405342]">
              {authMethod === 'phone'
                ? 'আপনার ১১ ডিজিটের বাংলাদেশি নম্বর লিখুন'
                : isRegister
                ? 'অর্ডার ট্র্যাকিং ও দ্রুত চেকআউটের জন্য অ্যাকাউন্ট খুলুন'
                : 'আপনার অ্যাকাউন্ট ও অর্ডারের তথ্য দেখতে লগইন করুন'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f4f7f2] hover:bg-[#e8ece3] text-[#405342] flex items-center justify-center cursor-pointer transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Guest WhatsApp order notice: reassurance that login is not mandatory */}
        <div className="p-3 bg-[#f4f7f2] rounded-2xl border border-[#e2e8dc] text-xs text-[#2d4030] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#25d366] text-[18px]">verified</span>
            <span className="text-[11px] leading-snug">
              লগইন ছাড়াও সরাসরি <strong>WhatsApp-এ অর্ডার</strong> করতে পারবেন।
            </span>
          </div>
        </div>

        {/* Auth Method Tabs: Phone (Default & Popular) vs Email */}
        <div className="grid grid-cols-2 p-1 bg-[#f4f7f2] rounded-2xl border border-[#e8ece3] text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setAuthMethod('phone');
              setErrorMsg(null);
            }}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMethod === 'phone'
                ? 'bg-white text-[#1b4332] shadow-xs'
                : 'text-[#586b5a] hover:text-[#1b4332]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span>মোবাইল নম্বর (Phone)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMethod('email');
              setErrorMsg(null);
            }}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMethod === 'email'
                ? 'bg-white text-[#1b4332] shadow-xs'
                : 'text-[#586b5a] hover:text-[#1b4332]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">mail</span>
            <span>ইমেইল (Email)</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-[#ffebee] border border-[#ffcdd2] rounded-xl text-xs text-[#c62828] flex items-start gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3 bg-[#e8f5e9] border border-[#c8e6c9] rounded-xl text-xs text-[#2e7d32] flex items-start gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">check_circle</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* PHONE AUTHENTICATION VIEW */}
        {authMethod === 'phone' && (
          <div className="flex flex-col gap-4">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="flex flex-col gap-3.5 text-xs">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-[#1b4332]">
                    আপনার নাম (ঐচ্ছিক / Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: মোঃ সাইফুল ইসলাম"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#fbfbfa] border border-[#e8ece3] text-[#1b4332] focus:outline-[#2e7d32]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-[#1b4332]">
                    মোবাইল নম্বর (Phone Number) <span className="text-[#c62828]">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 font-bold text-[#405342] text-xs">
                      🇧🇩 +880
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="17xxxxxxxx"
                      value={phoneNumber.replace(/^\+880|^0/, '')}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/[^0-9]/g, '');
                        setPhoneNumber('0' + digits);
                      }}
                      className="w-full p-2.5 pl-18 rounded-xl bg-[#fbfbfa] border border-[#e8ece3] text-[#1b4332] font-semibold tracking-wider focus:outline-[#2e7d32]"
                    />
                  </div>
                  <p className="text-[11px] text-[#708272]">
                    আমরা আপনার নম্বরে এসএমএস এর মাধ্যমে ওটিপি কোড পাঠাব।
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-98 disabled:opacity-50 text-xs sm:text-sm"
                >
                  {loading ? (
                    <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                  ) : (
                    <span className="material-symbols-outlined text-[18px]">sms</span>
                  )}
                  <span>ওটিপি কোড পাঠান (Send OTP)</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-3.5 text-xs">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-[#1b4332]">
                    এসএমএস কোড লিখুন (Enter 6-digit Code)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full p-3 rounded-xl bg-[#fbfbfa] border-2 border-[#2e7d32] text-[#1b4332] text-center font-mono font-bold tracking-widest text-lg focus:outline-hidden"
                  />
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#708272]">নম্বর: {phoneNumber}</span>
                    <button
                      type="button"
                      onClick={resetPhoneState}
                      className="text-[11px] text-[#2e7d32] font-semibold hover:underline cursor-pointer"
                    >
                      নম্বর পরিবর্তন করুন
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-1 bg-[#2e7d32] hover:bg-[#1b5e20] text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-98 disabled:opacity-50 text-xs sm:text-sm"
                >
                  {loading ? (
                    <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                  ) : (
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  )}
                  <span>কোড যাচাই করে লগইন করুন</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* EMAIL AUTHENTICATION VIEW */}
        {authMethod === 'email' && (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3.5 text-xs">
            {isRegister && (
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-[#1b4332]">আপনার পুরো নাম</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ সাইফুল ইসলাম"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#fbfbfa] border border-[#e8ece3] text-[#1b4332] focus:outline-[#2e7d32]"
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b4332]">ইমেইল এড্রেস</label>
              <input
                type="email"
                required
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#fbfbfa] border border-[#e8ece3] text-[#1b4332] focus:outline-[#2e7d32]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#1b4332]">পাসওয়ার্ড</label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="কমপক্ষে ৬ ডিজিটের পাসওয়ার্ড"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#fbfbfa] border border-[#e8ece3] text-[#1b4332] focus:outline-[#2e7d32]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-98 disabled:opacity-50 text-xs sm:text-sm"
            >
              {loading ? (
                <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
              ) : (
                <span className="material-symbols-outlined text-[18px]">
                  {isRegister ? 'person_add' : 'login'}
                </span>
              )}
              <span>{isRegister ? 'সাইন আপ সম্পন্ন করুন' : 'লগইন করুন'}</span>
            </button>
          </form>
        )}

        {/* Separator */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#e8ece3]" />
          <span className="text-[11px] text-[#708272] uppercase font-semibold">অথবা দ্রুত লগইন</span>
          <div className="flex-1 h-px bg-[#e8ece3]" />
        </div>

        {/* Google Quick Login */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl border border-[#e8ece3] hover:bg-[#fbfbfa] flex items-center justify-center gap-3 text-xs font-bold text-[#1b4332] cursor-pointer transition-all active:scale-98 disabled:opacity-50 shadow-xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Footer Toggle Switch (Only for email tab) */}
        {authMethod === 'email' && (
          <div className="text-center pt-2 border-t border-[#e8ece3] text-xs text-[#405342]">
            {isRegister ? (
              <p>
                ইতিমধ্যে একাউন্ট আছে?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false);
                    setErrorMsg(null);
                  }}
                  className="font-bold text-[#2e7d32] hover:underline cursor-pointer"
                >
                  লগইন করুন
                </button>
              </p>
            ) : (
              <p>
                নতুন একাউন্ট খুলতে চান?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(true);
                    setErrorMsg(null);
                  }}
                  className="font-bold text-[#2e7d32] hover:underline cursor-pointer"
                >
                  রেজিস্টার করুন
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
