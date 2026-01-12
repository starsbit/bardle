import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  private readonly assetService = inject(AssetService);
  private readonly dialog = inject(MatDialog);

  copyrightYear = new Date().getFullYear();

  public openChangeLogsDialog() {
    this.assetService.getChangeLogs().subscribe((changeLogs) => {
      this.dialog.open(ChangeLogsDialogComponent, {
        data: { changeLogs },
      });
    });
  }
}
