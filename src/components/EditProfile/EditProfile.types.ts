export interface IUserData {
  kinde_user_id: string;
  username: string;
  name: string;
  picture: string | null;
  bio: string | null;
  tripsCount?: number;
}

export interface IEditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userData: IUserData;
  onSuccess?: () => void;
}

export interface IFormData {
  username: string;
  name: string;
  picture: File | string | null;
  bio: string;
}

export interface InvalidValidationParams {
  formData: {
    username: string;
    name: string;
    bio: string;
  };
  originalUsername: string;
  kindeUserId: string;
}

export interface IValidationResult {
  isValid: boolean;
  error?: string;
}

export interface IUpdateProfileParams {
  formData: {
    username: string;
    name: string;
    picture: File | string | null;
    bio: string;
  };
  originalPicture: string | null;
  kindeUserId: string;
}

export interface IUpdateResult {
  success: boolean;
  error?: string;
}
