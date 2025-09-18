import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const token = cookies().get('auth_token')?.value;
  if (token) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
  return null;
}
