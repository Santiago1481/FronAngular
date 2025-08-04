import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorSalaComponent } from './jugador-sala.component';

describe('JugadorSalaComponent', () => {
  let component: JugadorSalaComponent;
  let fixture: ComponentFixture<JugadorSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorSalaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
