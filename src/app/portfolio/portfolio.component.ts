import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StorageService } from '../storage.service';
import { Portfolio } from '../portfolio';
import { CmcClientService } from '../cmc-client.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio;

  data = [];

  controls: {[key: string]: FormControl} = {};

  constructor(private cmcClient: CmcClientService, private storage: StorageService) {
    this.loadPortfolios();
  }

  ngOnInit() {
  }

  get total() {
    if (!this.selectedPortfolio) {
      return
    }
    let result = 0;
    this.data.forEach( (item: any)=> {
      result += item.quote.USD.price * this.controls[item.symbol].value;
    })
    return result;
  }

  refresh() {
    this.data = [];
    this.load();
  }

  load() {
    if (!this.selectedPortfolio) {
      return;
    }
    const currencies = this.selectedPortfolio.currencies;
    if (!currencies) {
      return;
    }
    this.cmcClient.getQuotes(Object.keys(currencies)).subscribe((result: any) => {
      Object.keys(result.data).forEach((key: any) => {
        const item = result.data[key];
        this.controls[item.symbol] = new FormControl(item.quantity);
      });
      this.data = Object.values(result.data);
      this.data.forEach((item: any) => {
        this.controls[item.symbol].setValue(currencies[item.symbol]);
      });
    });
  }

  loadPortfolios() {
    this.portfolios = this.storage.load();
    this.reset();
  }

  selectPortfolio(id: string) {
    this.reset();
    this.portfolios.forEach(item => {
      if (item.id === id) {
        this.selectedPortfolio = item;
        this.load();
      }
    });
  }

  updateQuantity(symbol: string) {
    if (this.selectedPortfolio && this.selectedPortfolio.currencies) {
      this.selectedPortfolio.currencies[symbol] = this.controls[symbol].value;
    }
  }

  delete() {
    if (!this.selectedPortfolio) {
      return;
    }
    this.portfolios = this.portfolios.filter((item: any) => {
      return item.id !== this.selectedPortfolio.id;
    });
    this.reset();
  }

  save() {
    this.storage.save(this.portfolios);
  }

  reset() {
    this.selectedPortfolio = null;
    this.data = [];
  }
}
