import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent {
//   title = 'app';
//   constructor(private _httpService: HttpService){
//     console.log("This is my component");
//   }
// }

export class AppComponent implements OnInit {
  newTask: any;
  constructor(private _httpService: HttpService) { }
  // // ngOnInit will run when the component is initialized, after the constructor method.
  // ngOnInit() {
  //   this.getTasksFromService();
  // }
  // tasks = [];
  // getTasksFromService() {
  //   this._httpService.getTasks();
  //   let observable = this._httpService.getTasks();
  //   observable.subscribe(data => {
  //     console.log("Got our tasks!", data)
  //     this.tasks = data['tasks'];
  //   });

  // }

  num: number;
  randNum: number;
  str: string;
  first_name: string;
  snacks: string[];
  loggedIn: boolean;
  task = [];
  fulldetail = [];
  title: string;
  description: string;
  editTask = [];
  full: any;


  ngOnInit() {
    this.num = 7;
    this.randNum = Math.floor((Math.random() * 2) + 1);
    this.str = 'Hello Angular Developer!';
    this.first_name = 'Alpha';
    this.snacks = ["vanilla latte with skim milk", "brushed suede", "cookie"];
    this.loggedIn = true;
    this.newTask = { title: "", description: "" }
    
  }

  onButtonClick(): void {
    console.log(`Click event is working`);
  }
  // onButtonClickParam(num: Number): void {
  //   console.log(`Click event is working with num param: ${num}`);
  // }
  onButtonClickParams(num: Number, str: String): void {
    console.log(`Click event is working with num param: ${num} and str param: ${str}`);
  }
  onButtonClickEvent(event: any): void {
    console.log(`Click event is working with event: ${event}`);
  }
  onButtonClickParam(num: Number): void {
    console.log(`Click event is working with num param: ${num}`);
    // call the service's method to post the data, but make sure the data is bundled up in an object!
    let observable = this._httpService.postToServer({ data: num });
    observable.subscribe(data => console.log("Got our data!", data));
  }

  tasksOnClick(): void {
    let alltasks = this._httpService.getTasks();
    alltasks.subscribe(data => {
      this.task = data['tasks'];
      console.log(data);
    })
  }

  fullOnClick(x: any): void{
    this.title = x.title;
    this.description = x.description;
  }

  onSubmit() {
    let newTasks = this._httpService.addTask(this.newTask);
    newTasks.subscribe(data => {
      console.log("Got data from post back", data);
      this.newTask = {title: "", description: ""}
      this.tasksOnClick();
    })
  }

  editform(task){
    task.showEditForm = true;
  }

  onEdit(full) {
    full.showEditForm = false;
    let eeditTask = this._httpService.editTask(full);
    console.log(eeditTask);
    eeditTask.subscribe(data => {
      console.log("Got data from post back", data);
      this.tasksOnClick();
    })
  }

  onDelete(task_id) {
    
    let delete_task = this._httpService.deleteTask(task_id);
    console.log(delete_task);
    delete_task.subscribe(data => {
      this.tasksOnClick();
    })
  }

}