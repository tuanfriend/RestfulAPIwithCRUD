import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    console.log("This is service");
    this.getTasks();
  }

  getTasks() {

    return this._http.get('/tasks');
  }

  postToServer(num) {
    // use the .post() method of HttpClient
    // num must be an object
    // provide the url of your post route - make sure this is set up in your server!
    return this._http.post('/tasks', num);
  }

  addTask(newtask) {
    return this._http.post('/create', newtask)
  }

  editTask(full) {
    return this._http.put('/task/'+full._id, full)
  }

  deleteTask(task_id) {
    return this._http.delete('/task/'+task_id)
  }
}