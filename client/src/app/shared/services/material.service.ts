declare const M: any;

export class MaterialService {
  static toast(message: string): void {
    M.toast({ html: message });
  }

  static initializeFloatingButton(element: HTMLElement): void {
    M.FloatingActionButton.init(element);
  }
}
