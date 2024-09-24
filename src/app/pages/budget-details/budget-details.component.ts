import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Expense } from 'src/app/interfaces/models/expense.interface';
import { BudgetCardConfig } from 'src/app/interfaces/ui-config/budget-card-config.interface';
import { TableDataConfig } from 'src/app/interfaces/ui-config/table-data-config.interface';
import { BudgetService } from 'src/app/services/budget.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { UiService } from 'src/app/services/ui.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.scss']
})
export class BudgetDetailsComponent {
  budgetCard!: BudgetCardConfig;
  expenseTableData: TableDataConfig[] = [];
  budgetId: string = '';

  expenseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
  })


  constructor(
    private router: Router,
    private budgetService: BudgetService,
    public uiService: UiService,
    private expenseService: ExpenseService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.budgetId = params['id'];
      this.initializeData();

      const expenses = this.expenseService.getExpensesByBudgetId(this.budgetId);
      this.expenseTableData = this.expenseService.buildExpenseTable(expenses);

      this.expenseService.getExpenseData().subscribe({
        next: (res: Expense[]) => {
          const expenses = this.expenseService.getExpensesByBudgetId(this.budgetId);
          this.expenseTableData = this.expenseService.buildExpenseTable(expenses);
        },
        error: (error: any) => {
          console.error(error)
        }
      });
    })
  }

  addExpense() {
    const category = this.budgetService.getBudgetCategoryById(this.budgetId);
    const expense: Expense = {
      id: uuidv4(),
      name: this.expenseForm.value.name,
      budgetCategory: category,
      amount: parseInt(this.expenseForm.value.amount),
      date: new Date()
    }

    this.expenseService.addExpense(expense);
    this.expenseForm.reset();

    this.initializeData();
  }

  initializeData() {
    const budget = this.budgetService.getBudgetById(this.budgetId);

    this.budgetCard = {
      name: budget.name,
      budget: budget.budget,
      spent: budget.spent,
      color: budget.color,
      onClick: () => {
        this.deleteBudget()
      }
    }
  }

  deleteBudget() {
    this.expenseService.deleteExpenseBudgeId(this.budgetId);
    this.budgetService.deleteBudgetById(this.budgetId);
    this.router.navigateByUrl('');
  }

  handleAction($event: TableDataConfig) {
    this.expenseService.deleteExpenseById($event.id);
    this.initializeData();
  }
}
