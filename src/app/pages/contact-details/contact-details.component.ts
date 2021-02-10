import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, Subscription } from 'rxjs';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  subscription: Subscription
  contact: Contact
  contactId: string
  amount: number
  deleted: boolean = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(data => this.contactId = data.id)
    this.contactService.getContactById(this.contactId).subscribe(contact => this.contact = contact)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onGoBack() {
    this.router.navigate(['contact'])
  }

  onEdit() {
    this.router.navigate(['edit', this.contactId])
  }

  onTransfer() {
    if (!this.amount) return
    this.userService.addMove(this.contact, this.amount)
    this.router.navigate(['home'])
  }

  onDelete() {
    this.contactService.deleteContact(this.contactId)
    this.deleted = true
    setTimeout(() => {
      this.deleted = false
      this.router.navigate(['contact'])
    }, 3000);
  }
}
