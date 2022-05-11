import { Component, OnInit} from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router'
import { ListajugadoresI } from '../../modelos/listajugadores.inteface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  handleSearch(value:string){
    this.filtro_valor=value
  }


  jugadores: ListajugadoresI[] = [];

  aux:number = 0
  constructor(private api:ApiService, private router:Router) { }

  filtro_valor='';

  ngOnInit(): void {

    this.jugadores = [];

      this.api.getAllPlayers("jugadores").subscribe(data =>{
        for (let i = 0; i < data.length; i++) {
           let ordenTier=0,ordenDivision=0;
          if (data[i].tier == "CHALLENGER") {
              ordenTier = 9
              ordenDivision = 5000000000000
          }else if(data[i].tier == "GRANDMASTER"){
              ordenTier = 8
              ordenDivision = 5000000000000
          }else if(data[i].tier == "MASTER"){
            ordenTier = 7
            ordenDivision = 5000000000000

          }else if(data[i].tier == "DIAMOND"){
            ordenTier = 6
            if (data[i].rank=="I") {
              ordenDivision = 40000000000
            }else if(data[i].rank=="II"){
              ordenDivision = 30000000000
            }else if(data[i].rank=="III"){
              ordenDivision = 20000000000
            }else{
              ordenDivision = 10000000000
            }

          }else if(data[i].tier == "PLATINUM"){
            ordenTier = 5
            if (data[i].rank=="I") {
              ordenDivision = 400000000
            }else if(data[i].rank=="II"){
              ordenDivision = 300000000
            }else if(data[i].rank=="III"){
              ordenDivision = 200000000
            }else{
              ordenDivision = 100000000
            }

          }else if(data[i].tier == "GOLD"){
            ordenTier = 4
            if (data[i].rank=="I") {
              ordenDivision = 4000000
            }else if(data[i].rank=="II"){
              ordenDivision = 3000000
            }else if(data[i].rank=="III"){
              ordenDivision = 2000000
            }else{
              ordenDivision = 1000000
            }

          }else if(data[i].tier == "SILVER"){
            ordenTier = 3
            if (data[i].rank=="I") {
              ordenDivision = 40000
            }else if(data[i].rank=="II"){
              ordenDivision = 30000
            }else if(data[i].rank=="III"){
              ordenDivision = 20000
            }else{
              ordenDivision = 10000
            }

          }else if(data[i].tier == "BRONZE"){
            ordenTier = 2
            if (data[i].rank=="I") {
              ordenDivision = 400
            }else if(data[i].rank=="II"){
              ordenDivision = 300
            }else if(data[i].rank=="III"){
              ordenDivision = 200
            }else{
              ordenDivision = 100
            }

          }else if(data[i].tier == "IRON"){
            ordenTier = 1
            if (data[i].rank=="I") {
              ordenDivision = 4
            }else if(data[i].rank=="II"){
              ordenDivision = 3
            }else if(data[i].rank=="III"){
              ordenDivision = 2
            }else{
              ordenDivision = 1
            }
          }else{
            ordenTier = 0
            ordenDivision = 0
          }

          data[i].positionRate = ordenTier+ordenDivision+data[i].leaguePoints;
          data[i].winrate = ((data[i].wins/(data[i].wins + data[i].losses))*100).toFixed();

        }
        data.sort((a,b)=>{
          return Number(b.positionRate)-Number(a.positionRate) ;
        });

        for (let i = 0; i < data.length; i++) {
          data[i].puesto = i+1;
        }
        this.jugadores = data.sort();
        })


  }

  ordenarPuestos(){
      if (this.aux==0) {
        this.aux = this.aux+1;
        this.jugadores.sort((a,b)=>{
          return Number(a.positionRate)-Number(b.positionRate) ;
        });
      }else if (this.aux>0) {
        this.aux = 0
        this.jugadores.sort((a,b)=>{
          return Number(b.positionRate)-Number(a.positionRate) ;
        });
      }
  }

  ordenarGanadas(){
    if (this.aux>0) {
      this.aux = 0
      this.jugadores.sort((a,b)=>{
        return Number(a.wins)-Number(b.wins) ;
      });
    }else if (this.aux==0) {

      this.aux = this.aux+1;
      this.jugadores.sort((a,b)=>{
        return Number(b.wins)-Number(a.wins) ;
      });
    }
}

ordenarPerdidas(){
  if (this.aux>0) {
    this.aux = 0
    this.jugadores.sort((a,b)=>{
      return Number(a.losses)-Number(b.losses) ;
    });
  }else if (this.aux==0) {

    this.aux = this.aux+1;
    this.jugadores.sort((a,b)=>{
      return Number(b.losses)-Number(a.losses) ;
    });
  }
}

ordenarWinrate(){
  if (this.aux>0) {
    this.aux = 0
    this.jugadores.sort((a,b)=>{
      return Number(a.winrate)-Number(b.winrate) ;
    });
  }else if (this.aux==0) {
    this.aux = this.aux+1;
    this.jugadores.sort((a,b)=>{
      return Number(b.winrate)-Number(a.winrate) ;
    });
  }
}

}
