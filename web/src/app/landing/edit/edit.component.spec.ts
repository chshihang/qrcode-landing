import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import {TestModule} from "../../test/test.module";
import {ActivatedRoute} from "@angular/router";

describe('landing => EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [
        TestModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id: 1}}}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
