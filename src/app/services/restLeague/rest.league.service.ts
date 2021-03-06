import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestLeagueService {
  
  public uri:string;
  public httpOptions = {
    headers:new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  public httpOptionAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
  };

  public league;
  public token;
  public leagueSelect;

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http:HttpClient) {
    this.uri = CONNECTION.URI;
  }

  getLeague(){
    let league = JSON.parse(localStorage.getItem('league'));
    if(league != undefined || league != null){
      this.league = league;
    }else{
      this.league = null;
    }
    return this.league;
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != undefined || token != null){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

  getLeagueSelect(){
    let leagueSelect = JSON.parse(localStorage.getItem('leagueSelect'));
    if(leagueSelect != undefined || leagueSelect != null){
      this.leagueSelect = leagueSelect;
    }else{
      this.leagueSelect = null;
    }
    return this.leagueSelect;
  }

  updateLeague(userV,leagueToUpdate){
    let params = JSON.stringify(leagueToUpdate);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.uri+'/'+userV._id+'/updateLeague/'+leagueToUpdate._id, params, {headers: headers})
    .pipe(map(this.extractData));
  }

  deleteLeague(user, leagueDelete,possiblePassword){

    return this.http.post(this.uri+user+'/deleteLeague/'+leagueDelete, {password : possiblePassword} ,this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  uploadImage(idUser,idLeague, params: Array<string>, files: Array<File>, token:string, name:string){
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      let uri = this.uri+idUser+'/'+idLeague+'/uploadImage';

      for(var i=0; i<files.length; i++){
        formData.append(name, files[i], files[i].name)
      }
      xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }
      xhr.open('PUT', uri, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }

  createLeague(user, league){
    let params = JSON.stringify(league);
    return this.http.post(this.uri+user+'/createLeague/', params, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  getLeagues(){
    return this.http.get(this.uri+'/listLeagues', this.httpOptions)
    .pipe(map(this.extractData));
  }

  getMyLeagues(user){
    return this.http.get(this.uri+user+'/listLeagues', this.httpOptionAuth)
    .pipe(map(this.extractData));
  }
}
