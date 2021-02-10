import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  subscription: Subscription
  marketPrices: any
  transactions: any

  constructor(private bitcoinService: BitcoinService) { }

  ngOnInit() {
    this.loadMarketPrice()
    this.loadTransactions()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  loadMarketPrice() {
    this.subscription = this.bitcoinService.getMarketPrice().subscribe(values => this.marketPrices = values)
  }

  loadTransactions() {
    this.subscription = this.bitcoinService.getConfirmedTransactions().subscribe(values => this.transactions = values)
  }

}
