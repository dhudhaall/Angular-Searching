import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/shared/Models/users.Model';
import { SearchResultService } from 'src/app/shared/Services/search-result.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm:FormGroup;
  usersList: Users[]=[];
  constructor(private fb:FormBuilder, private searchService: SearchResultService, private toaster:ToastrService,
    private spinner:NgxSpinnerService) {
    //initialixze Search from
    this.searchForm = this.fb.group({
      login:['']
    })
   }

  ngOnInit(): void {
    
  }


    //getter for search form
  public get f(){return this.searchForm.controls;}


  //submit method for searching user
  submit(){
    this.spinner.show();
      let login = this.searchForm.value;

      const data = {q:login.login, in:login.login}
      this.searchService.searchUser(data).subscribe((res:any)=>{
          this.usersList = res['items'];
          this.spinner.hide();
      },err=>{
        console.log("err", err);
        this.spinner.hide();
        if (err.error) {
          this.toaster.error(err.error);
         
        }

        
      })
    
  }

  
  flat(arrays: any[]) {
    return [].concat.apply([], arrays)
  }

}
