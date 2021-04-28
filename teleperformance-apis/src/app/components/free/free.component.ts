import { Component, OnInit } from '@angular/core';
import { FreeService } from '../../services/free.service';

declare var M: any;

@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.css']
})
export class FreeComponent implements OnInit {

  imageToShow: any;

  constructor(public freeService: FreeService) { }

  ngOnInit(): void {
    this.imageToShow = "http://drums71.ru/wp-content/uploads/2018/02/no-img.jpg";
  }

  getDog() {
    var re = /(?:\.([^.]+))?$/;
    this.freeService.getDog()
      .subscribe(res => {
        if (res == 'Error') {
          M.toast({ html: 'Error to consult' });
          this.imageToShow = "http://drums71.ru/wp-content/uploads/2018/02/no-img.jpg";
        } else {
          console.log(res.toString());
          var ext = res.toString().toLowerCase().split('.').pop();
          if(ext != 'jpg'){
            M.toast({ html: 'Invalid extension file' });
          } else {
            this.imageToShow = (res);
          }
        }
      });
  }

}
