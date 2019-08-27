import { Component, OnInit, ViewChild } from '@angular/core';
import { CmcClientService } from '../cmc-client.service';
import { Portfolio } from '../portfolio';
import { FormControl, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { StorageService } from '../storage.service';
import { PortfolioComponent } from '../portfolio/portfolio.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any[] = [];
  total: number;
  portfolio: boolean;

  units: string[] = ['USD', 'GBP'];

  portfolios: Portfolio[] = [];

  portfolioName = new FormControl('', [
    Validators.required, this.noWhitespaceValidator]);

  selectedPortfolio: Portfolio;

  selectedUnit: string = this.units[0];

  search = new FormControl('');

  @ViewChild('portfolioRef', {static: false}) portfolioRef: PortfolioComponent;

  constructor(private cmcClient: CmcClientService, private storage: StorageService) {
    this.loadPortfolios();
  }

  ngOnInit() {
    this.load();
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  selectTab(portfolio: boolean) {
    if (!portfolio) {
      this.loadPortfolios();
      this.validateSelectedPortfolio();
    }
    this.portfolio = portfolio;    
  }

  createPortfolio() {
    let name: string = this.portfolioName.value;
    if (name && name.trim()) {
      this.portfolios.push(new Portfolio({
        name: this.portfolioName.value,
        id: uuid()
      }));
    }
  }

  get tags() {
    let _tags = [];
    if (this.selectedPortfolio && this.selectedPortfolio.currencies) {
      _tags = Object.keys(this.selectedPortfolio.currencies);
    }
    return _tags;
  }

  selectPortfolio(id: string) {
    this.selectedPortfolio = null;
    this.portfolios.forEach(item => {
      if (item.id === id) {
        this.selectedPortfolio = item;
      }
    });
  }

  selectUnit(unit: string) {
    this.units.forEach(item => {
      if (item === unit) {
        this.selectedUnit = item;
      }
    });
    this.refresh();    
  }

  validateSelectedPortfolio() {
    if (this.selectedPortfolio) {
      const found = this.portfolios.find((item: any) => {
        if (item.id === this.selectedPortfolio.id) {
          this.selectedPortfolio = item;
          return true;
        }
        return false;
      })
      if (!found) {
        this.selectedPortfolio = null;
      }
    }
  }

  deleteTag(tag: string) {
    if (this.selectedPortfolio) {
      delete this.selectedPortfolio.currencies[tag];
    }
  }

  addTag(tag: string) {
    if (this.selectedPortfolio && tag) {
      if (!this.selectedPortfolio.currencies) {
        this.selectedPortfolio.currencies = {};
      }
      this.selectedPortfolio.currencies[tag] = 0;
    }
  }

  get filteredData() {
    const keyword = (this.search.value || '').toLowerCase();
    if (!keyword || keyword.length < 3) {
      this.total = this.data.length;
      return this.data;
    }
    const filtered = this.data.filter((item) => {
      const { symbol, name} = item;
      return symbol.toLowerCase().indexOf(keyword) !== -1 || name.toLowerCase().indexOf(keyword) !== -1;
    });
    this.total = filtered.length;
    return filtered;
  }

  clear() {
    this.search.setValue('');
  }

  load() {
    this.cmcClient.getListing(this.selectedUnit).subscribe( (result: any) => {
      this.data = result.data;
    });
  }

  refresh() {
    this.data = [];
    this.load();
  }

  save() {
    this.storage.save(this.portfolios);
    this.portfolioRef.loadPortfolios();
  }

  loadPortfolios() {
    this.portfolios = this.storage.load() || [];
  }
}
