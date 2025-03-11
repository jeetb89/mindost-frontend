class AudioProcessor extends AudioWorkletProcessor {
  private bufferSize: number = 2048;
  private buffer: Float32Array;
  private bufferIndex: number = 0;
  private isRecording: boolean = false;
  private silenceThreshold: number = 0.01;
  private silenceCounter: number = 0;
  private maxSilenceFrames: number = 100;

  constructor() {
    super();
    this.buffer = new Float32Array(this.bufferSize);
    this.port.onmessage = this.handleMessage.bind(this);
  }

  handleMessage(event: MessageEvent) {
    const { type, data } = event.data;
    
    switch (type) {
      case 'start':
        this.isRecording = true;
        this.bufferIndex = 0;
        break;
      case 'stop':
        this.isRecording = false;
        this.processBuffer();
        break;
      case 'setSilenceThreshold':
        this.silenceThreshold = data.threshold;
        break;
    }
  }

  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean {
    const input = inputs[0];
    if (!input || !input[0]) return true;

    const inputChannel = input[0];

    for (let i = 0; i < inputChannel.length; i++) {
      if (this.isRecording) {
        this.buffer[this.bufferIndex] = inputChannel[i];
        this.bufferIndex++;

        // Check for silence
        if (Math.abs(inputChannel[i]) < this.silenceThreshold) {
          this.silenceCounter++;
        } else {
          this.silenceCounter = 0;
        }

        // If buffer is full, process it
        if (this.bufferIndex >= this.bufferSize) {
          this.processBuffer();
          this.bufferIndex = 0;
        }

        // If silence detected for too long, stop recording
        if (this.silenceCounter >= this.maxSilenceFrames) {
          this.isRecording = false;
          this.port.postMessage({ type: 'silenceDetected' });
        }
      }
    }

    return true;
  }

  private processBuffer() {
    // Calculate audio features
    const features = this.calculateFeatures();
    
    // Send processed data to main thread
    this.port.postMessage({
      type: 'audioData',
      data: {
        buffer: this.buffer.slice(0, this.bufferIndex),
        features
      }
    });
  }

  private calculateFeatures() {
    let sum = 0;
    let sumSquared = 0;
    let maxAmplitude = 0;
    let zeroCrossings = 0;

    for (let i = 0; i < this.bufferIndex; i++) {
      const sample = this.buffer[i];
      sum += sample;
      sumSquared += sample * sample;
      maxAmplitude = Math.max(maxAmplitude, Math.abs(sample));
      
      if (i > 0 && (this.buffer[i - 1] * sample) < 0) {
        zeroCrossings++;
      }
    }

    const mean = sum / this.bufferIndex;
    const rms = Math.sqrt(sumSquared / this.bufferIndex);
    const zeroCrossingRate = zeroCrossings / this.bufferIndex;

    return {
      mean,
      rms,
      maxAmplitude,
      zeroCrossingRate
    };
  }
}

registerProcessor('audio-processor', AudioProcessor); 