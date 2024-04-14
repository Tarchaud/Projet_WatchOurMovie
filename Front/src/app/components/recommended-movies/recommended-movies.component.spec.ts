import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedMoviesComponent } from './recommended-movies.component';

describe('RecommendedMoviesComponent', () => {
  let component: RecommendedMoviesComponent;
  let fixture: ComponentFixture<RecommendedMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendedMoviesComponent]
    });
    fixture = TestBed.createComponent(RecommendedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
