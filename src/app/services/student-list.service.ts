import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { StudentList } from '../models/student-list';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root',
})
export class StudentListService implements OnDestroy {
  private latestList: StudentList | null = null;
  private readonly studentListChange = new ReplaySubject<StudentList>();
  private readonly subscriptions = new Subject<void>();

  constructor(
    private readonly studentService: StudentService,
    private readonly router: Router
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.subscriptions)
      )
      .subscribe(() => {
        const url = this.router.url;
        const listId = this.extractListIdFromUrl(url);
        if (
          !listId ||
          !Object.values(StudentList).includes(listId as StudentList) ||
          listId === this.latestList
        ) {
          return;
        }
        if (listId) {
          this.setStudentListByName(listId as StudentList);
        }
      });
  }

  private extractListIdFromUrl(url: string): string | null {
    const match = url.match(/\/game\/([^\/]+)/);
    return match ? match[1] : null;
  }

  $studentListChange() {
    return this.studentListChange.asObservable();
  }

  setStudentListByName(studentList: StudentList) {
    this.studentService.setStudentList(studentList);
    this.studentListChange.next(studentList);
    this.latestList = studentList;
    this.router.navigate(['/game', studentList.toLowerCase()]);
  }

  ngOnDestroy() {
    this.subscriptions.next();
    this.subscriptions.complete();
  }
}
