export interface UserCreationData {
    name: string
    email: string
    password: string
}

export interface LoginData {
    email: string
    password: string
}

export interface JWT_PAYLOAD {
    name: string
    email: string
}