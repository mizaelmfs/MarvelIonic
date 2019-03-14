import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsItemPage } from './details-item.page';

describe('DetailsItemPage', () => {
  let component: DetailsItemPage;
  let fixture: ComponentFixture<DetailsItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
