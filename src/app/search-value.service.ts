import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SavedSearch } from './savedSearch.model';

@Injectable({
  providedIn: 'root'
})
export class SearchValueService {

  private searchInputChangedSource = new Subject<string>();
  private savedSearchChangedSource = new Subject<SavedSearch>();

  searchInputChanged$ = this.searchInputChangedSource.asObservable();
  savedSearchChanged$ = this.savedSearchChangedSource.asObservable();

  searchInputChanged(value: string) {
    // publish this event so that others can listen to it
    this.searchInputChangedSource.next(value);
  }

  savedSearchChanged(value: SavedSearch) {
    this.savedSearchChangedSource.next(value);
  }

  constructor() { }
}

/*
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class MissionService {

  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }

  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }
}*/
