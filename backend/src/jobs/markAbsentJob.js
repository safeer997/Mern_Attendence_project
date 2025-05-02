import cron from 'node-cron';
import { ClassSession } from '../models/classSession.model.js';
import markAbsentStudents from '../services/update.attendence.js';


cron.schedule('* * * * *', async () => {
  console.log(`[CRON] Job started at ${new Date().toLocaleString()}`);
  try {
    const now = new Date();
    const onHourAgo = new Date(now.getTime() - 59 * 60 * 1000);
    const sessions = await ClassSession.find({
      status: 'draft',
      createdAt: { $lt: onHourAgo },
    });

    if (sessions.length === 0) {
      // console.log(
      //   `No sessions [CRON] Job found at ${new Date().toLocaleString()}`
      // );
      return;
    }
    for (const session of sessions) {
      await markAbsentStudents(session._id);
    }
  } catch (error) {
    console.error('[CRON] Error running attendance cron job:', error);
  }
});
