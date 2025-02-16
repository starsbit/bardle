import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssetService } from '../../services/web/asset.service';
import { ChangeLogsDialogComponent } from '../../dialogs/change-logs/change-logs.component';

@Component({
  selector: 'ba-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  copyrightYear = new Date().getFullYear();

  constructor(
    private readonly assetService: AssetService,
    private readonly dialog: MatDialog
  ) {}

  public openChangeLogsDialog() {
    this.assetService.getChangeLogs().subscribe((changeLogs) => {
      this.dialog.open(ChangeLogsDialogComponent, {
        data: { changeLogs },
      });
    });
  }
}
