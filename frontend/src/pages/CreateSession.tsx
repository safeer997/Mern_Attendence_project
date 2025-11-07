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
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { createSessionSchema } from '@/zodSchema/createSessionSchema';
import { createSession, fetchAllStudents } from '@/api/instructer';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CreateSession = () => {
  const [classStudentsList, setClassStudentsList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getStudentsList() {
      const response = await fetchAllStudents();
      setClassStudentsList(response?.data?.data);
    }
    getStudentsList();
  }, []);

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
    try {
      setIsSubmitting(true);
      const formData = { ...data, onlineStudents: selectedStudents };
      const response = await createSession(formData);
      toast.success(response?.data?.message);
      navigate('/instructer');
    } catch (error) {
      toast.error('Failed to create session');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950/30 flex justify-center items-center p-6'>
      {/* ✅ Go Back Button (top-right corner) */}
      <div className='absolute top-6 left-6'>
        <Button
          variant='outline'
          onClick={() => navigate('/instructer')}
          className='border-gray-700 hover:bg-gray-800 text-gray-300'
        >
          ← Go Back
        </Button>
      </div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className='w-full max-w-2xl'
      >
        <Card className='shadow-2xl border border-gray-800/60 bg-gray-900/70 backdrop-blur-md rounded-2xl'>
          <CardHeader>
            <CardTitle className='text-3xl font-semibold text-center text-white'>
              Create New Session
            </CardTitle>
            <p className='text-center text-gray-400 text-sm'>
              Set up a new class session and mark online students
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='topic'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-300'>
                        Session Topic
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter session topic'
                          className='bg-gray-800 text-white border-gray-700 focus:border-indigo-500'
                          {...field}
                        />
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
                      <FormLabel className='text-gray-300'>
                        Session Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='date'
                          className='bg-gray-800 text-white border-gray-700 focus:border-indigo-500'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='onlineStudents'
                  render={() => (
                    <FormItem>
                      <FormLabel className='text-gray-300'>
                        Select Online Students
                      </FormLabel>
                      <FormControl>
                        <div>
                          <Input
                            placeholder='Search students...'
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className='bg-gray-800 text-white border-gray-700 focus:border-indigo-500'
                          />

                          {searchText && (
                            <div className='border border-gray-700 bg-gray-800 mt-2 rounded-md max-h-48 overflow-y-auto shadow-lg'>
                              {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                  <div
                                    key={student.phoneNumber}
                                    className='px-4 py-2 cursor-pointer hover:bg-indigo-600 text-gray-300 hover:text-white transition-colors'
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
                                className='flex items-center bg-indigo-600/20 border border-indigo-500/50 text-indigo-300 px-3 py-1 rounded-full text-sm'
                              >
                                {student.name}
                                <button
                                  type='button'
                                  className='ml-2 text-indigo-400 hover:text-red-400 transition-colors'
                                  onClick={() =>
                                    handleRemoveStudent(student.phoneNumber)
                                  }
                                >
                                  ✕
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

                <Button
                  disabled={isSubmitting}
                  type='submit'
                  className='w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200'
                >
                  {isSubmitting ? 'Creating Session...' : 'Create Session'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateSession;
