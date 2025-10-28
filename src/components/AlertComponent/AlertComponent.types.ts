export interface IAlertComponent {
  open: boolean;
  title: string;
  description: string;
  handleCancel: () => void;
  cancelText: string;
  href: string;
  actionText: string;
  canShowAction?: boolean;
}
