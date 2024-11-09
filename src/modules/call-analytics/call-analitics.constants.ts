import { DailyAnalicsData, HourlyAnalicsData } from './interfaces/call-analytics.interface';

export const HOURLY_CALL_ANALITICS_DEFAULT_STR: HourlyAnalicsData = {
    local: { totalCalls: 0, extensions: {} },
    incoming: {
        totalCalls: 0,
        cities: {},
        regions: {},
        totalDuration: 0,
        totalRingingDuration: 0,
        totalAnsweredCalls: 0,
        totalUnansweredCalls: 0,
        callsById: {},
    },
    outgoing: {
        totalCalls: 0,
        cities: {},
        regions: {},
        totalDuration: 0,
        totalRingingDuration: 0,
        totalAnsweredCalls: 0,
        totalUnansweredCalls: 0,
        callsById: {},
    },
};

export const DAILY_CALL_ANALITICS_DEFAULT_STR: DailyAnalicsData = {
    local: { totalCalls: 0 },
    incoming: {
        totalCalls: 0,
        cities: {},
        regions: {},
        totalDuration: 0,
        totalRingingDuration: 0,
        totalAnsweredCalls: 0,
        totalUnansweredCalls: 0,
    },
    outgoing: {
        totalCalls: 0,
        cities: {},
        regions: {},
        totalDuration: 0,
        totalRingingDuration: 0,
        totalAnsweredCalls: 0,
        totalUnansweredCalls: 0,
    },
};
