// // app/password-reset/page.tsx
// 'use client';

// import { useState } from 'react';

// export default function PasswordResetRequestPage() {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handlePasswordResetRequest = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('/api/auth/password-reset/request', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       setMessage(data.message || 'If that email is registered, a password reset link has been sent.');
//     } catch (error) {
//       console.error('Error requesting password reset:', error);
//       setMessage('Error requesting password reset.');
//     }
//   };

//   return (
//     <div>
//       <h1>Request Password Reset</h1>
//       <form onSubmit={handlePasswordResetRequest}>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <button type="submit">Request Password Reset</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }
