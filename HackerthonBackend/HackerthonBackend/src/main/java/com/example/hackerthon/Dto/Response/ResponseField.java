package com.example.hackerthon.Dto.Response;

import lombok.Builder;

@Builder
public record ResponseField(
        HeliusResponse helius,
        RugPullResponse AiModule
) {
}
