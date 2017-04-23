import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolesListComponent } from './holes-list.component';

describe('HolesListComponent', () => {
  let component: HolesListComponent;
  let fixture: ComponentFixture<HolesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
