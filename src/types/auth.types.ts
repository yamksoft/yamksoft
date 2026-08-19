// ⚠️ مرجع DTO: Models/AuthenticationResult.cs, Models/Users/UserDto.cs

export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    token: string;
    refreshToken: string;
    expiresAt: string;
    user: UserDto;
}

export interface RegisterRequest {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    companyName?: string;
}

export interface UserDto {
    id: string;
    email: string;
    fullName: string;
    phone?: string;
    roleId?: string;
    roleName?: string;
    branchId?: string;
    branchName?: string;
    permissions?: string[];
    isActive: boolean;
    createdAt: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    email: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
}

export interface VerifyEmailRequest {
    email: string;
    code: string;
}
