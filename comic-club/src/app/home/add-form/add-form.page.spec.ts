import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormPage } from './add-form.page';

describe('AddFormPage', () => {
  let component: AddFormPage;
  let fixture: ComponentFixture<AddFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
