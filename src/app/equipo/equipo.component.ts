import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListajugadoresI } from '../modelos/listajugadores.inteface';
import { ApiService } from '../servicios/api/api.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  jugadores: ListajugadoresI[] = [];
  equipo : ListajugadoresI[] = [];

  constructor(private api:ApiService, private router:ActivatedRoute) { }

  ngOnInit(): void {

    this.jugadores = [];

    this.equipo = [];

    this.router.params.subscribe(params => {


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
                  for (let i = 0; i < this.jugadores.length; i++) {
                    if (this.jugadores[i].summonerName==(params['summonerName'])) {
                      this.equipo.push(this.jugadores[i])}}
                  })


              })


  }



}
