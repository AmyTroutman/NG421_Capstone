import { Component, Inject, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonToggle, MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  public books: Book[];
  public newBook: Book = {title: '', author: '', notes: ''};
  searching = false;
  dataSource: MatTableDataSource<Book>;
  displayedColumns: string[] = ['id', 'title', 'author', 'notes'];
  @ViewChild(MatSort, {static: true})sort: MatSort;
  @ViewChild(MatPaginator, {static: true})paginator: MatPaginator;
  originalFilter: (data: any, filter: string) => boolean;


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  async ngOnInit() {
    this.books = await this.http.get<Book[]>(this.baseUrl + 'book').toPromise();
    this.dataSource = new MatTableDataSource(
      await this.http.get<Book[]>(this.baseUrl + 'book').toPromise()
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.originalFilter = this.dataSource.filterPredicate;
  }
  async save() {
    await this.http.post<Book[]>(this.baseUrl + 'book', this.newBook).toPromise();
    this.newBook = { title: '', author: '', notes: ''};
    this.books = await this.http.get<Book[]>(this.baseUrl + 'book').toPromise();
  }

  applyFilter(filterValue: any) {
    // const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  buttonToggle(event: MatButtonToggleChange): void {
    switch (event.value) {
      case 'title':
        this.dataSource.filterPredicate = this.filterByTitle;
        break;
      case 'author':
        this.dataSource.filterPredicate = this.filterByAuthor;
        break;
      default:
        this.dataSource.filterPredicate = this.originalFilter;
        break;
    }
  }
  private filterByTitle(data: any, filter: string): boolean {
    return data.title === filter;
  }
  private filterByAuthor(data: any, filter: string): boolean {
    return data.author === filter;
  }

  cancel() {
    this.searching = false;
  }

}

interface Book {
  title: string;
  author: string;
  notes: string;
}
