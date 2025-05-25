package com.example.hackerthon.Mapper;

import com.example.hackerthon.Dto.Response.HeliusResponse;
import com.example.hackerthon.Dto.Response.PredictResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HeliusMapper {
    HeliusResponse toHeliusResponse(PredictResponse predictResponse);
}
