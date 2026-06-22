type ErrorEventType = 'permission-error';
type ErrorListener = (error: Error) => void;

class ErrorEmitter {
  private listeners: Map<ErrorEventType, Set<ErrorListener>> = new Map();

  on(event: ErrorEventType, listener: ErrorListener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
    return () => this.listeners.get(event)?.delete(listener);
  }

  off(event: ErrorEventType, listener: ErrorListener): void {
    this.listeners.get(event)?.delete(listener);
  }

  emit(event: ErrorEventType, error: Error): void {
    this.listeners.get(event)?.forEach(listener => {
      try {
        listener(error);
      } catch (e) {
        console.error('Error in error listener:', e);
      }
    });
  }
}

export const errorEmitter = new ErrorEmitter();
