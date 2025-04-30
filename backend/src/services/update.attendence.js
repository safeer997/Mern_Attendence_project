import { Attendance } from '../models/attendence.model.js';
import { Student } from '../models/student.model.js';
import { ClassSession } from '../models/classSession.model.js';

const markAbsentStudents = async (sessionId) => {
  try {
    const allStudents = await Student.find({});
    if (allStudents.length === 0) {
      console.log('No students in DB - nothing to mark absent.');
      return;
    }

    for (const student of allStudents) {
      const record = await Attendance.findOne({
        student: student._id,
        classSession: sessionId,
      });
      if (!record) {
        await Attendance.create({
          student: student._id,
          classSession: sessionId,
          status: 'absent',
        });
        absentCount++;
      }
    }

    // 2) Finalize the session and refresh the three lists
    const session = await ClassSession.findById(sessionId);
    if (session) {
      session.status = 'finalized';
      await session.refreshAttendanceLists();
      // console.log(`Session ${sessionId} finalized & lists refreshed.`);
    }
  } catch (error) {
    console.error(`Error in markAbsentStudents(${sessionId}):`, error);
  }
};

export default markAbsentStudents;
