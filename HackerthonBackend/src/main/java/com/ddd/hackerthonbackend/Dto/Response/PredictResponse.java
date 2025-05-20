package com.ddd.hackerthonbackend.Dto.Response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.experimental.FieldDefaults;

import java.util.Map;

@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record PredictResponse(
        String address,
        String network,
        double probability,
        Map<String, Object> features
) {
}
