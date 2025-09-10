import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {ChatList} from '../../components/chat-list/chat-list'
import {ChatService} from '../../services/services/chat.service';
import {ChatResponse} from '../../services/models/chat-response';
import {KeycloakService} from '../../utils/keycloak/keycloak.service';
import {MessageService} from '../../services/services/message.service';
import {MessageResponse} from '../../services/models/message-response';
import {MessageRequest} from '../../services/models/message-request';



@Component({
  selector: 'app-main',
  imports: [
    ChatList
    ],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main implements OnInit {
  chats: Array<ChatResponse> = [];
  selectedChat: ChatResponse = {};
  chatMessages: Array<MessageResponse> = [];
  //socketClient: any = null;
  messageContent: string = '';
  //showEmojis = false;

  constructor(
      private chatService: ChatService,
      private messageService: MessageService,
      private keycloakService: KeycloakService,
    ) {
    }

  ngOnInit(): void {
    //this.initWebSocket();
    this.getAllChats();
  }

  chatSelected(chatResponse: ChatResponse) {
    this.selectedChat = chatResponse;
    this.getAllChatMessages(chatResponse.id as string);
    this.setMessagesToSeen();
    this.selectedChat.unreadCount = 0;
  }

  logout() {
    this.keycloakService.logout();
  }

  userProfile() {
    this.keycloakService.accountManagement();
  }

  private getAllChatMessages(chatId: string) {
    this.messageService.getAllMessages({
      'chat-id': chatId
    }).subscribe({
      next: (messages) => {
        this.chatMessages = messages;
      }
    });
  }

  private setMessagesToSeen() {
    this.messageService.setMessagesToSeen({
      'chat-id': this.selectedChat.id as string
    }).subscribe({
      next: () => {
      }
    });
  }



  private getAllChats() {
      this.chatService.getChatsByReceiver()
        .subscribe({
          next: (res) => {
            this.chats = res;
          }
        });
    }

}
