import {Component, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatTable} from '@angular/material';

export interface SomeObject {
  position: number;
  name: string;
}

const TABLE_1: SomeObject[] = [
  {position: 1, name: 'Table'},
  {position: 2, name: 'Cup'}
];

const TABLE_2: SomeObject[] = [
  {position: 1, name: 'Table'},
  {position: 2, name: 'Cup'},
  {position: 3, name: 'Aim'},
  {position: 4, name: 'Good'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  displayedColumns: string[] = ['position', 'name'];
  dataSource1 = TABLE_1;
  dataSource2 = TABLE_2;
  @ViewChild('t1') table: MatTable<SomeObject>;
  @ViewChild('t2') table2: MatTable<SomeObject>;
  public prevId;

  onListDrop(event: CdkDragDrop<string[]>, dataSource: any, t: any) {
     this.prevId = dataSource.findIndex((d) => d === event.item.data);
    if (event.previousContainer === event.container) {
      moveItemInArray(dataSource, this.prevId, event.currentIndex);
      t.renderRows();
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousContainer.data.findIndex((d) => d === event.item.data),
        event.currentIndex);
      this.table.renderRows();
      this.table2.renderRows();
    }
  }

}




