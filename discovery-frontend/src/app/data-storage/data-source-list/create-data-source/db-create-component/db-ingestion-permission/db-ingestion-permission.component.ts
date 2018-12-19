/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Component, ElementRef, EventEmitter, Injector, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild
} from '@angular/core';
import { AbstractPopupComponent } from '../../../../../common/component/abstract-popup.component';
import { DatasourceInfo } from '../../../../../domain/datasource/datasource';
import { IngestionSettingComponent } from '../../../component/ingestion-setting.component';

/**
 * Creating datasource with Database - ingestion step
 */
@Component({
  selector: 'db-ingestion-permission',
  templateUrl: './db-ingestion-permission.component.html'
})
export class DbIngestionPermissionComponent extends AbstractPopupComponent implements OnInit, OnDestroy, OnChanges {

  // datasource data
  @Input('sourceData')
  private _sourceData: DatasourceInfo;

  @ViewChild(IngestionSettingComponent)
  private _ingestionSettingComponent: IngestionSettingComponent;

  @Input()
  public step: string;

  @Output()
  public stepChange: EventEmitter<string> = new EventEmitter();

  // Constructor
  constructor(protected elementRef: ElementRef,
              protected injector: Injector) {
    super(elementRef, injector);
  }

  /**
   * ngOnInit
   */
  public ngOnInit() {
    super.ngOnInit();
  }

  /**
   * ngOnDestroy
   */
  public ngOnDestroy() {
    super.ngOnDestroy();
  }

  /**
   * ngOnChanges
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // if changed source Data
    if (changes._sourceData) {
      this._ingestionSettingComponent.init(
        this._sourceData,
        'DB',
        this._sourceData.schemaData.selectedTimestampType === 'CURRENT' ? null :  this._sourceData.schemaData.selectedTimestampColumn,
        this._sourceData.schemaData.isChangedTimestampField
      );
      // remove changed flag
      delete this._sourceData.schemaData.isChangedTimestampField;
    }
  }

  /**
   * Move to previous step
   */
  public prev(): void {
    this.step = 'db-configure-schema';
    this.stepChange.emit(this.step);
  }

  /**
   * Move to next step
   */
  public next(): void {
    this.step = 'db-complete';
    this.stepChange.emit(this.step);
  }

  /**
   * Step change click event
   * @param {string} route
   */
  public onClickPageChange(route: string): void {
    route === 'prev' ? this._ingestionSettingComponent.onClickPrev() : this._ingestionSettingComponent.onClickNext();
  }
}
