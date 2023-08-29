import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListChildChildComponent } from './user-list-child-child.component';

describe('UserListChildChildComponent', () => {
  let component: UserListChildChildComponent;
  let fixture: ComponentFixture<UserListChildChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListChildChildComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListChildChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
