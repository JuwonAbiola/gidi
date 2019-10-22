import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GactivePage } from './gactive.page';

describe('GactivePage', () => {
  let component: GactivePage;
  let fixture: ComponentFixture<GactivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GactivePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GactivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
