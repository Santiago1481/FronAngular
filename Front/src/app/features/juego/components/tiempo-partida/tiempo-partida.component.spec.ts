import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoPartidaComponent } from './tiempo-partida.component';

describe('TiempoPartidaComponent', () => {
  let component: TiempoPartidaComponent;
  let fixture: ComponentFixture<TiempoPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiempoPartidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiempoPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
