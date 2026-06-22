export class FirestorePermissionError extends Error {
  operation: string;
  path: string;
  requestResourceData?: any;

  constructor({ operation, path, requestResourceData }: { operation: string; path: string; requestResourceData?: any }) {
    super(`Permission denied: Could not ${operation} document at ${path}. Check Firestore rules.`);
    this.name = 'FirestorePermissionError';
    this.operation = operation;
    this.path = path;
    this.requestResourceData = requestResourceData;
  }
}

export class FirestoreUnavailableError extends Error {
  constructor() {
    super('Firestore is unavailable. Check your Firebase configuration.');
    this.name = 'FirestoreUnavailableError';
  }
}
