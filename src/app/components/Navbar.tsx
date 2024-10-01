'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link href="/" style={styles.brand}>
          MyApp
        </Link>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link href="/" style={styles.navLink}>
              Home
            </Link>
          </li>
          {session ? (
            <>
              <li style={styles.navItem}>
                <Link href="/dashboard" style={styles.navLink}>
                  Dashboard
                </Link>
              </li>
              <li style={styles.navItem}>
                <button onClick={() => signOut()} style={styles.navButton}>
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li style={styles.navItem}>
                <Link href="/signin" style={styles.navLink}>
                  Sign In
                </Link>
              </li>
              <li style={styles.navItem}>
                <Link href="/signup" style={styles.navLink}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#0070f3',
    padding: '1rem 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  brand: {
    color: '#fff',
    fontSize: '1.5rem',
    textDecoration: 'none',
    fontWeight: 'bold' as const,
  },
  navList: {
    display: 'flex',
    listStyleType: 'none' as const,
    margin: 0,
    padding: 0,
    gap: '1rem',
  },
  navItem: {},
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  navButton: {
    backgroundColor: 'transparent',
    border: '1px solid #fff',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};
