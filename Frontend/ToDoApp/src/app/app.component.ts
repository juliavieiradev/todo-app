import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Tarefa } from './tarefa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'ToDoApp';

  arrayDeTarefas: Tarefa[] = [];
  apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) {
    this.READ_tarefas();
  }

  READ_tarefas() {
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe(
      resultado => this.arrayDeTarefas=resultado
    );     
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);

    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(
      resultado => { console.log(resultado); this.READ_tarefas(); 
    })
  }

  DELETE_tarefa(tarefaASerRemovida: Tarefa) {
    var indice = this.arrayDeTarefas.indexOf(tarefaASerRemovida);
    var id = this.arrayDeTarefas[indice]._id;

    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(
      resultado => { console.log(resultado); this.READ_tarefas(); 
    });
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    var indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas[indice]._id;

    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`,

    tarefaAserModificada).subscribe(
      resultado => { console.log(resultado); this.READ_tarefas(); 
    });
  }
}