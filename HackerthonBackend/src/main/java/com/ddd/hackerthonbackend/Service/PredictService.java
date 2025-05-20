package com.ddd.hackerthonbackend.Service;

import com.ddd.hackerthonbackend.Dto.Request.PredictRequest;
import com.ddd.hackerthonbackend.Dto.Response.PredictResponse;
import com.ddd.hackerthonbackend.Mapper.PredictMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class PredictService {
    PredictMapper predictMapper;
    Random random = new Random();
    public PredictResponse getPredict(PredictRequest request) {
        Map<String, Object> features = generateMockFeatures();
        double probability = Math.round(random.nextDouble() * 10000.0) / 10000.0;
        return new PredictResponse(
                request.address(),
                request.network(),
                probability,
                features
        );
    }
    private Map<String, Object> generateMockFeatures() {
        return Map.of(
                "TOTAL_ADDED_LIQUIDITY", random.nextDouble() * (100000 - 1000) + 1000,
                "TOTAL_REMOVED_LIQUIDITY", random.nextDouble() * 50000,
                "ADD_TO_REMOVE_RATIO", random.nextDouble() * 5,
                "NUMBER_OF_LIQUIDITY_ADDS", random.nextInt(100) + 1,
                "NUMBER_OF_LIQUIDITY_REMOVES", random.nextInt(51),
                "INACTIVITY_STATUS", random.nextBoolean() ? 1 : 0
        );
    }
}
