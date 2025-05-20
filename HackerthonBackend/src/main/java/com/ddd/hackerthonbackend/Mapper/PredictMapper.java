package com.ddd.hackerthonbackend.Mapper;


import com.ddd.hackerthonbackend.Dto.Request.PredictRequest;
import com.ddd.hackerthonbackend.Dto.Response.PredictResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PredictMapper {
    PredictResponse toPredictResponse(PredictRequest request);
}
