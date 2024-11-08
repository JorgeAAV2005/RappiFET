import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearsalaPage } from './crearsala.page';

describe('CrearsalaPage', () => {
  let component: CrearsalaPage;
  let fixture: ComponentFixture<CrearsalaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearsalaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
