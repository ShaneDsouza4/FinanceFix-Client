import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Budget } from 'src/app/interfaces/models/budget.interface';
import { BudgetCategory } from 'src/app/interfaces/models/budgetCategory.interface';
import { Expense } from 'src/app/interfaces/models/expense.interface';
import { BudgetCardConfig } from 'src/app/interfaces/ui-config/budget-card-config.interface';
import { TableDataConfig } from 'src/app/interfaces/ui-config/table-data-config.interface';
import { BudgetService } from 'src/app/services/budget.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  budgetForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    budget: new FormControl(null, [Validators.required])
  })


  expenseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
    budgetCategoryId: new FormControl('', [Validators.required])
  })

  budgetCategories: BudgetCategory[] = [];
  budgets: Budget[] = [];
  budgetCards: BudgetCardConfig[] = [];
  expenseTableData: TableDataConfig[] = [];
  constructor(public userService: UserService, private budgetService: BudgetService,
    private expenseService: ExpenseService, private router: Router,
    private uiService: UiService) { }

  ngOnInit(): void {
    this.budgetCategories = this.budgetService.getBudgetCategories();
    this.budgets = this.budgetService.getBudgets();
    this.buildBudgetCards(this.budgets);
    this.budgetService.getBudgetData().subscribe({
      next: (res: Budget[]) => {
        this.budgets = res;
        this.buildBudgetCards(this.budgets);

      },
      error: (error: any) => {
        console.error(error)
      }
    })

    this.budgetService.getBudgetCategoryData().subscribe({
      next: (res: BudgetCategory[]) => {
        this.budgetCategories = res;
      },
      error: (error: any) => {
        console.error(error)
      }
    })

    const expenses = this.expenseService.getExpenses();
    this.expenseTableData = this.expenseService.buildExpenseTable(expenses);
    this.expenseService.getExpenseData().subscribe({
      next: (res: Expense[]) => {
        this.expenseTableData = this.expenseService.buildExpenseTable(res);
      },
      error: (error: any) => {
        console.error(error)
      }
    });
  }

  addBudget() {
    const budget: Budget = {
      id: uuidv4(),
      name: this.budgetForm.value.name,
      budget: parseInt(this.budgetForm.value.budget),
      spent: 0,
      color: this.uiService.generateRandomColor(this.budgets.length + 1)
    }

    this.budgetService.addBudget(budget);
    this.budgetForm.reset();
  }


  addExpense() {
    const category = this.budgetService.getBudgetById(this.expenseForm.value.budgetCategoryId)
    const expense: Expense = {
      id: uuidv4(),
      name: this.expenseForm.value.name,
      budgetCategory: category,
      amount: parseFloat(this.expenseForm.value.amount),
      date: new Date()
    }
    // add exposne
    this.expenseService.addExpense(expense);
    this.expenseForm.reset();
  }

  handleDelete(data: TableDataConfig) {
    this.expenseService.deleteExpenseById(data.id);
  }


  buildBudgetCards(budgets: Budget[]) {
    this.budgetCards = budgets.map((item: Budget) => {
      return {
        name: item.name,
        budget: item.budget,
        spent: item.spent,
        color: item.color,
        onClick: () => {
          this.router.navigateByUrl(`details/${item.id}`);
        }
      }
    })
  }


}
