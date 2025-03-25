import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeDumbComponent } from './badge.dumb.component';

describe('BadgeDumbComponent', () => {
  let component: BadgeDumbComponent;
  let fixture: ComponentFixture<BadgeDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeDumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgeDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
