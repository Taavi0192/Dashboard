// // app/api/auth/password-reset/request/route.ts
// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';
// import crypto from 'crypto';
// import sendEmail from '@/lib/sendEmail';

// export async function POST(req: Request) {
//   try {
//     const { email } = await req.json();

//     const client = await clientPromise;
//     const usersCollection = client.db().collection('users');

//     const user = await usersCollection.findOne({ email });

//     if (!user) {
//       return NextResponse.json({ message: 'If that email is registered, a password reset link has been sent.' }, { status: 200 });
//     }

//     // Generate a secure token
//     const token = crypto.randomBytes(32).toString('hex');

//     // Set token expiration time (e.g., 1 hour from now)
//     const expiresAt = new Date(Date.now() + 3600 * 1000);

//     // Store the token and expiration time in the database
//     await usersCollection.updateOne(
//       { _id: user._id },
//       { $set: { resetPasswordToken: token, resetPasswordExpires: expiresAt } }
//     );

//     // Send the email with the reset link
//     const resetLink = `${process.env.NEXTAUTH_URL}/password-reset/${token}`;
//     await sendEmail({
//       to: email,
//       subject: 'Password Reset',
//       text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`,
//     });

//     return NextResponse.json({ message: 'If that email is registered, a password reset link has been sent.' }, { status: 200 });
//   } catch (error) {
//     console.error('Error in password reset request:', error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }
