import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import { sessionStore } from './utils/sessionStore.js';
import transcribeRouter from './routes/transcribe.js';
import analyzeRouter from './routes/analyze.js';

dotenv.config();

if (!fs.existsSync('temp_uploads')) {
  fs.mkdirSync('temp_uploads');
}

const app = express();
const httpServer = createServer(app);

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: '10mb' }));

// Register Backend Routes
app.use('/api/transcribe', transcribeRouter);
app.use('/api/analyze', analyzeRouter);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    system: 'VaaniDoc Engine v1.0',
    timestamp: new Date().toISOString(),
    activeSessions: sessionStore.getAllActiveSessions().length
  });
});

const io = new Server(httpServer, {
  cors: { origin: CLIENT_ORIGIN, methods: ['GET', 'POST'] }
});

io.on('connection', (socket) => {
  socket.on('join_doctor_channel', () => {
    socket.join('doctor_dashboard');
    socket.emit('active_sessions_list', sessionStore.getAllActiveSessions());
  });

  socket.on('init_session', ({ sessionId, language }) => {
    const session = sessionStore.createSession(sessionId, { language });
    socket.join(`session_${sessionId}`);
    io.to('doctor_dashboard').emit('session_updated', session);
  });

  socket.on('end_consultation', ({ sessionId }) => {
    const deleted = sessionStore.deleteSession(sessionId);
    if (deleted) {
      io.to(`session_${sessionId}`).emit('session_deleted', {
        sessionId,
        message: 'Consultation ended. Temporary patient data has been permanently deleted.'
      });
      io.to('doctor_dashboard').emit('session_removed', { sessionId });
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`  VaaniDoc Server running on :${PORT}`);
  console.log(`=================================`);
});