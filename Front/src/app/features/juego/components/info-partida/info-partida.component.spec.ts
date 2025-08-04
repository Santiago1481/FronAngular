import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPartidaComponent } from './info-partida.component';

describe('InfoPartidaComponent', () => {
  let component: InfoPartidaComponent;
  let fixture: ComponentFixture<InfoPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoPartidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
