import mongoose, { Schema } from 'mongoose';
import { Attendance } from './attendence.model.js';

const classSessionSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'Instructor',
      required: true,
    },
    sessionDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'finalized'],
      default: 'draft',
    },
    onlineStudents: [
      {
        name: String,
        phoneNumber: String,
      },
    ],
    offlineStudents: [
      {
        name: String,
        phoneNumber: String,
      },
    ],
    absentStudents: [
      {
        name: String,
        phoneNumber: String,
      },
    ],
  },
  { timestamps: true }
);

// Update student lists based on attendance records
classSessionSchema.methods.refreshAttendanceLists = async function () {
  // console.log("refresh attendence list executing !")
  const records = await Attendance.find({ classSession: this._id }).populate(
    'student',
    'name phoneNumber email'
  );

  // console.log("records :",records)

  this.onlineStudents = [];
  this.offlineStudents = [];
  this.absentStudents = [];

  for (const record of records) {
    if (!record.student) continue;

    const studentInfo = {
      name: record.student.name,
      phoneNumber: record.student.phoneNumber,
      email: record.student.email,
    };

    if (record.status === 'online') {
      this.onlineStudents.push(studentInfo);
    } else if (record.status === 'offline') {
      this.offlineStudents.push(studentInfo);
    } else {
      this.absentStudents.push(studentInfo);
    }
  }

  await this.save();
};

export const ClassSession = mongoose.model('ClassSession', classSessionSchema);
