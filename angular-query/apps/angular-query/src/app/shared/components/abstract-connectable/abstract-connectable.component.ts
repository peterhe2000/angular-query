import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';
import {
  Observable,
  Subject
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

type ConnectableData<T> = {
  [P in keyof T]?: Observable<T[P]>;
};

@Component({
  standalone: true,
  template: '',
  imports: [CommonModule],
})
export class AbstractConnectableComponent implements OnDestroy {
  protected destroy$: Subject<void> = new Subject();

  constructor(protected cdr: ChangeDetectorRef) {
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected connect<T extends AbstractConnectableComponent>(data: ConnectableData<T>, detectChanges: boolean = false): void {
    Object.entries(data).forEach(([key, value$]) => {
      value$.pipe(takeUntil(this.destroy$)).subscribe((val: any) => {
        // @ts-ignore
        this[key] = val;
        detectChanges ? this.cdr.detectChanges() : this.cdr.markForCheck();
      });
    });
  }
}
