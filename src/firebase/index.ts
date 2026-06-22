'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, getFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

export function initializeFirebase() {
  if (!getApps().length) {
    const firebaseApp = initializeApp(firebaseConfig);

    // Inicializar Firestore con caché persistente para robustez offline
    try {
      initializeFirestore(firebaseApp, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager()
        })
      });
    } catch (e) {
      // Si ya está inicializado o hay error, usar getFirestore por defecto
      console.warn('Firestore persistent cache init skipped:', e);
    }

    return getSdks(firebaseApp);
  }

  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
    storage: getStorage(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
