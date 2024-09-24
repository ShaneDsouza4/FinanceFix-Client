import { BudgetCategory } from "./budgetCategory.interface";

export interface Expense {
    id: string;
    name: string;
    budgetCategory: BudgetCategory;
    amount: number;
    date: Date

}