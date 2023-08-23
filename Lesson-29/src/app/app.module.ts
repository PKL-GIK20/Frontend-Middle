import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumberGameComponent } from './number-game/number-game.component'; // Make sure to import your game component

@NgModule({
  declarations: [
    AppComponent,
    NumberGameComponent, // Include your game component here
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule to the imports array
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
