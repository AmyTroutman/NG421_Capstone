import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html'
})
export class StudentsComponent implements OnInit {
    public students: Student[];
    public newStudent: Student = {firstName: '', lastName: ''};

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

    }
    async ngOnInit() {
        this.students = await this.http.get<Student[]>(this.baseUrl + 'student').toPromise();
    }

    async save() {
      await this.http.post<Student[]>(this.baseUrl + 'student', this.newStudent).toPromise();
      this.newStudent = { firstName: '', lastName: '' };
      this.students = await this.http.get<Student[]>(this.baseUrl + 'student').toPromise();
  }

}

interface Student {
  firstName: string;
  lastName: string;
}
