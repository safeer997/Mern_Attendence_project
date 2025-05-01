import { Instructor } from '../models/instructor.model.js';
import jwt from 'jsonwebtoken';

const registerInstructor = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    if (
      [name, email, password, phoneNumber].some((field) => field?.trim() === '')
    ) {
      return res.status(400).json({
        success: false,
        message: 'All details are required',
      });
    }

    const existedInstructor = await Instructor.findOne({
      $or: [{ phoneNumber }, { email }],
    });

    if (existedInstructor) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with provided phone number or email',
      });
    }

    const instructor = await Instructor.create({
      name,
      password,
      phoneNumber,
      email,
    });

    const createdInstructor = await Instructor.findById(instructor._id).select(
      '-password'
    );

    if (!createdInstructor) {
      return res.status(500).json({
        success: false,
        message: 'Error creating instructor in database',
      });
    }

    //creating to store auth token which was causing bug of unathorization while signing up for first time !!
    const token = jwt.sign(
      {
        id: createdInstructor._id,
        role: 'instructer',
        phoneNumber: createdInstructor.phoneNumber,
        email: createdInstructor.email,
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
    });

    return res.status(201).json({
      success: true,
      message: 'Instructor successfully registered',
      data: createdInstructor,
    });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

//GET ALL INSTRUCTERS

const getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find().select('-password');

    if (instructors.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No instructors record exist',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Instructors data fetched successfully',
      data: instructors,
    });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

//GET A SINGLE INSTRUCTER

const getInstructor = async (req, res) => {
  const { instructorId } = req.params;

  try {
    const instructor = await Instructor.findById(instructorId).select(
      '-password'
    );

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: 'Instructor not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Instructor data fetched successfully',
      data: instructor,
    });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export { registerInstructor, getAllInstructors, getInstructor };
