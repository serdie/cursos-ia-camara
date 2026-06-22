'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import type { FirebaseStorage } from 'firebase/storage';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    return initializeFirebase();
  }, []);

  return (
    <FirebaseProvider
      firebaseApp={(firebaseServices?.firebaseApp as FirebaseApp) ?? null}
      auth={(firebaseServices?.auth as Auth) ?? null}
      firestore={(firebaseServices?.firestore as Firestore) ?? null}
      storage={(firebaseServices?.storage as FirebaseStorage) ?? null}
    >
      {children}
    </FirebaseProvider>
  );
}
