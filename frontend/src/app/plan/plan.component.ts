import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpDataService } from 'src/app/services/http-data.service';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import {Plan} from "../models/plan";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {


  @ViewChild('planForm', { static: false })
  planForm: NgForm;

  planData: Plan;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'plan_medio', 'cliente', 'campania', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isEditMode = false;

  constructor(private httpDataService: HttpDataService) {
    this.planData = {} as Plan;
  }

  ngOnInit(): void {

    // Initializing Datatable pagination
    this.dataSource.paginator = this.paginator;

    // Fetch All Plans on Page load
    this.getAllPlans()
  }

  getAllPlans() {
    this.httpDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
// @ts-ignore
  editItem(element) {
    this.planData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.planForm.resetForm();
  }

  // @ts-ignore
  deleteItem(id) {
    this.httpDataService.deleteItem(id).subscribe((response: any) => {

      // Approach #1 to update datatable data on local itself without fetching new data from server
      // @ts-ignore
      this.dataSource.data = this.dataSource.data.filter((o: Plan) => {
        return o.id !== id ? o : false;
      })

      console.log(this.dataSource.data);

      // Approach #2 to re-call getAllPlans() to fetch updated data
      // this.getAllPlans()
    });
  }

  addPlan() {
    this.httpDataService.createItem(this.planData).subscribe((response: any) => {
      this.dataSource.data.push({ ...response })
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      })
    });
  }

  updatePlan() {
    this.httpDataService.updateItem(this.planData.id, this.planData).subscribe((response: any) => {

      // Approach #1 to update datatable data on local itself without fetching new data from server
      // @ts-ignore
      this.dataSource.data = this.dataSource.data.map((o: Plan) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      })

      // Approach #2 to re-call getAllPlans() to fetch updated data
      // this.getAllPlans()

      this.cancelEdit()

    });
  }


  onSubmit() {
    if (this.planForm.form.valid) {
      if (this.isEditMode)
        this.updatePlan()
      else
        this.addPlan();
    } else {
      console.log('Enter valid data!');
    }
  }
}
