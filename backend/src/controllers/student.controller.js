import { ClassSession } from '../models/classSession.model.js';
import { Student } from '../models/student.model.js';

const registerStudent = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  //validating input
  try {
    if (
      [name, email, password, phoneNumber].some((field) => field?.trim() === '')
    ) {
      return res.status(400).json({
        success: false,
        message: 'all details are required',
      });
    }

    //checking if student already exists !!

    const existedStudent = await Student.findOne({
      $or: [{ phoneNumber }, { email }],
    });

    if (existedStudent) {
      return res.status(400).json({
        success: false,
        message: 'user already exists with provided phone number and email',
      });
    }

    const student = await Student.create({
      name,
      password,
      phoneNumber,
      email,
    });

    //checking if student is created !!

    const createdStudent = await Student.findById(student._id).select(
      '-password'
    );

    if (!createdStudent) {
      return res.status(500).json({
        success: false,
        message: 'error creating student in database',
      });
    }

    //sigingn token so that first time users can stay logged in!!

    const token = jwt.sign(
      {
        id: createdStudent._id,
        role: 'student',
        phoneNumber: createdStudent.phoneNumber,
        email: createdStudent.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: 'student successfully registered',
      data: createdStudent,
    });
  } catch (error) {
    console.log('Error :', error);
    res.status(500).json({
      success: false,
      message: 'something went wrong',
    });
  }
};

//GET ALL STUDENTS

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    if (students.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'no students record exist',
      });
    }

    return res.status(201).json({
      success: true,
      message: 'students data fetched successfully',
      data: students,
    });
  } catch (error) {
    console.log('Error :', error);
    res.status(500).json({
      success: false,
      message: 'something went wrong',
    });
  }
};

// GET A SINGLE STUDENT

const getStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId).select('-password');
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    return res.status(201).json({
      success: true,
      message: 'student data fetched successfully',
      data: student,
    });
  } catch (error) {
    console.log('Error :', error);
    res.status(500).json({
      success: false,
      message: 'something went wrong',
    });
  }
};

//function to get recent created sessions

const getTodaySessions = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const sessions = await ClassSession.find({
      sessionDate: { $gte: today, $lt: tomorrow },
    });

    return res.status(201).json({
      success: true,
      message: 'today sessions data fetched.',
      data: sessions,
    });
  } catch (error) {
    console.log('Error :', error);
    res.status(500).json({
      success: false,
      message: 'error fegtching today sessions',
    });
  }
};

export { registerStudent, getAllStudents, getStudent, getTodaySessions };
