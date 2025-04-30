import cron from 'node-cron';
import { ClassSession } from '../models/classSession.model.js';
import markAbsentStudents from '../services/update.attendence.js';

// Cron job: runs every minute
cron.schedule('* * * * *', async () => {
  console.log(`[CRON] Job started at ${new Date().toLocaleString()}`);
  try {
    const now = new Date();
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
    const sessions = await ClassSession.find({
      status: 'draft',
      createdAt: { $lte: tenMinutesAgo },
    });

    if (sessions.length === 0) {
      console.log(`No sessions [CRON] Job found at ${new Date().toLocaleString()}`)
      return;
    }
    for (const session of sessions) {
      await markAbsentStudents(session._id);
    }
  } catch (error) {
    console.error('[CRON] Error running attendance cron job:', error);
  }
});
