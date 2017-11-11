import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignToolsComponent } from './design-tools.component';

describe('DesignToolsComponent', () => {
  let component: DesignToolsComponent;
  let fixture: ComponentFixture<DesignToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
