import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { COURSES } from '../../../../server/db-data';
import { Course } from '../model/course';
import { CoursesService } from './courses.service';
import { TestBed } from '@angular/core/testing';

describe('CoursesService', () => {

  let coursesService: CoursesService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CoursesService
      ]
    });

    coursesService = TestBed.inject(CoursesService),
      httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should retrieve all courses', () => {

    coursesService.findAllCourses()
      .subscribe(courses => {

        expect(courses).toBeTruthy('No courses returned');

        expect(courses.length).toBe(12,
          "incorrect number of courses");

        const course = courses.find(course => course.id === 12);
        expect(course.titles.description).toBe('Angular Testing Course');
      });

    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toEqual('GET');
    req.flush({ payload: Object.values(COURSES) });

  });

  it('should find a course by id', () => {

    coursesService.findCourseById(12)
      .subscribe(course => {

        expect(course).toBeTruthy('No course returned');
        expect(course.id).toBe(12);
      });

    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('GET');
    req.flush(COURSES[12]);

  });

  it('should save the course data', () => {

    const changes: Partial<Course> = { titles: { description: 'Testing Course' } };
    coursesService.saveCourse(12, changes)
      .subscribe(course => {
        expect(course.id).toBe(12);
        expect(course.titles.description).toEqual(changes.titles.description);
      });

    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.titles.description)
      .toEqual(changes.titles.description);

    req.flush({
      ...COURSES[12],
      ...changes
    });

  });

  afterEach(() => {
    httpTestingController.verify();
  })
});

