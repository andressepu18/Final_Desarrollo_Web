import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { ReseniaService } from '../../services/resenia';
import { Resenia } from '../../models/resenia';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  public resenas = signal<Resenia[]>([]);
  public mostrarFormulario = signal<boolean>(false);
  public editandoId = signal<string | null>(null);
  public reseniaFormulario = signal<Partial<Resenia>>({});
  public usuarioId = signal<string>('');

  constructor(
    private authService: Auth,
    private reseniaService: ReseniaService,
    private router: Router
  ) {
    this.consultarResenas();
    this.extraerUsuarioIdDelToken();
  }

  extraerUsuarioIdDelToken(): void {
    const token = this.authService.obtenerToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.usuarioId.set(payload.sub);
      } catch (e) {
        console.error('Error al decodificar el token');
      }
    }
  }

  consultarResenas() : void {
    this.reseniaService.obtenerResenas().subscribe({
      next : respuesta =>{
       this.resenas.set(respuesta);
      },
      error : error =>{
        console.error(error);
      }
    });
  }

  abrirFormulario(): void {
    this.mostrarFormulario.set(true);
    this.reseniaFormulario.set({});
    this.editandoId.set(null);
  }

  cerrarFormulario(): void {
    this.mostrarFormulario.set(false);
    this.reseniaFormulario.set({});
    this.editandoId.set(null);
  }

  actualizarCampoFormulario(campo: keyof Resenia, valor: any): void {
    const actual = { ...this.reseniaFormulario() };
    actual[campo] = valor;
    this.reseniaFormulario.set(actual);
  }

  guardarResenia(): void {
    const formulario = this.reseniaFormulario();
    
    if (!formulario.nombreRestaurante || !formulario.calificacion || !formulario.fechaVisita) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    if (this.editandoId()) {
      // Actualizar
      this.reseniaService.actualizarResenia(this.editandoId()!, formulario as Resenia).subscribe({
        next: respuesta => {
          this.consultarResenas();
          this.cerrarFormulario();
        },
        error: error => {
          console.error(error);
          alert('Error al actualizar la reseña');
        }
      });
    } else {
      // Crear
      this.reseniaService.crearResenia(formulario as Resenia).subscribe({
        next: respuesta => {
          this.consultarResenas();
          this.cerrarFormulario();
        },
        error: error => {
          console.error(error);
          alert('Error al crear la reseña');
        }
      });
    }
  }

  editarResenia(resenia: Resenia): void {
    this.reseniaFormulario.set({ ...resenia });
    this.editandoId.set(resenia._id);
    this.mostrarFormulario.set(true);
  }

  esPropio(resenia: Resenia): boolean {
    return resenia.usuarioId === this.usuarioId();
  }

  eliminarResenia( id: string) : void{
    if (!confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
      return;
    }

    this.reseniaService.eliminarResenia(id).subscribe({
      next : respuesta =>{
        let listaActual = this.resenas();
        let nuevaLista = listaActual.filter(resenia => resenia._id !== id);
        this.resenas.set(nuevaLista);
      },
      error : error =>{
        console.error(error);
        alert('Error al eliminar la reseña');
      }
    });
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}