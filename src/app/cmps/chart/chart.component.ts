import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { Observable } from 'rxjs';

import { Chart } from 'src/app/model/chart.model';
import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {


  @Input() marketPrices: Array<Array<string>>
  @Input() transactions: Array<Array<string>>

  constructor() { }

  marketChart: Chart = {
    title: 'Avg Market Price',
    type: ChartType.LineChart,
    data: [],
    columnNames: ['price', 'month'],
    width: 500,
    height: 200,
  }

  transactionChart: Chart = {
    title: 'Daily transactions',
    type: ChartType.LineChart,
    data: [],
    columnNames: ['number', 'month'],
    width: 500,
    height: 200,
  }

  bitRate: Observable<number>
  market: any

  ngOnInit(): void {
    this.marketChart.data = this.marketPrices
    this.transactionChart.data = this.transactions
  }
}
