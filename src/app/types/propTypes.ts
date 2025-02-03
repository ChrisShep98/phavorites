export interface ModalType {
  isOpen: boolean;
  onClose: () => void;
}

export interface DeleteModal extends ModalType {
  postId: string;
}
