import { Component, OnInit, Input } from '@angular/core';
import { File } from '../../@core/models';
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @Input() data: File;
  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

}
