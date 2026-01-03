import { useState, useRef } from 'react';
import styles from './RegisterLoginPage.module.scss';
import { IoIosArrowBack } from "react-icons/io";
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function RegisterLoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [showOtp, setShowOtp] = useState(false);

 const otpRefs = useRef<HTMLInputElement[]>([]);

  const navigate = useNavigate();
  const { login, loading } = useAuthStore();

  const handleSendCode = async () => {
    if (phone.length !== 10) return alert('Invalid number');
    const success = await login({ phone });
    if (success) {
      setShowOtp(true);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) return alert('Please enter valid OTP');
    const success = await login({ phone, otp: enteredOtp });
    if (success) navigate('/home');
  };

  return (
    <div className={styles.forgot}>
      {showOtp && (
        <div className={styles.back_btn} onClick={() => setShowOtp(false)}>
          <IoIosArrowBack />
        </div>
      )}

      <div className={styles.content}>
        <h1>{showOtp ? 'OTP Verification' : 'Enter Your Mobile Number'}</h1>
        <p>{!showOtp ? "We will send you the 6 digits verification code" : 'Enter the verification code we just sent on your Mobile Number.'}</p> 
        {!showOtp ? (
          <>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              maxLength={10}
            />
            <button onClick={handleSendCode} disabled={loading}>
              {loading ? 'Sending...' : 'Send Code'}
            </button>
          </>
        ) : (
          <>
            <div className={styles.otp_boxes}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    if (el) {
                      otpRefs.current[i] = el;
                    }
                  }}
                  maxLength={1}
                  value={digit}
                  inputMode="numeric"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (!value) return;

                    const arr = [...otp];
                    arr[i] = value;
                    setOtp(arr);

                    if (i < 5) otpRefs.current[i + 1]?.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      const arr = [...otp];
                      if (otp[i]) {
                        arr[i] = '';
                        setOtp(arr);
                      } else if (i > 0) {
                        otpRefs.current[i - 1]?.focus();
                        arr[i - 1] = '';
                        setOtp(arr);
                      }
                    }
                  }}
                />

              ))}
            </div>

            <button onClick={handleVerifyOtp} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
              </button>
              <p className={styles.resend}>
                Didn’t receive code? <span onClick={handleSendCode}>Resend</span>
              </p>
          </>
        )}
      </div>
    </div>
  );
}
