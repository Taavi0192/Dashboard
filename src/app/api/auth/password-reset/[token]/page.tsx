// // app/password-reset/[token]/page.tsx
// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function PasswordResetPage({ params }: { params: { token: string } }) {
//   const { token } = params;
//   const router = useRouter();
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handlePasswordReset = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setMessage('Passwords do not match.');
//       return;
//     }

//     try {
//       const res = await fetch('/api/auth/password-reset/confirm', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage('Password has been reset successfully.');
//         router.push('/signin');
//       } else {
//         setMessage(data.message || 'Error resetting password.');
//       }
//     } catch (error) {
//       console.error('Error resetting password:', error);
//       setMessage('Error resetting password.');
//     }
//   };

//   return (
//     <div>
//       <h1>Reset Your Password</h1>
//       <form onSubmit={handlePasswordReset}>
//         <div>
//           <label>New Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
//         </div>
//         <div>
//           <label>Confirm New Password:</label>
//           <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} />
//         </div>
//         <button type="submit">Reset Password</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }
