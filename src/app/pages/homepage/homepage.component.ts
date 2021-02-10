import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  user: User
  subscription: Subscription

  constructor(
    private bitcoinService: BitcoinService,
    public userService: UserService
  ) { }

  userBTC: any


  ngOnInit(): void {
    this.subscription = this.userService.getUser().subscribe(user => { this.user = user })
    this.calcUserBTC()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  calcUserBTC() {
    this.subscription = this.bitcoinService.getRate(this.user.coins).subscribe(rate => this.userBTC = rate)
  }

}
