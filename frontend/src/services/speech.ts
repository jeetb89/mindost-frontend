import { openai } from './openai';

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    // Convert Blob to File with proper name and type
    const audioFile = new File([audioBlob], 'audio.webm', { type: 'audio/webm' });
    
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('type', 'transcribe');

    const response = await fetch('/api/speech', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to transcribe audio');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
}

export async function synthesizeSpeech(text: string, voice: string = 'alloy'): Promise<void> {
  try {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('type', 'synthesize');
    formData.append('voice', voice);

    const response = await fetch('/api/speech', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to synthesize speech');
    }

    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    
    return new Promise((resolve, reject) => {
      audio.onended = () => {
        URL.revokeObjectURL(url);
        resolve();
      };
      audio.onerror = reject;
      audio.play();
    });
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    throw error;
  }
}

// MediaRecorder setup and handling
let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];

export async function startRecording(
  onTranscriptionComplete: (text: string) => void,
  onError: (error: string) => void
) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm'
    });
    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      try {
        const text = await transcribeAudio(audioBlob);
        onTranscriptionComplete(text);
      } catch (error) {
        console.error('Error transcribing audio:', error);
        onError('Error transcribing audio');
      } finally {
        // Clean up
        stream.getTracks().forEach(track => track.stop());
      }
    };

    mediaRecorder.start();
  } catch (error) {
    onError('Error accessing microphone');
    console.error('Error starting recording:', error);
  }
}

export function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
} 