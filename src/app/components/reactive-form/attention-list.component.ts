// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { trigger, transition, style, animate } from '@angular/animations';

// interface AttentionItem {
//   title: string;
//   description: string;
//   priority: 'high' | 'medium' | 'low';
// }

// @Component({
//   selector: 'app-attention-list',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="attention-container">
//       <h2 class="attention-header">⚠️ Attention Required</h2>
      
//       <div class="attention-filters">
//         <span 
//           *ngFor="let filter of ['all', 'high', 'medium', 'low']"
//           [class.active]="currentFilter === filter"
//           class="filter-button">
//           {{ filter | titlecase }}
//         </apan>
//       </div>

//       <div class="attention-list">
//         <div *ngFor="let item of filteredItems" 
//              class="attention-item"
//              [class]="'priority-' + item.priority"
//              [@fadeIn]>
//           <div class="attention-item-header">
//             <span class="priority-indicator"></span>
//             <h3>{{ item.title }}</h3>
//           </div>
//           <p>{{ item.description }}</p>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .attention-container {
//       max-width: 800px;
//       margin: 20px auto;
//       padding: 20px;
//       font-family: Arial, sans-serif;
//     }

//     .attention-header {
//       color: #2c3e50;
//       margin-bottom: 20px;
//       text-align: center;
//     }

//     .attention-filters {
//       display: flex;
//       gap: 10px;
//       margin-bottom: 20px;
//       justify-content: center;
//     }

//     .filter-button {
//       padding: 8px 16px;
//       border: none;
//       border-radius: 4px;
//       background: #f0f0f0;
//       cursor: pointer;
//       transition: all 0.3s ease;
//     }

//     .filter-button.active {
//       background: #3498db;
//       color: white;
//     }

//     .attention-list {
//       display: flex;
//       flex-direction: column;
//       gap: 15px;
//     }

//     .attention-item {
//       padding: 15px;
//       border-radius: 8px;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//       transition: transform 0.2s ease;
//     }

//     .attention-item:hover {
//       transform: translateX(5px);
//     }

//     .attention-item-header {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//       margin-bottom: 10px;
//     }

//     .priority-indicator {
//       width: 12px;
//       height: 12px;
//       border-radius: 50%;
//     }

//     .priority-high {
//       background-color: #ffebee;
//       border-left: 4px solid #f44336;
//     }

//     .priority-high .priority-indicator {
//       background-color: #f44336;
//     }

//     .priority-medium {
//       background-color: #fff8e1;
//       border-left: 4px solid #ffc107;
//     }

//     .priority-medium .priority-indicator {
//       background-color: #ffc107;
//     }

//     .priority-low {
//       background-color: #e8f5e9;
//       border-left: 4px solid #4caf50;
//     }

//     .priority-low .priority-indicator {
//       background-color: #4caf50;
//     }

//     h3 {
//       margin: 0;
//       color: #2c3e50;
//     }

//     p {
//       margin: 0;
//       color: #666;
//     }
//   `],
// })
// export class AttentionListComponent {
//   attentionItems: AttentionItem[] = [
//     {
//       title: 'System Maintenance',
//       description: 'Critical system maintenance scheduled for tonight at 22:00 UTC. Please save your work.',
//       priority: 'high'
//     },
//     {
//       title: 'Password Update Required',
//       description: 'Please update your password within the next 7 days to comply with new security policies.',
//       priority: 'medium'
//     },
//     {
//       title: 'New Feature Available',
//       description: 'Check out our new reporting dashboard with enhanced analytics capabilities.',
//       priority: 'low'
//     },
//     {
//       title: 'Data Backup Reminder',
//       description: 'Remember to backup your important files to the cloud storage.',
//       priority: 'medium'
//     }
//   ];


export{}