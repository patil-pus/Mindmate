import { keyframes } from '@mui/system';

// Define the pulsing background animation
export const pulsingBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;