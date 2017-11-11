import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PfaProComponent } from './pfa-pro.component';

describe('PfaProComponent', () => {
  let component: PfaProComponent;
  let fixture: ComponentFixture<PfaProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PfaProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PfaProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
