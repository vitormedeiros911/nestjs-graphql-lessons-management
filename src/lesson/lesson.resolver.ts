import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { Lesson } from './lesson.entity';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';

import { StudentService } from '../student/student.service';
import { Student } from '../student/student.entity';

@Resolver(_of => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query(_returns => LessonType)
  async lesson(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLesson(id);
  }

  @Mutation(_returns => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Query(_returns => [LessonType])
  async getAllLessons(): Promise<Lesson[]> {
    return this.lessonService.getAllLessons();
  }

  @Mutation(_returns => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson): Promise<Student[]> {
    return this.studentService.getManyStudents(lesson.students);
  }
}
