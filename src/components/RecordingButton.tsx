import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecordingButtonProps {
  onTranscript: (transcript: string) => void;
  disabled?: boolean;
}

export const RecordingButton = ({ onTranscript, disabled }: RecordingButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsProcessing(true);
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        
        // Simulate transcription (replace with actual API call)
        setTimeout(() => {
          const mockTranscript = "This is a sample transcription of the recorded audio. In a real implementation, this would be the actual transcribed text from the speech-to-text API.";
          onTranscript(mockTranscript);
          setIsProcessing(false);
        }, 2000);

        // Clean up
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        onClick={handleClick}
        disabled={disabled || isProcessing}
        size="lg"
        variant={isRecording ? "destructive" : "default"}
        className={cn(
          "h-20 w-20 rounded-full transition-all duration-300",
          isRecording && "animate-pulse-recording shadow-glow",
          isProcessing && "opacity-50 cursor-not-allowed"
        )}
      >
        {isProcessing ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current" />
        ) : isRecording ? (
          <Square className="h-8 w-8" />
        ) : (
          <Mic className="h-8 w-8" />
        )}
      </Button>
      
      <p className="text-sm text-muted-foreground text-center">
        {isProcessing
          ? "Processing audio..."
          : isRecording
          ? "Recording... Click to stop"
          : "Click to start recording"
        }
      </p>
    </div>
  );
};