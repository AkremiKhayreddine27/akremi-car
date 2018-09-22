import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../../@core/models';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input() documents: Document[];

  constructor() { }

  ngOnInit() {
  }

}
