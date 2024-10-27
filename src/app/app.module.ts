import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [BrowserModule, FormsModule, SwiperModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
