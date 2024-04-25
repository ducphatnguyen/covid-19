export type Payload = {
    checklistAnswers?: Record<number, boolean> | null;
    countryCode?: string | null;
    dialingCode?: string | null;
    facilityId?: number | null;
    firstName?: string | null;
    isFailed?: boolean | null;
    isInfoConfirmed?: boolean | null;
    isPdfOpened?: boolean | null;
    lastName?: string;
    phone?: string;
    statusCode?: string | null;
    visitorCode?: string | null;
}