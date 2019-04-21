import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from "../app/auth/auth.service"
import { tap } from  'rxjs/operators';

const API = "http://localhost:3000/api"
var USER // Este campo representa el usuario actual.

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  currentArticle: any;

  constructor(public http: HttpClient, public auth : AuthService) { 
    console.log('News service ok');
    auth.getEmail().then((email) =>{
      http.get(`${API}/email/${email}`).subscribe(
        (data) => {
          USER = data
          USER = USER.user.userName
          console.log(USER)
        }
      )
    })
  }

  //Devolver noticias por categoría
  readCategory(category, page){
    return this.http.get(`http://localhost:3000/api/news/topheadlines?category=${category}&pageSize=5&page=${page}`);
  }
  //Devolver noticias por actualidad
  readNews(page){
    return this.http.get(`http://localhost:3000/api/news/topheadlines?pageSize=5&page=${page}`);
  }
  readeverything(){
    return this.http.get(`${API}/news/everything`);
  }

  saveNew(noticia){
    console.log(USER)
    console.log(noticia)
    return this.http.put(`${API}/favNews/${USER}`, noticia)
  }

  //Obtiene los datos de un usuario dado su email
  getUser(user){
    return this.http.get(`${API}/email/${user}`)
  }

  deleteArt(index){
    return this.http.put(`${API}/favNews/${USER}/${index}`,{})
  }

  addCategoryView(cat:string, mail:string){
    this.http.post(`${API}/user/addCategory`,{email:mail, category: cat}).pipe(
      tap(async res =>{
          console.log(res);
      })
    )
  }
}
