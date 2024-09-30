// // app/api/auth/password-reset/confirm/route.ts
// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { hash } from 'bcryptjs';

// export async function POST(req: Request) {
//   try {
//     const { token, password } = await req.json();

//     const client = await clientPromise;
//     const usersCollection = client.db().collection('users');

//     const user = await usersCollection.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: new Date() }, // Check if token is still valid
//     });

//     if (!user) {
//       return NextResponse.json({ message: 'Invalid or expired token.' }, { status: 400 });
//     }

//     // Hash the new password
//     const hashedPassword = await hash(password, 12);

//     // Update the user's password and remove reset token fields
//     await usersCollection.updateOne(
//       { _id: user._id },
//       {
//         $set: { password: hashedPassword },
//         $unset: { resetPasswordToken: '', resetPasswordExpires: '' },
//       }
//     );

//     return NextResponse.json({ message: 'Password has been reset successfully.' }, { status: 200 });
//   } catch (error) {
//     console.error('Error resetting password:', error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }
