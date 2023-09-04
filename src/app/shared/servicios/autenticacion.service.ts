import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private ingresar:boolean = false;

  constructor() { }

  public ingresarAplicativo(obj:any):boolean{
    this.ingresar = obj.usuario == 'Mile' && obj.password=='123';
      return this.ingresar;
  }

  public actualizarIngresar(ingresar:any):boolean{
    this.ingresar = ingresar;
      return this.ingresar;
  }

  public habilitarlogeo(){
    return this.ingresar;
  }

}
