import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactletComponent } from './factlet.component';

describe('FactletComponent', () => {
  let component: FactletComponent;
  let fixture: ComponentFixture<FactletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
