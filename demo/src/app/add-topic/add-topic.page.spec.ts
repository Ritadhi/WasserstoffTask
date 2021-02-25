import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTopicPage } from './add-topic.page';

describe('AddTopicPage', () => {
  let component: AddTopicPage;
  let fixture: ComponentFixture<AddTopicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTopicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTopicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
