import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactletListComponent } from './factlet-list.component';

describe('FactletListComponent', () => {
  let component: FactletListComponent;
  let fixture: ComponentFixture<FactletListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactletListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
