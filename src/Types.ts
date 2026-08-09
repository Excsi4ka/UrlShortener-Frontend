export type LinkingProps = {
    name: string;
    href: string;
    imageUrl: string;
}

export type AuthContext = {
    loggedIn: boolean;
    csrfToken: string;
    user: User | null;
    logout: () => Promise<void>;
}

export type User = {
    id: number;
    authProvider: string;
    email: string;
    name: string;
    pictureUrl: string;
}
