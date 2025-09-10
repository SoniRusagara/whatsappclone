package com.io.github.sonirusagara.whatsappclone.common;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StringResponse {
  // Contains only one attribute for the String response
  private String response;
}
