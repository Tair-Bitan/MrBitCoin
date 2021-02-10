import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';

import * as moment from 'moment'



@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  private bitcoinRate = 0.00002585
  private values: Array<any> = [
    { x: 1599782400, y: 10352.66 },
    { x: 1599868800, y: 10395.44 },
    { x: 1599955200, y: 10446.44 },
    { x: 1600041600, y: 10330.77 },
    { x: 1600128000, y: 10674.64 },
    { x: 1600214400, y: 10785.62 },
    { x: 1600300800, y: 10948.43 },
    { x: 1600387200, y: 10943.89 },
    { x: 1600473600, y: 10931.79 },
    { x: 1600560000, y: 11081.43 },
    { x: 1600646400, y: 10919.65 },
    { x: 1600732800, y: 10430.46 },
    { x: 1600819200, y: 10532.22 },
    { x: 1600905600, y: 10234.48 },
    { x: 1600992000, y: 10732.43 },
    { x: 1601078400, y: 10692.84 },
    { x: 1601164800, y: 10732.4 },
    { x: 1601251200, y: 10774.24 },
    { x: 1601337600, y: 10692.33 },
    { x: 1601424000, y: 10840.8 },
    { x: 1601510400, y: 10777.92 },
    { x: 1601596800, y: 10619.24 },
    { x: 1601683200, y: 10575.06 },
    { x: 1601769600, y: 10551.77 },
    { x: 1601856000, y: 10673.46 },
    { x: 1601942400, y: 10788.56 },
    { x: 1602028800, y: 10603.74 },
    { x: 1602115200, y: 10670.8 },
    { x: 1602201600, y: 10923.3 },
    { x: 1602288000, y: 11063.19 },
    { x: 1602374400, y: 11302.67 },
    { x: 1602460800, y: 11376.61 },
    { x: 1602547200, y: 11540.04 },
    { x: 1602633600, y: 11428.24 },
    { x: 1602720000, y: 11431.32 },
    { x: 1602806400, y: 11503.73 },
    { x: 1602892800, y: 11327.57 },
    { x: 1602979200, y: 11366.51 },
    { x: 1603065600, y: 11508.2 },
    { x: 1603152000, y: 11758.16 },
    { x: 1603238400, y: 11925.46 },
    { x: 1603324800, y: 12831.56 },
    { x: 1603411200, y: 12990.25 },
    { x: 1603497600, y: 12944.52 },
    { x: 1603584000, y: 13128.46 },
    { x: 1603670400, y: 13036.77 },
    { x: 1603756800, y: 13076.37 },
    { x: 1603843200, y: 13651.47 },
    { x: 1603929600, y: 13289 },
    { x: 1604016000, y: 13458.66 },
    { x: 1604102400, y: 13564.72 },
    { x: 1604188800, y: 13810.32 },
    { x: 1604275200, y: 13758.88 },
    { x: 1604361600, y: 13575.17 },
    { x: 1604448000, y: 14023.31 },
    { x: 1604534400, y: 14155.59 },
    { x: 1604620800, y: 15591.39 },
    { x: 1604707200, y: 15595.77 },
    { x: 1604793600, y: 14839.84 },
    { x: 1604880000, y: 15490.6 },
    { x: 1604966400, y: 15328.53 },
    { x: 1605052800, y: 15317.04 },
    { x: 1605139200, y: 15708.65 },
    { x: 1605225600, y: 16295.57 },
    { x: 1605312000, y: 16339.33 },
    { x: 1605398400, y: 16091.07 },
    { x: 1605484800, y: 15968.16 },
    { x: 1605571200, y: 16725.15 },
    { x: 1605657600, y: 17679.72 },
    { x: 1605744000, y: 17798.45 },
    { x: 1605830400, y: 17820.57 },
    { x: 1605916800, y: 18687.45 },
    { x: 1606003200, y: 18699.75 },
    { x: 1606089600, y: 18422.28 },
    { x: 1606176000, y: 18398.91 },
    { x: 1606262400, y: 19172.52 },
    { x: 1606348800, y: 18739.8 },
    { x: 1606435200, y: 17151.44 },
    { x: 1606521600, y: 17138.87 },
    { x: 1606608000, y: 17732.42 },
    { x: 1606694400, y: 18191.6 },
    { x: 1606780800, y: 19709.73 },
    { x: 1606867200, y: 18792.52 },
    { x: 1606953600, y: 19226.97 },
    { x: 1607040000, y: 19454.54 },
    { x: 1607126400, y: 18670.49 },
    { x: 1607212800, y: 19155.06 },
    { x: 1607299200, y: 19377.66 },
    { x: 1607385600, y: 19181.41 },
    { x: 1607472000, y: 18318.87 },
    { x: 1607558400, y: 18554.15 },
    { x: 1607644800, y: 18247.76 },
    { x: 1607731200, y: 18029.36 },
    { x: 1607817600, y: 18803.44 },
    { x: 1607904000, y: 19164.48 },
    { x: 1607990400, y: 19276.59 },
    { x: 1608076800, y: 19439.75 },
    { x: 1608163200, y: 21379.48 },
    { x: 1608249600, y: 22847.46 },
    { x: 1608336000, y: 23150.79 },
    { x: 1608422400, y: 23869.92 },
    { x: 1608508800, y: 23490.58 },
    { x: 1608595200, y: 22745.48 },
    { x: 1608681600, y: 23824.99 },
    { x: 1608768000, y: 23253.37 },
    { x: 1608854400, y: 23715.53 },
    { x: 1608940800, y: 24693.58 },
    { x: 1609027200, y: 26443.21 },
    { x: 1609113600, y: 26246.58 },
    { x: 1609200000, y: 27036.69 },
    { x: 1609286400, y: 27376.37 },
    { x: 1609372800, y: 28856.59 },
    { x: 1609459200, y: 28982.56 },
    { x: 1609545600, y: 29393.75 },
    { x: 1609632000, y: 32195.46 },
    { x: 1609718400, y: 33000.78 },
    { x: 1609804800, y: 32035.03 },
    { x: 1609891200, y: 34046.67 },
    { x: 1609977600, y: 36860.41 },
    { x: 1610064000, y: 39486.04 },
    { x: 1610150400, y: 40670.25 },
    { x: 1610236800, y: 40240.72 },
    { x: 1610323200, y: 38240.09 },
    { x: 1610409600, y: 35544.94 },
    { x: 1610496000, y: 34011.82 },
    { x: 1610582400, y: 37393.13 },
    { x: 1610668800, y: 39158.47 },
    { x: 1610755200, y: 36828.52 },
    { x: 1610841600, y: 36065.2 },
    { x: 1610928000, y: 35793.01 },
    { x: 1611014400, y: 36632.35 },
    { x: 1611100800, y: 36020.13 },
    { x: 1611187200, y: 35538.98 },
    { x: 1611273600, y: 30797.88 },
    { x: 1611360000, y: 33002.38 },
    { x: 1611446400, y: 32099.74 },
    { x: 1611532800, y: 32276.84 },
    { x: 1611619200, y: 32243.26 },
    { x: 1611705600, y: 32541.8 },
    { x: 1611792000, y: 30419.17 },
    { x: 1611878400, y: 33403.17 },
    { x: 1611964800, y: 34314.26 },
    { x: 1612051200, y: 34318.1 },
    { x: 1612137600, y: 33136.46 },
    { x: 1612224000, y: 33522.9 },
    { x: 1612310400, y: 35529.66 },
    { x: 1612396800, y: 37676.25 },
    { x: 1612483200, y: 37002.09 },
    { x: 1612569600, y: 38278.61 },
    { x: 1612656000, y: 39323.26 },
    { x: 1612742400, y: 38928.1 }
  ]
  private transaction: { values: { x: any; y: number; }[], name: string } = {
    name: "Confirmed Transactions Per Day",
    values: [
      {
        x: 1599782400,
        y: 308323
      },
      {
        x: 1599868800,
        y: 300152
      },
      {
        x: 1599955200,
        y: 255110
      },
      {
        x: 1600041600,
        y: 354020
      },
      {
        x: 1600128000,
        y: 332957
      },
      {
        x: 1600214400,
        y: 342609
      },
      {
        x: 1600300800,
        y: 348581
      },
      {
        x: 1600387200,
        y: 325157
      },
      {
        x: 1600473600,
        y: 296357
      },
      {
        x: 1600560000,
        y: 259095
      },
      {
        x: 1600646400,
        y: 297605
      },
      {
        x: 1600732800,
        y: 312989
      },
      {
        x: 1600819200,
        y: 349938
      },
      {
        x: 1600905600,
        y: 316552
      },
      {
        x: 1600992000,
        y: 353070
      },
      {
        x: 1601078400,
        y: 276162
      },
      {
        x: 1601164800,
        y: 259382
      },
      {
        x: 1601251200,
        y: 295476
      },
      {
        x: 1601337600,
        y: 347696
      },
      {
        x: 1601424000,
        y: 351417
      },
      {
        x: 1601510400,
        y: 304757
      },
      {
        x: 1601596800,
        y: 315443
      },
      {
        x: 1601683200,
        y: 310855
      },
      {
        x: 1601769600,
        y: 268019
      },
      {
        x: 1601856000,
        y: 294986
      },
      {
        x: 1601942400,
        y: 317922
      },
      {
        x: 1602028800,
        y: 370554
      },
      {
        x: 1602115200,
        y: 330227
      },
      {
        x: 1602201600,
        y: 339343
      },
      {
        x: 1602288000,
        y: 298486
      },
      {
        x: 1602374400,
        y: 256096
      },
      {
        x: 1602460800,
        y: 314174
      },
      {
        x: 1602547200,
        y: 333215
      },
      {
        x: 1602633600,
        y: 314541
      },
      {
        x: 1602720000,
        y: 340993
      },
      {
        x: 1602806400,
        y: 324647
      },
      {
        x: 1602892800,
        y: 275069
      },
      {
        x: 1602979200,
        y: 231557
      },
      {
        x: 1603065600,
        y: 303929
      },
      {
        x: 1603152000,
        y: 330563
      },
      {
        x: 1603238400,
        y: 311292
      },
      {
        x: 1603324800,
        y: 339087
      },
      {
        x: 1603411200,
        y: 323869
      },
      {
        x: 1603497600,
        y: 306774
      },
      {
        x: 1603584000,
        y: 242273
      },
      {
        x: 1603670400,
        y: 252494
      },
      {
        x: 1603756800,
        y: 251938
      },
      {
        x: 1603843200,
        y: 261340
      },
      {
        x: 1603929600,
        y: 276070
      },
      {
        x: 1604016000,
        y: 268364
      },
      {
        x: 1604102400,
        y: 275796
      },
      {
        x: 1604188800,
        y: 276280
      },
      {
        x: 1604275200,
        y: 224609
      },
      {
        x: 1604361600,
        y: 331673
      },
      {
        x: 1604448000,
        y: 320697
      },
      {
        x: 1604534400,
        y: 318668
      },
      {
        x: 1604620800,
        y: 340351
      },
      {
        x: 1604707200,
        y: 270901
      },
      {
        x: 1604793600,
        y: 243047
      },
      {
        x: 1604880000,
        y: 326383
      },
      {
        x: 1604966400,
        y: 303270
      },
      {
        x: 1605052800,
        y: 322277
      },
      {
        x: 1605139200,
        y: 324855
      },
      {
        x: 1605225600,
        y: 300040
      },
      {
        x: 1605312000,
        y: 273511
      },
      {
        x: 1605398400,
        y: 252715
      },
      {
        x: 1605484800,
        y: 311477
      },
      {
        x: 1605571200,
        y: 347772
      },
      {
        x: 1605657600,
        y: 362007
      },
      {
        x: 1605744000,
        y: 311061
      },
      {
        x: 1605830400,
        y: 348026
      },
      {
        x: 1605916800,
        y: 311189
      },
      {
        x: 1606003200,
        y: 271125
      },
      {
        x: 1606089600,
        y: 297840
      },
      {
        x: 1606176000,
        y: 333293
      },
      {
        x: 1606262400,
        y: 361990
      },
      {
        x: 1606348800,
        y: 323975
      },
      {
        x: 1606435200,
        y: 322445
      },
      {
        x: 1606521600,
        y: 293949
      },
      {
        x: 1606608000,
        y: 263573
      },
      {
        x: 1606694400,
        y: 256551
      },
      {
        x: 1606780800,
        y: 378068
      },
      {
        x: 1606867200,
        y: 327019
      },
      {
        x: 1606953600,
        y: 346921
      },
      {
        x: 1607040000,
        y: 318894
      },
      {
        x: 1607126400,
        y: 282599
      },
      {
        x: 1607212800,
        y: 258624
      },
      {
        x: 1607299200,
        y: 300906
      },
      {
        x: 1607385600,
        y: 330970
      },
      {
        x: 1607472000,
        y: 321079
      },
      {
        x: 1607558400,
        y: 313649
      },
      {
        x: 1607644800,
        y: 304735
      },
      {
        x: 1607731200,
        y: 295410
      },
      {
        x: 1607817600,
        y: 276160
      },
      {
        x: 1607904000,
        y: 314350
      },
      {
        x: 1607990400,
        y: 320440
      },
      {
        x: 1608076800,
        y: 315217
      },
      {
        x: 1608163200,
        y: 309481
      },
      {
        x: 1608249600,
        y: 375549
      },
      {
        x: 1608336000,
        y: 343536
      },
      {
        x: 1608422400,
        y: 282043
      },
      {
        x: 1608508800,
        y: 269834
      },
      {
        x: 1608595200,
        y: 324163
      },
      {
        x: 1608681600,
        y: 338463
      },
      {
        x: 1608768000,
        y: 269559
      },
      {
        x: 1608854400,
        y: 303901
      },
      {
        x: 1608940800,
        y: 273954
      },
      {
        x: 1609027200,
        y: 309005
      },
      {
        x: 1609113600,
        y: 308983
      },
      {
        x: 1609200000,
        y: 336311
      },
      {
        x: 1609286400,
        y: 338258
      },
      {
        x: 1609372800,
        y: 344918
      },
      {
        x: 1609459200,
        y: 258080
      },
      {
        x: 1609545600,
        y: 297111
      },
      {
        x: 1609632000,
        y: 359116
      },
      {
        x: 1609718400,
        y: 373734
      },
      {
        x: 1609804800,
        y: 354091
      },
      {
        x: 1609891200,
        y: 397384
      },
      {
        x: 1609977600,
        y: 401744
      },
      {
        x: 1610064000,
        y: 358526
      },
      {
        x: 1610150400,
        y: 321389
      },
      {
        x: 1610236800,
        y: 331865
      },
      {
        x: 1610323200,
        y: 333958
      },
      {
        x: 1610409600,
        y: 336627
      },
      {
        x: 1610496000,
        y: 319167
      },
      {
        x: 1610582400,
        y: 338809
      },
      {
        x: 1610668800,
        y: 344002
      },
      {
        x: 1610755200,
        y: 308461
      },
      {
        x: 1610841600,
        y: 271874
      },
      {
        x: 1610928000,
        y: 313816
      },
      {
        x: 1611014400,
        y: 325083
      },
      {
        x: 1611100800,
        y: 314809
      },
      {
        x: 1611187200,
        y: 290754
      },
      {
        x: 1611273600,
        y: 326935
      },
      {
        x: 1611360000,
        y: 305209
      },
      {
        x: 1611446400,
        y: 253971
      },
      {
        x: 1611532800,
        y: 309102
      },
      {
        x: 1611619200,
        y: 336935
      },
      {
        x: 1611705600,
        y: 323553
      },
      {
        x: 1611792000,
        y: 325146
      },
      {
        x: 1611878400,
        y: 341036
      },
      {
        x: 1611964800,
        y: 312313
      },
      {
        x: 1612051200,
        y: 290753
      },
      {
        x: 1612137600,
        y: 280863
      },
      {
        x: 1612224000,
        y: 364551
      },
      {
        x: 1612310400,
        y: 344425
      },
      {
        x: 1612396800,
        y: 367788
      },
      {
        x: 1612483200,
        y: 360541
      },
      {
        x: 1612569600,
        y: 333886
      },
      {
        x: 1612656000,
        y: 286364
      }
    ]
  }

  constructor(private http: HttpClient) { }

  getRate(coins: number) {
    //REAL
    // return this.http.get<{ answer: Number }>(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
    //FAKE
    return of(this.bitcoinRate)
  }

  getMarketPrice() {
    //REAL
    // return this.http.get<{ values }>(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`).pipe(
    //   map(res => {
    //     res.values.map(currVal => currVal.x = moment(+`${currVal.x}000`).format('MMM/YY'))

    //     let newVals = res.values.map(currVal => Object.values(currVal));
    //     console.log('yalla..... iffff', newVals);
    //     return newVals
    //   })
    // )

    //FAKE
    return of(this.values).pipe(
      map(prevVals => {
        prevVals.map(currVal => currVal.x = moment(+`${currVal.x}000`).format('MMM/YY'))

        let newVals = prevVals.map(currVal => Object.values(currVal));
        // console.log('yalla..... iffff', newVals);
        return newVals
      })
    )
  }

  getConfirmedTransactions() {
    //REAL
    // return this.http.get<{ values: any }>(`https://api.blockchain.info/charts/n-transactions?timespan=5months&format=json&cors=true`).pipe(
    // map(res => {
    //   res.values.map(currVal => currVal.x = moment(+`${currVal.x}000`).format('MMM/YY'))
    //   let newVals = res.values.map(currVal => Object.values(currVal));
    //   console.log('yalla..... iffff', newVals);
    //   return newVals
    // })

    //FAKE
    return of(this.transaction).pipe(
      map(res => {
        res.values.map(currVal => currVal.x = moment(+`${currVal.x}000`).format('MMM/YY'))
        let newVals = res.values.map(currVal => Object.values(currVal));
        // console.log('yalla..... iffff', newVals);
        return newVals
      })
    )
  }


}
