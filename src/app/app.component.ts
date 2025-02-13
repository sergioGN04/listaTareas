import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareasService } from './services/tareas.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  listaTareas: string[] = [];
  nuevaTarea = '';
  error = '';
  fechaActual = '';

  private _tareasService = inject(TareasService);

  ngOnInit(): void {
    this.obtenerTareas();
    this.actualizarFecha();
  }

  private obtenerTareas(): void {
    this.listaTareas = this._tareasService.getTareas();
  }

  agregarTarea(): void {
    if (!this.nuevaTarea.trim()) {
      this.error = 'Por favor, ingresa una tarea válida.';
      return;
    }

    this._tareasService.agregarTarea(this.nuevaTarea);
    this.nuevaTarea = '';
    this.error = '';
    this.obtenerTareas();
  }

  eliminarTarea(index: number): void {
    this._tareasService.eliminarTarea(index);
    this.obtenerTareas();
  }

  private actualizarFecha(): void {
    this.fechaActual = new Date().toLocaleDateString('es-ES');
  }
}