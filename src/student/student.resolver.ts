import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Resolver(_of => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(_returns => [StudentType])
  async getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Query(_returns => StudentType)
  async getStudent(
    @Args('id') id: string
  ): Promise<Student> {
    return this.studentService.getStudent(id);
  }

  @Mutation(_retuns => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }
}
