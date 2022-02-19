import { YoutubeResponse } from './../models/youtube.models';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyAMK7tmua7fB2XHo2ZmtE_ShompEWqvcV4';
  private playList = 'PLfzJX3Cm6xxpUA2jNh3_m3LCkAyNx4fLr';
  private nextPageToken = '';

  constructor( private http: HttpClient) { }

  getVideos(){

    const url = `${this.youtubeUrl}/playlistItems`
    const params = new HttpParams()
                  .set('part','snippet')
                  .set('maxResults','10')
                  .set('playlistId',this.playList)
                  .set('key', this.apiKey)
                  .set('pageToken', this.nextPageToken)

                  return this.http.get<YoutubeResponse>(url, { params })
                          .pipe(

                            map( resp => {
                              this.nextPageToken = resp.nextPageToken;
                              return resp.items;
                            }),

                            map( items => items.map( video=> video.snippet))

                          )
  }
}

