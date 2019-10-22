import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedPage } from './failed.page';

describe('FailedPage', () => {
  let component: FailedPage;
  let fixture: ComponentFixture<FailedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
