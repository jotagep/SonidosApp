import { Component } from '@angular/core';
import { NavController, Refresher, reorderArray } from 'ionic-angular';

import { ANIMALES } from "../../data/data.animales";
import { Animal } from "../../interfaces/animal.interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales: Animal[] = []
  audio = new Audio();
  audioTiempo: any;
  ordenando = false;

  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice(0);
  }

  reproducir(animal: Animal): void {
    this.pausar_audio(animal);

    if(animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();
    animal.reproduciendo = true;

    this.audioTiempo= setTimeout ( () => animal.reproduciendo = false, animal.duracion*1000);
  }

  private pausar_audio (animalSel: Animal) {
      clearTimeout( this.audioTiempo );
      this.audio.pause();
      this.audio.currentTime = 0;

      for (let animal of this.animales){
        if(animal.nombre != animalSel.nombre){
          animal.reproduciendo = false;
        }
      }
  }

  borrar_animal (i: number): void {
      this.animales.splice(i,1);
  }

  recargar_animales (refresher: Refresher) {
    console.log("Inicio del refresh");

    setTimeout (() => {
      console.log("Termino el refresh");
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    },1500);

  }

  reordenar(indexes) {
    this.animales = reorderArray(this.animales, indexes);
  }
}
