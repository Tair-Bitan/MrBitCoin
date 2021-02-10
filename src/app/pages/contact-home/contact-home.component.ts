import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.scss']
})
export class ContactHomeComponent implements OnInit {

  contacts: Contact[]
  subscription: Subscription
  constructor(
    private contactService: ContactService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.subscription = this.contactService.contacts$.subscribe(contacts => { this.contacts = contacts })
    this.contactService.loadContacts()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onSetFilter(filterBy: any) {
    this.contactService.loadContacts(filterBy)
  }

  onAdd() {
    this.router.navigate(['edit'])
  }
}
