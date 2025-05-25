package com.example.hackerthon.Dto.Response;

import lombok.Builder;

@Builder
public record LimeExplanation(
        String feature,
        double value
) {}
