import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/shared/Models/users.Model';
import { SearchResultService } from 'src/app/shared/Services/search-result.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input('usersList') usersList: Users[]=[];

  displayedColumns: string[] = ['login', 'type', 'avatar_url'];
  dataSource = new MatTableDataSource<Users>();
  
  //material paginator intilization
  @ViewChild(MatPaginator) paginator: MatPaginator | null | undefined;

  constructor(private searchService:SearchResultService, private router:Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    
    
  }

  ngOnChanges(){
    this.dataSource.data = this.usersList;
  }

  //initlization pagination on view init
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator as MatPaginator;
 
  }



}

