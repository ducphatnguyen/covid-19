// 13 properties
export type Payload = {
    checklistAnswers?: Record<string, boolean | null> | null;
    countryCode?: string | null;
    dialingCode?: string | null;
    facilityId?: number | null;
    firstName?: string | null;
    isFailed?: boolean | null;
    isInfoConfirmed?: boolean | null;
    isPdfOpened?: boolean | null;
    isStep2Navigated?: boolean | null;
    lastName?: string;
    contactNumber?: string;
    statusCode?: string | null;
    visitorCode?: string | null;
}