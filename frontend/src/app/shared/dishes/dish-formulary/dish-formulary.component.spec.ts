import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishFormularyComponent } from './dish-formulary.component';

describe('DishFormularyComponent', () => {
  let component: DishFormularyComponent;
  let fixture: ComponentFixture<DishFormularyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishFormularyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishFormularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
