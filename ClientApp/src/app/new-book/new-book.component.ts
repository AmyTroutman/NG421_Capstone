import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  public newBook: Book = {title: '', author: '', notes: ''};
  public books: Book[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  async ngOnInit() {
    this.books = await this.http.get<Book[]>(this.baseUrl + 'book').toPromise();

  }

  async save() {
    await this.http.post<Book[]>(this.baseUrl + 'book', this.newBook).toPromise();
    this.newBook = { title: '', author: '', notes: ''};
    this.books = await this.http.get<Book[]>(this.baseUrl + 'book').toPromise();
  }

}

interface Book {
  title: string;
  author: string;
  notes: string;
}
