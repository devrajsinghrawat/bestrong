const baseUrl = "http://0.0.0.0"
const port = 8080

// Register
export const urlMemberPost = `${baseUrl}:${port}/api/members/`;
export const urlMemberRecordPost = `${baseUrl}:${port}/api/memberRecords/`;

// Renewal
export const urlFetchMemberByMobile = `${baseUrl}:${port}/api/members/`;

export const urlFetchMemberRecordByMobile = `${baseUrl}:${port}/api/memberRecords/`;

// Home
export const urlFetchMemberRecord = `${baseUrl}:${port}/api/memberRecords/recentFiveMemberTx`;
export const urlFetchExpense = `${baseUrl}:${port}/api/expenses/recentFiveExpenses`;

// Expense
export const urlExpensePost = `${baseUrl}:${port}/api/expenses/`;

// Revenue
export const urlFetchRevenueRecord = `${baseUrl}:${port}/api/revenues/`;
