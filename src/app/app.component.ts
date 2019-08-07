import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit{
  title = 'GuestbookApp';
  arrOfGuests: Array<guestBook> = []
  edit: boolean = false;
  currentIndex: number
  guestBookForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.minLength(3)]]
  })
  constructor(private fb: FormBuilder){}

  ngOnInit(){
  
  }
  addGuestBook(action?: string): void{
    if(this.checkForDuplicateEntries(this.guestBookForm.value)){
      alert('You cant add duplicate guests!')
      return 
    }
    if(this.guestBookForm.value && !action){
      this.arrOfGuests.push(this.guestBookForm.value);
    }
    // else if(action){
    //   console.log(action, this.guestBookForm.value);
    //   this.edit = false;
    // }
    this.guestBookForm.reset();
  }

  updateGuest(action?: string, index?:number, guest?: guestBook,): void{
    if(!action){
      this.edit = true;
      this.guestBookForm.patchValue(guest);
      this.currentIndex = index;
      return
    }
    else if(action){
      this.arrOfGuests.splice(this.currentIndex, 1);
      this.arrOfGuests.splice(this.currentIndex, 0, this.guestBookForm.value);
      this.edit = false;
      this.guestBookForm.reset();
    }

  }

  deleteGuest(index: number, guest?:guestBook){
    this.arrOfGuests.splice(index, 1);
  }
  
  get guestBookPhone(){
    return this.guestBookForm.get('phoneNumber');
  }

  checkForDuplicateEntries(guest: guestBook): boolean{
    let match: Object = this.arrOfGuests.find( element => (element.name === guest.name && element.phoneNumber === guest.phoneNumber));
    return (!match)? false: true;
  }

  closeWarning(){
    console.log('i am working!')
    let closeBtn = document.getElementById('closeBtn');
    closeBtn.style.display = 'none';
  }
}
