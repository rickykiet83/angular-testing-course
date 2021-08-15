import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from './../courses.module';

describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;

  let fixture: ComponentFixture<CoursesCardListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

      imports: [CoursesModule]
    }).compileComponents()
      .then(() => {

        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;

      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
    console.log(component);
  });

  it('should display the course list', () => {
    pending();
  });
  it('should create the first course', () => {
    pending();
  });

});
