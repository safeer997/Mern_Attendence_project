import { ClassSession } from '../models/classSession.model.js';
import { Instructor } from '../models/instructor.model.js';
import markAbsentStudents from '../services/update.attendence.js';

const createSession = async (req, res) => {
  const { topic, sessionDate, onlineStudents = [] } = req.body;
  try {
    if (!topic || !sessionDate) {
      return res.status(400).json({
        success: false,
        message: 'topic , instructor id ,session date is required !',
      });
    }

    // Validating topic
    if (typeof topic !== 'string' || topic.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Topic must be a non-empty string.',
      });
    }

    const instructorId = req.user.id;

    if (!instructorId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Instructor ID missing.',
      });
    }

    // Validating instructor ID
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return res.status(400).json({
        success: false,
        message: 'Invalid instructorId.',
      });
    }

    // Validating date
    const date = new Date(sessionDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid sessionDate format.',
      });
    }

    // Creating session (without attendance link first)
    const session = await ClassSession.create({
      topic,
      instructor: instructorId,
      sessionDate: sessionDate,
      onlineStudents,
      status: 'draft',
    });

    await session.save();

    // Fetching the created session with instructor details
    const createdSession = await ClassSession.findById(session._id).populate(
      'instructor'
    );

    if (!createdSession) {
      return res.status(500).json({
        success: false,
        message: 'Error creating session in database',
      });
    }

    // // Run automated attendance marking function
    // setTimeout(() => {
    //   markAbsentStudents(session._id);
    // }, 30000);

    //--------------------------------------------------------

    return res.status(201).json({
      success: true,
      message: 'Class session successfully created',
      data: createdSession,
    });
  } catch (error) {
    console.log('Error :', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const getSessionOfInstructer = async (req, res) => {
  try {
    const instructorId = req.user.id;

    if (!instructorId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Instructor ID missing.',
      });
    }

    const sessions = await ClassSession.find({ instructor: instructorId });

    if (sessions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No sessions found for this instructor.',
      });
    }

    await Promise.all(sessions.map((s) => s.refreshAttendanceLists()));

    return res.status(200).json({
      success: true,
      message: 'Instructor sessions fetched successfully',
      data: sessions,
    });
  } catch (error) {
    console.log('Error :', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

// GET ALL SESSIONS
const getAllSessions = async (req, res) => {
  try {
    const sessions = await ClassSession.find().populate('instructor');
    if (sessions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No session record exists',
      });
    }

    await Promise.all(sessions.map((s) => s.refreshAttendanceLists()));

    return res.status(201).json({
      success: true,
      message: 'Class sessions data fetched successfully',
      data: sessions,
    });
  } catch (error) {
    console.log('Error :', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

// GET AN INDIVIDUAL SESSION
const getSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await ClassSession.findById(sessionId).populate(
      'instructor'
    );
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found',
      });
    }

    await session.refreshAttendanceLists();

    return res.status(201).json({
      success: true,
      message: 'Session data fetched successfully',
      data: session,
    });
  } catch (error) {
    console.log('Error :', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

// GET SESSIONS OF A PARTICULAR INSTRUCTOR

export { createSession, getSession, getAllSessions, getSessionOfInstructer };
