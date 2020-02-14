import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBackComponent } from './card-back.component';

describe('CardBackComponent', () => {
  let component: CardBackComponent;
  let fixture: ComponentFixture<CardBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBackComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
