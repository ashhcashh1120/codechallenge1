import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core'
import { RouterLink } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ShareService } from '../Services/shared.services';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

@Injectable({ providedIn: 'root' })
export class BooksComponent implements OnInit {
  public bookInfo: any = {};
  public booksUrl: string;
  newBooks: any = [];
  showBook: any;
  showForm: boolean = true;


  constructor(private http: HttpClient, private shareService: ShareService,) {
    this.booksUrl = 'https://60cbbc2821337e0017e4550d.mockapi.io/books/'
  }


  ngOnInit(): void {
    this.shareService.setBookDataEvent.subscribe((res: any) => {
      this.newBooks = res;
      this.bookInfo = res[0];
      this.showForm = true;
    });
  }




  addBook(f: NgForm) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    var body = JSON.stringify(f.value);

    this.http.post(this.booksUrl, body, httpOptions)
      .subscribe(response => {
        this.newBooks.push(response);
        f.resetForm();
      });
  }


  clear(f: NgForm) {
    this.showForm = true;
    f.resetForm();
    this.bookInfo = {};
  }


  updateBook(f: NgForm) {


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    var body = JSON.stringify(f.value);

    this.http.put(this.booksUrl + this.bookInfo.id, body, httpOptions)
      .subscribe(response => {
        const clonedBoooks = [...this.newBooks];
        const bookIndex = clonedBoooks.findIndex(book => book.id == this.bookInfo.id);
        clonedBoooks.splice(bookIndex, 1, response);
        this.newBooks = clonedBoooks;
        f.resetForm();
      });
  }

  display(book: any) {
    this.showForm = true;
    this.bookInfo = book;
  }

  deleteBook() {
    this.http.delete(this.booksUrl + this.bookInfo.id,).subscribe(response => {
      this.newBooks = this.newBooks.filter((x: any) => x.id != this.bookInfo.id);
      this.showForm = false;
    });

  }


}
