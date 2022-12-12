import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    if (name) {
      return name.split(' ').join('-');
    }
  }
  forwardTask(tasks, task: Task, stage) {
    const taskPresent = tasks.find(key => key.name == task.name);
    if (taskPresent && stage !== 'Done') {
      let splicedTask = tasks.splice(tasks.indexOf(taskPresent), 1);
      switch (stage) {
        case 'Backlog':
          splicedTask[0].stage += 1;
          this.stagesTasks[1].push(splicedTask[0]);
          this.stagesTasks[1].sort(this.compare);
          break;
        case 'To Do':
          splicedTask[0].stage += 1;
          this.stagesTasks[2].push(splicedTask[0]);
          this.stagesTasks[2].sort(this.compare);
          break;
        case 'Ongoing':
          splicedTask[0].stage -= 1;
          this.stagesTasks[3].push(splicedTask[0]);
          this.stagesTasks[3].sort(this.compare);
          break;
      }

    }
  }
  backwardTask(tasks, task: Task, stage) {
    const taskPresent = tasks.find(key => key.name == task.name);
    if (taskPresent && stage !== 'Backlog') {
      let splicedTask = tasks.splice(tasks.indexOf(taskPresent), 1);
      switch (stage) {
        case 'To Do':
          splicedTask[0].stage -= 1;
          this.stagesTasks[0].push(splicedTask[0]);
          this.stagesTasks[0].sort(this.compare);
          break;
        case 'Ongoing':
          splicedTask[0].stage -= 1;
          this.stagesTasks[1].push(splicedTask[0]);
          this.stagesTasks[1].sort(this.compare);
          break;
        case 'Done':
          splicedTask[0].stage -= 1;
          this.stagesTasks[2].push(splicedTask[0]);
          this.stagesTasks[2].sort(this.compare);
          break;
      }

    }
  }
  deleteTask(tasks, task: Task, stage) {
    const taskPresent = tasks.find(key => key.name == task.name);
    if (taskPresent) {
      tasks.splice(tasks.indexOf(taskPresent), 1);
    }
  }
  createTask(taskName) {
    console.log(taskName);
    if (taskName) {
      const lastTask = this.stagesTasks[0][this.stagesTasks[0].length - 1];
      this.stagesTasks[0].push({ 'name': taskName, 'stage': lastTask + 1 });
    }
    let input = document.getElementById('create-task-input');
    if (input) {
      input['value'] = '';
    }
    this.stagesTasks[0].sort(this.compare);
  }
  compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
}


interface Task {
  name: string;
  stage: number;
}