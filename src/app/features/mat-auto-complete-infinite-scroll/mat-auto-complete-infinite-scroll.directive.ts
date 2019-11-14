import { Directive, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatAutocomplete } from '@angular/material';

export interface IAutoCompleteScrollEvent {
  autoComplete: MatAutocomplete;
  scrollEvent: Event;
}

@Directive({
  selector: 'mat-autocomplete[optionsScroll]'
})
export class MatAutoCompleteInfiniteScrollDirective implements OnDestroy {

  @Input() thresholdPercent = .8;

  @Output('optionsScroll') scroll = new EventEmitter<IAutoCompleteScrollEvent>();
  _onDestroy = new Subject();

  constructor(public autoComplete: MatAutocomplete) {
    this.autoComplete.opened.pipe(
      tap(() => {
        // Note: When autocomplete raises opened, panel is not yet created (by Overlay)
        // Note: The panel will be available on next tick
        // Note: The panel wil NOT open if there are no options to display
        setTimeout(() => {
          // Note: remove listner just for safety, in case the close event is skipped.
          this.removeScrollEventListener();
          this.autoComplete.panel.nativeElement
            .addEventListener('scroll', this.onScroll.bind(this));
        });
      }),
      takeUntil(this._onDestroy)
    ).subscribe();

    this.autoComplete.closed.pipe(
      tap(() => this.removeScrollEventListener()),
      takeUntil(this._onDestroy)
    ).subscribe();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();

    this.removeScrollEventListener();
  }

  onScroll(event: Event) {

    if (this.thresholdPercent === undefined) {
      this.scroll.next({autoComplete: this.autoComplete, scrollEvent: event});
    } else {
      const trg = event.target as any;
      const threshold = this.thresholdPercent * 100 * trg.scrollHeight / 100;
      const current = trg.scrollTop + trg.clientHeight;

      // console.log(`scroll ${current}, threshold: ${threshold}`)
      if (current > threshold) {
        // console.log('load next page');
        this.scroll.next({autoComplete: this.autoComplete, scrollEvent: event});
      }
    }
  }

  private removeScrollEventListener() {
    if (this.autoComplete.panel) {
      this.autoComplete.panel.nativeElement
        .removeEventListener('scroll', this.onScroll);
    }
  }
}
