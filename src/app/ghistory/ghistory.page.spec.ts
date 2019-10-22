import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhistoryPage } from './ghistory.page';

describe('GhistoryPage', () => {
  let component: GhistoryPage;
  let fixture: ComponentFixture<GhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
