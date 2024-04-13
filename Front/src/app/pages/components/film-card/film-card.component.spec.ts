import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCardComponent } from './film-card.component';

describe('FilmCardComponent', () => {
  let component: FilmCardComponent;
  let fixture: ComponentFixture<FilmCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilmCardComponent]
    });
    fixture = TestBed.createComponent(FilmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
