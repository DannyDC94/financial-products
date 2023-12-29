import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../../../app/components/header/header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test(`should have as logo 'assets/imgs/BP_logo.svg'`, () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    expect(component.logo).toEqual('assets/imgs/BP_logo.svg');
  });
});
