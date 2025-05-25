package com.example.hackerthon.Dto.Response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Builder;

import java.util.List;

@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record RugPullResponse(
        double anomaly_score,
        List<List<Object>> lime_explanation,
        int prediction_label_code,
        String prediction_label_string,
        String prediction_message) {

}
