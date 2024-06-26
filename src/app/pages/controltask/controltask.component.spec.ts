import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControltaskComponent } from './controltask.component';

describe('ControltaskComponent', () => {
  let component: ControltaskComponent;
  let fixture: ComponentFixture<ControltaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControltaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControltaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
