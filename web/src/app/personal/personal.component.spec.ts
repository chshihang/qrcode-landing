import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalComponent } from './personal.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";

describe('PersonalComponent', () => {
  let component: PersonalComponent;
  let fixture: ComponentFixture<PersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalComponent ],
      imports: [HttpClientModule,
      RouterTestingModule],
      providers: [
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
