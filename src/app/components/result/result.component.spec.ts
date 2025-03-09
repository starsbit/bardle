import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CountdownModule } from 'ngx-countdown';
import { StudentList } from '../../models/student-list';
import { getStudentListTestData } from '../../utils/test-data-utils';
import { ResultComponent } from './result.component';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  const searchedStudent = getStudentListTestData()[StudentList.GLOBAL]['Aru'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CountdownModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;

    component.searchedStudent = searchedStudent;
    component.searchedStudentName = searchedStudent.fullName;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the countdown when won or lost is true', () => {
    component.won = true;
    fixture.detectChanges();

    const countdownElement = fixture.debugElement.query(By.css('countdown'));
    expect(countdownElement).toBeTruthy();
  });

  it('should display the searched student name when won or lost is true', () => {
    component.won = true;
    fixture.detectChanges();

    const studentElement = fixture.debugElement.query(By.css('.incorrect-text'))
      .nativeElement.textContent;
    expect(studentElement).toContain(searchedStudent.fullName);
  });

  it('should show the copy button when won or lost is true', () => {
    component.won = true;
    fixture.detectChanges();

    const copyButton = fixture.debugElement.query(By.css('ba-copy-button'));
    expect(copyButton).toBeTruthy();
  });

  it('should not render countdown, student name, or copy button if won and lost are false', () => {
    component.won = false;
    component.lost = false;
    fixture.detectChanges();

    const sectionElement = fixture.debugElement.query(By.css('section'));
    expect(sectionElement).toBeNull();
  });
});
