import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/shared/servicios/autenticacion.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  public myForm!:FormGroup;

  constructor(
              private fb:FormBuilder,
              private loginPrd:AutenticacionService,
              private http: HttpClient
            ) { }


  ngOnInit(): void{
    this.myForm = this.createMyForm();

  }

  private createMyForm():FormGroup{
    return this.fb.group({
        usuario:['',[Validators.required]],
        ip:['', Validators.required]
    });
  }

  public submitFormulario(){

    // if(this.myForm.invalid){
    //   Object.values(this.myForm.controls).forEach(control=>{
    //     control.markAllAsTouched();
    //   });
    //   return;
    // }

    // if(!this.loginPrd.ingresarAplicativo(this.myForm.value)){
    //   alert("Usuario o contraseña invalido");
    // }
    console.log('click');
    // $http.get('/api/persona').success(function(data) {
    //   console.log('personas data: ', data);
    // })
    // .error(function(data) {
    //   console.log('Error (get): ' + data);
    // });
    // this.http.get('http://localhost:3120/api/getpersonas').subscribe(data => {
    //     console.log(data);
    // });
    this.http.post('http://localhost:3120/api/login', this.myForm.value).subscribe(data => {
        console.log(data);
        if(data === null){
          alert("Usuario o contraseña invalido");
        }
        else{
          this.loginPrd.actualizarIngresar(true);
        }
    });
  }

  public get f():any{
    return this.myForm.controls;
  }

}
