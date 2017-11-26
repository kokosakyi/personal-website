import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlastParametersComponent } from './blast-parameters.component';

describe('BlastParametersComponent', () => {
  let component: BlastParametersComponent;
  let fixture: ComponentFixture<BlastParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlastParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlastParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
