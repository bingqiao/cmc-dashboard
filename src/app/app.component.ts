import { Component, OnInit } from '@angular/core';

import { CmcClientService } from './cmc-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cmc-dashboard';
  data: any;

  constructor(private cmcClient: CmcClientService) {}

  ngOnInit() {
    this.cmcClient.getListing().subscribe( (result: any) => {
      this.data = result.data;
    });
  }

}
