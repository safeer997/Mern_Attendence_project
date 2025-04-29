import { Attendance } from '../models/attendence.model.js';

export const getSessionAttendance = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const attendanceRecords = await Attendance.find({
      classSession: sessionId,
    }).populate('student', 'name phoneNumber email'); 

    if (attendanceRecords.length === 0) {
      return res.status(404).json({
        success: true,
        message: 'No attendance records found for this session',  //be careful with this in frontend !!!!
      });
    }

    
    const online = [];
    const offline = [];
    const absent = [];

    for (const record of attendanceRecords) {
      const { status, student } = record;
      if (!student?.name) continue; 
      if (status === 'online') online.push(student.name);
      else if (status === 'offline') offline.push(student.name);
      else absent.push(student.name);
    }

    return res.status(200).json({
      success: true,
      message: 'Attendance data fetched successfully',
      data: {
        online,
        offline,
        absent,
        summary: {
          onlineCount: online.length,
          offlineCount: offline.length,
          absentCount: absent.length,
          total: attendanceRecords.length,
        },
      },
    });
  } catch (error) {
    console.error('Error getting session attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};
