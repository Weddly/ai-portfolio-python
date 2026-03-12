import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
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

// Define the History Query
const GET_HISTORY_QUERY = gql`
  query GetHistory {
    getHistory {
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

      <div
        class="history-box"
        style="border: 1px solid #ccc; padding: 10px; margin-bottom: 20px; height: 300px; overflow-y: scroll;"
      >
        @for (item of history(); track $index) {
          <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
            <p><strong>You:</strong> {{ item.prompt }}</p>
            <p><strong>AI:</strong> {{ item.reply }}</p>
          </div>
        }

        @if (loading()) {
          <div style="color: gray; font-style: italic;">AI is thinking...</div>
        }
      </div>

      <input
        [(ngModel)]="userPrompt"
        placeholder="Ask something..."
        (keyup.enter)="sendPrompt()"
        style="width: 80%; padding: 8px;"
      />

      <button (click)="sendPrompt()" [disabled]="loading()" style="padding: 8px 16px;">Send</button>
    </div>
  `,
})
export class App implements OnInit {
  userPrompt = '';
  response = signal<any>(null);
  history = signal<any[]>([]);
  loading = signal<boolean>(false);

  private apollo = inject(Apollo);

  ngOnInit() {
    this.fetchHistory();
  }

  fetchHistory() {
    this.apollo
      .watchQuery({
        query: GET_HISTORY_QUERY,
        fetchPolicy: 'network-only', // Always fetch fresh from server on load
      })
      .valueChanges.subscribe({
        next: (result: any) => {
          console.log('History fetched successfully:', result);
          this.history.set(result.data.getHistory);
        },
        error: (error) => console.error('History fetch error:', error),
      });
  }

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
            this.history.update((currentHistory) => [...currentHistory, result.data.askAi]);
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
