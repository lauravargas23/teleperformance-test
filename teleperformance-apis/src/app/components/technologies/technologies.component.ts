import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Technology } from 'src/app/models/technology';
import { TechnologyService } from '../../services/technology.service';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css'],
  providers: [TechnologyService],
})

export class TechnologiesComponent implements OnInit {

  slides: string[] = [];
  authorized: boolean = false;
  i = 0;

  constructor(public technologyService: TechnologyService, private router: Router) { }

  ngOnInit(): void {
    this.getTechnologies();
  }

  getSlide() {
    return this.slides[this.i];
  }

  getPrev() {
    this.i = this.i === 0 ? 0 : this.i - 1;
  }

  getNext() {
    if (this.i < this.slides.length - 1) {
      this.i = this.i === this.slides.length ? this.i : this.i + 1;
    }
  }

  addTechnology(form: NgForm) {
    this.i = 0;
    this.slides = [];
    if (form.value._id) {
      this.technologyService.putTechnology(form.value)
        .subscribe(res => {
          this.clean(form);
          M.toast({ html: 'Technology modified' });
          this.getTechnologies();
        });
    } else {
      this.technologyService.postTechnology(form.value)
        .subscribe(res => {
          this.clean(form);
          M.toast({ html: 'Technology add' });
          this.getTechnologies();
        });
    }
  }

  getTechnologies() {
    this.technologyService.getTechnologies()
      .subscribe(res => {
        this.technologyService.technologies = res as Technology[];
        for (let i = 0; i < this.technologyService.technologies.length; i++) {
          const element = this.technologyService.technologies[i];
          this.slides.push(element.url);
          this.authorized = true;
        }
      }, (err) => {
        console.log(err);
        this.authorized = false;
      });
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  editTechnology(technology: Technology) {
    this.technologyService.selectedTechnology = technology;
  }

  deleteTechnology(_id: string) {
    if (confirm('Are you sure?')) {
      this.technologyService.deleteTechnology(_id)
        .subscribe(res => {
          M.toast({ html: 'Technology deleted' });
          this.getTechnologies();
        });
    }
  }

  clean(form?: NgForm) {
    if (form) {
      form.reset();
      this.technologyService.selectedTechnology = new Technology();
    }
  }

}
