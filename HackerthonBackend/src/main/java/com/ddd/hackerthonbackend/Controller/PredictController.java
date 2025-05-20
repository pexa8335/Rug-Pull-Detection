package com.ddd.hackerthonbackend.Controller;

import com.ddd.hackerthonbackend.Dto.Request.PredictRequest;
import com.ddd.hackerthonbackend.Dto.Response.PredictResponse;
import com.ddd.hackerthonbackend.Service.PredictService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/predicts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class PredictController {
    PredictService predictService;

    @PostMapping
    public PredictResponse predict(@RequestBody PredictRequest request) {
        return predictService.getPredict(request);
    }
}
