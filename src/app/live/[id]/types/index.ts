export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  showConfetti: boolean;
  isRemoving?: boolean;
  confettiKey?: number;
}

export interface PaperPlane {
  id: string;
  message: string;
  isExploding: boolean;
} 