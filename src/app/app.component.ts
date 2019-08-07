import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


interface guestBook{
  name: string,
  phoneNumber: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GuestbookApp';
  arrOfGuests: Array<guestBook> = []
  edit: boolean = false;
  currentIndex: number
  guestBookForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.minLength(3)]]
  })
  constructor(private fb: FormBuilder){}

  addGuestBook(action?: string): void{
    if(this.guestBookForm.value && !action){
      this.arrOfGuests.push(this.guestBookForm.value);
    }
    else if(action){
      console.log(action, this.guestBookForm.value);
      this.edit = false;
     
    }
    this.guestBookForm.reset();
  }

  updateGuest(guest?: guestBook, index?:number, action?: string): void{
    if(!action && index){
      this.edit = true;
      this.guestBookForm.patchValue(guest);
      this.currentIndex = index;
      return
    }
    this.arrOfGuests.splice(1, this.currentIndex);
    this.arrOfGuests.splice(1, 0, this.guestBookForm.value);
    this.edit = false;
    this.guestBookForm.reset();

  }

  deleteGuest(index: number, guest?:guestBook){
    this.arrOfGuests.splice(index, 1);
  }
  
  get guestBookPhone(){
    return this.guestBookForm.get('phoneNumber');
  }
}
