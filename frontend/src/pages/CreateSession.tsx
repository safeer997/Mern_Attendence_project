import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useState } from 'react';
import { toast } from 'sonner';
import { createSessionSchema } from '@/zodSchema/createSessionSchema';
import { classStudents } from '../utils/classStudents';
import { createSession } from '@/api/instructer';
import { useNavigate } from 'react-router';

const CreateSession = () => {
  const classStudentsList = classStudents;
  const [searchText, setSearchText] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      topic: '',
      sessionDate: '',
      onlineStudents: [],
    },
  });

  const filteredStudents = classStudentsList.filter((student) =>
    student?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectStudent = (student) => {
    if (!selectedStudents.find((s) => s.phoneNumber === student.phoneNumber)) {
      setSelectedStudents((prev) => [...prev, student]);
    }
    setSearchText('');
  };

  const handleRemoveStudent = (phoneNumber) => {
    setSelectedStudents((prev) =>
      prev.filter((student) => student.phoneNumber !== phoneNumber)
    );
  };

  async function onSubmit(data) {
    const formData = { ...data, onlineStudents: selectedStudents };
    const response = await createSession(formData);
    // console.log(response)
    toast( response?.data?.message);
    navigate("/instructer")
    
  }

  return (
    <div className='flex justify-center items-center min-h-screen '>
      <Card className='w-full max-w-lg shadow-lg'>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold text-center'>
            Create New Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              {/* Topic Field */}
              <FormField
                control={form.control}
                name='topic'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Topic</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter session topic' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='sessionDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Date</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='onlineStudents'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Online Students</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          placeholder='Search students...'
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />

                        {searchText && (
                          <div className='border mt-2 rounded-md max-h-48 overflow-y-auto  shadow'>
                            {filteredStudents.length > 0 ? (
                              filteredStudents.map((student) => (
                                <div
                                  key={student.phoneNumber}
                                  className='px-4 py-2 cursor-pointer hover:bg-green-500'
                                  onClick={() => handleSelectStudent(student)}
                                >
                                  {student.name}
                                </div>
                              ))
                            ) : (
                              <div className='px-4 py-2 text-gray-500'>
                                No students found
                              </div>
                            )}
                          </div>
                        )}

                        <div className='flex flex-wrap gap-2 mt-4'>
                          {selectedStudents.map((student) => (
                            <div
                              key={student.phoneNumber}
                              className='flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'
                            >
                              {student.name}
                              <button
                                type='button'
                                className='ml-2 text-blue-500 hover:text-red-600'
                                onClick={() =>
                                  handleRemoveStudent(student.phoneNumber)
                                }
                              >
                                X
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full'>
                Create Session
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateSession;
