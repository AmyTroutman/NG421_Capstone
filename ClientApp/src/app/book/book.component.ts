import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  public books: Book[];
  public newBook: Book = {title: '', author: '', notes: ''};

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
