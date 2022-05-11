import { Injectable } from '@angular/core';
import { ListajugadoresI } from '../../modelos/listajugadores.inteface';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "https://soloq-api.herokuapp.com/";
  constructor(private http:HttpClient) { }




  getAllPlayers(ruta:string):Observable<ListajugadoresI[]>{
    let direccion = this.url + ruta;
    return this.http.get<ListajugadoresI[]>(direccion)

  }


}

