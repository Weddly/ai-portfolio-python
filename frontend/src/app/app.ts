import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

const ASK_AI_MUTATION = gql`
  mutation AskAI($prompt: String!) {
    askAi(prompt: $prompt) {
      id
      prompt
      reply
      status
    }
  }
`;

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  styleUrl: './app.css',
  template: `
    <div class="chat-container">
      <h2>AI Assistant Portfolio</h2>
      @if (loading()) {
        <div>AI is thinking...</div>
      }
      @if (response() && !loading()) {
        <div>
          <p><strong>You:</strong> {{ response().prompt }}</p>
          <p><strong>AI:</strong> {{ response().reply }}</p>
        </div>
      }

      <input [(ngModel)]="userPrompt" placeholder="Ask something..." />
      <button (click)="sendPrompt()" [disabled]="loading()">Send</button>
    </div>
  `,
})
export class App {
  userPrompt = '';
  response = signal<any>(null);
  loading = signal<boolean>(false);

  private apollo = inject(Apollo);

  sendPrompt() {
    if (!this.userPrompt) return;
    this.loading.set(true);

    this.apollo
      .mutate({
        mutation: ASK_AI_MUTATION,
        variables: { prompt: this.userPrompt },
      })
      .subscribe({
        next: (result: any) => {
          if (result.data && result.data.askAi) {
            this.response.set(result.data.askAi);
          }
          this.loading.set(false);
          this.userPrompt = '';
        },
        error: (error) => {
          console.error('Error:', error);
          this.loading.set(false);
        },
      });
  }
}
