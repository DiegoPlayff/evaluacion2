import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RXJS
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) { 
    console.log('Spotify Service Listo');
  }
//======================================================================================================
  getQuery(query: string) {
    const url= `https://api.spotify.com/v1/${ query }`;
    const headers= new HttpHeaders({
      'Authorization': 'Bearer BQCreHZBKFx6XUDx48HqkpqbdwoBVJEM0iDX3fP5mgjXpxJ6XnibpAAcocRS-a3sT3rFfHpFmcjnv_zn2copb0UXhU7WQO7C5zJaxgTTjHWKSbCUA6o'
    });
    return this.http.get(url, { headers })
  }
//======================================================================================================
getNewRealeases() {
    return this.getQuery('browse/new-releases?limit=20').pipe(map( (res:any) => {
              // console.log(res);
              // console.log(res.albums.items);
            return res.albums.items;     
      }));
    }
//======================================================================================================
getArtistas( termino: string){
  return this.getQuery(`search?q=${ termino }&type=artist&limit=15`).pipe(map( (res:any) => {
    return res.artists.items;
  }));

     //PONIENDO EL TOKEN GENERADO
    //  const headers= new HttpHeaders({
    //    'Authorization': 'Bearer BQB5yKNGnKb8Ffhhc0r7fqkI-5_6V445hIX696Z-mTzaExzU7xCcnOEDlAvX2jHVBlr1ESIYuvOlVY4FpmEgjBPiJ4tq0PIdTsRxNq6OnAbs_EqAG1E'
    // });
    // return this.http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, {headers})
    //             .pipe(map( (res:any) => {
    //                 return res.artists.items;
    //             }));
}
//======================================================================================================


getArtista( id: string){
  return this.getQuery(`artists/${id}`);
  // .pipe(map( (res:any) => {
  //   return res.artists.items;
  // }));
}

//======================================================================================================
getTopTracks(id: string){
  return this.getQuery(`artists/${id}/top-tracks?country=us`)
  .pipe( map((res:any) => res['tracks']));
  }

}





 