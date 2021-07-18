import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ShareService } from '../Services/shared.services';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public lstCategory: any = []
  public genresUrl: string;
  public booksUrl: string;


  constructor(private shareService: ShareService, private http: HttpClient) {
    this.genresUrl = 'https://60cbbc2821337e0017e4550d.mockapi.io/genres'
    this.booksUrl = 'https://60cbbc2821337e0017e4550d.mockapi.io/books'
   }

  ngOnInit(): void {
    this.fetchGenres()
  }

  getBooks(genreId: any) {
    this.http.get(this.booksUrl).subscribe((res: any) => {
      const filteredBooks = res.filter((book: any) => book.genre == genreId);
      this.shareService.SetBookData(filteredBooks);
      this.shareService.selectedGenreId = genreId;
    });
  }

  fetchGenres(){
    this.http.get(this.genresUrl).subscribe((res:any) =>{
      console.log('res')
      this.lstCategory= res;
      this.getBooks(res[0].id)
    })
  }

}

 