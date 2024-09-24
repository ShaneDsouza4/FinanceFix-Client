import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetCardConfig } from 'src/app/interfaces/ui-config/budget-card-config.interface';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-budget-card',
  templateUrl: './budget-card.component.html',
  styleUrls: ['./budget-card.component.scss']
})
export class BudgetCardComponent {
  @Input() config!: BudgetCardConfig;
  @Input() isDelete: boolean = false;

  bgColor: string = '';
  beforColor: string = '';
  textColor: string = ''
  borderColor: string = ''
  constructor(private router: Router, private uiService: UiService) { }


  ngOnInit(): void {
    if (!this.config) {
      return;
    }

    this.borderColor = this.uiService.generateTailwindClass(this.config.color, 'border')
    this.textColor = this.uiService.generateTailwindClass(this.config.color, 'text')
    this.bgColor = this.uiService.generateTailwindClass(this.config.color, 'bg')

  }

  calculatePercentage() {
    return (this.config.spent / this.config.budget) * 100 + '%'
  }


  viewDetails() {
    if (this.config.onClick) {
      this.config.onClick();
    }
  }
}
