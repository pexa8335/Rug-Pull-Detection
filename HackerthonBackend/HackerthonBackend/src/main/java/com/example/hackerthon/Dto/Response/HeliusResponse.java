package com.example.hackerthon.Dto.Response;

import lombok.Builder;

@Builder
public record HeliusResponse(
        /*String LIQUIDITY_POOL_ADDRESS,*/
        /*List<String> MINT,*/
        Double LAST_POOL_ACTIVITY_TIMESTAMP_hour,
        Double LAST_POOL_ACTIVITY_TIMESTAMP_day,
        Double LAST_POOL_ACTIVITY_TIMESTAMP_weekday,
        Double LAST_POOL_ACTIVITY_TIMESTAMP_month,
        Double FIRST_POOL_ACTIVITY_TIMESTAMP_hour,
        Double FIRST_POOL_ACTIVITY_TIMESTAMP_day,
        Double FIRST_POOL_ACTIVITY_TIMESTAMP_weekday,
        Double FIRST_POOL_ACTIVITY_TIMESTAMP_month,
        Double LAST_SWAP_TIMESTAMP_hour,
        Double LAST_SWAP_TIMESTAMP_day,
        Double LAST_SWAP_TIMESTAMP_weekday,
        Double LAST_SWAP_TIMESTAMP_month,
        /*Long FIRST_POOL_ACTIVITY_TIMESTAMP_ts,
        Long LAST_POOL_ACTIVITY_TIMESTAMP_ts,
        Long LAST_SWAP_TIMESTAMP_ts,*/
        /*String LAST_SWAP_TRANSACTION_ID,*/
        /*Boolean INACTIVITY_STATUS,*/
        Boolean INACTIVITY_STATUS_Active,
        Boolean INACTIVITY_STATUS_Inactive







) {
}
