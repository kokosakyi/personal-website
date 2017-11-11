import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsdynaTutorialsComponent } from './lsdyna-tutorials.component';

describe('LsdynaTutorialsComponent', () => {
  let component: LsdynaTutorialsComponent;
  let fixture: ComponentFixture<LsdynaTutorialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsdynaTutorialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsdynaTutorialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
