import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberGameComponent } from './number-game.component';

describe('NumberGameComponent', () => {
  let component: NumberGameComponent;
  let fixture: ComponentFixture<NumberGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberGameComponent]
    });
    fixture = TestBed.createComponent(NumberGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
