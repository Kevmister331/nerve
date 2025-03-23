import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Returns [{ label: string, frames: number, confidence: number }]
export async function detectDangerSound(filePath) {
  if (!filePath) {
    throw new Error('filePath is undefined or null.');
  }

  const scriptPath = resolve(__dirname, 'detect_danger_sound.py');
  console.log('Running Python script at:', scriptPath);
  console.log('Passing audio file path:', filePath);

  return new Promise((resolve, reject) => {
    const process = spawn('python3', [scriptPath, filePath]);

    let stdoutData = '';
    let stderrData = '';

    process.stdout.on('data', (data) => {
      const str = data.toString();
      stdoutData += str;
      console.log('PYTHON stdout:', str);
    });

    process.stderr.on('data', (data) => {
      const str = data.toString();
      stderrData += str;
      console.error('PYTHON stderr:', str);
    });

    process.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);

      if (stderrData) {
        reject(new Error('Python stderr:\n' + stderrData));
        return;
      }

      const parsed = stdoutData
        .split('\n')
        .map((line) => line.trim())
        .filter((line) =>
          /^[1-3]\.\s.+\s—\s\d+ frames, max confidence: [\d.]+$/.test(line)
        )
        .map((line) => {
          const match = line.match(
            /^\d+\.\s(.+?)\s—\s(\d+)\sframes, max confidence: ([\d.]+)$/
          );
          if (!match) return null;

          const [, label, frames, confidence] = match;
          return {
            label,
            frames: parseInt(frames),
            confidence: parseFloat(confidence),
          };
        })
        .filter(Boolean);

      resolve(parsed);
    });

    process.on('error', (err) => {
      console.error('Python spawn error:', err);
      reject(err);
    });
  });
}
