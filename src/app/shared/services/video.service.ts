import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Bug } from '../models/bug.model';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private videoUrl = '/video/recent'; // URL to video endpoint
  private bugsUrl = '/bug/'; // URL to bug endpoint

  public videoName$: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );
  public bugs$: BehaviorSubject<Bug[]> = new BehaviorSubject<Bug[]>(null);

  constructor(private http: HttpClient) {}

  public getVideoName(): any {
    try {
      const resp = this.http
        .get<string>(environment.apiConfig.api_local_url + this.videoUrl)
        .subscribe((data: string) => {
          this.videoName$.next(data);
          console.log(this.videoName$);
        });
      return resp;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public getBugs(): any {
    try {
      const resp = this.http
        .get<Bug[]>(environment.apiConfig.api_local_url + this.bugsUrl)
        .subscribe((data: Bug[]) => {
          this.bugs$.next(data);
          console.log(this.bugs$);
        });
      return resp;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
