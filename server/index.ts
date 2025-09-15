import { exec } from 'child_process';

// Start Next.js development server
const nextProcess = exec('npx next dev -p 5000', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting Next.js: ${error}`);
    return;
  }
  console.log(stdout);
});

// Forward output from Next.js process
nextProcess.stdout?.on('data', (data) => {
  console.log(data.toString());
});

nextProcess.stderr?.on('data', (data) => {
  console.error(data.toString());
});

// Handle process termination
nextProcess.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
});

// Keep the process alive
process.on('SIGINT', () => {
  console.log('Received SIGINT, terminating Next.js process...');
  nextProcess.kill('SIGTERM');
  process.exit(0);
});