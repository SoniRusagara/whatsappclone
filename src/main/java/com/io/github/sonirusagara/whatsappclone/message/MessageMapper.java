package com.io.github.sonirusagara.whatsappclone.message;

import com.io.github.sonirusagara.whatsappclone.file.FileUtils;
import org.springframework.stereotype.Service;

@Service
public class MessageMapper {
  public MessageResponse toMessageResponse(Message message) {
    return MessageResponse.builder()
            .id(message.getId())
            .content(message.getContent())
            .senderId(message.getSenderId())
            .receiverId(message.getReceiverId())
            .type(message.getType())
            .state(message.getState())
            .createdAt(message.getCreatedDate())
            // reading the media file
            .media(FileUtils.readFileFromLocation(message.getMediaFilePath()))
            .build();
  }
}
