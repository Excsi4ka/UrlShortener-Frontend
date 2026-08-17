export type LinkingProps = {
    name: string;
    href: string;
    imageUrl: string;
}

export type AuthContext = {
    loggedIn: boolean;
    loading: boolean;
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

export type DashboardView = "overview" | "allLinks" | "analytics";

export type SortMode = "clicks" | "created";

export type DailyClickBucket = {
    date: string;
    clicks: number;
}

export type DeviceType = "MOBILE" | "TABLET" | "DESKTOP" | "UNKNOWN";

export type DeviceClickBucket = {
    deviceType: DeviceType;
    clicks: number;
}

export type CountryClickBucket = {
    countryCode: string;
    clicks: number;
}

export type ListLink = {
    shortUrl: string;
    longUrl: string;
    creationDate: string;
    clicks: number;
}

export type DashboardLink = {
    shortUrl: string;
    longUrl: string;
    dateCreated: string;
    totalClicks: number;
    todayClicks: number;
    ownerId: number;
    dailyClicks: DailyClickBucket[];
}

export type DashboardOverviewTotals = {
    totalClicks: number;
}

export type DashboardViewHeaderProps = {
    title: string;
    description: string;
}

export type LinkRowProps = {
    shortUrl: string;
    longUrl: string;
    dateCreated: string;
    clicks: number;
    selected: boolean;
    onAnalyticsClick: () => void;
}
