import type {
    CountryClickBucket,
    DailyClickBucket,
    DashboardLink,
    DashboardOverviewTotals,
    DeviceClickBucket,
} from "./Types.ts";

const SHORT_URL_PATTERN = /^[0-9a-zA-Z]{7}$/;

function isValidShortUrl(shortUrl: string): boolean {
    return SHORT_URL_PATTERN.test(shortUrl);
}

function normalizeDashboardLink(data: unknown): DashboardLink | null {
    if (typeof data !== "object" || data === null) {
        return null;
    }

    const link = data as Record<string, unknown>;

    if (
        typeof link.shortUrl !== "string" ||
        typeof link.longUrl !== "string" ||
        typeof link.dateCreated !== "string" ||
        typeof link.totalClicks !== "number" ||
        typeof link.ownerId !== "number"
    ) {
        return null;
    }

    return {
        shortUrl: link.shortUrl,
        longUrl: link.longUrl,
        dateCreated: link.dateCreated,
        totalClicks: link.totalClicks,
        todayClicks: 0,
        ownerId: link.ownerId,
        dailyClicks: [],
    };
}

function normalizeDashboardLinks(data: unknown): DashboardLink[] {
    if (!Array.isArray(data)) {
        return [];
    }

    return data
        .map(normalizeDashboardLink)
        .filter((link): link is DashboardLink => link !== null);
}

function normalizeDailyClickBuckets(data: unknown): DailyClickBucket[] {
    if (!Array.isArray(data)) {
        return [];
    }

    return data.filter((bucket): bucket is DailyClickBucket => {
        if (typeof bucket !== "object" || bucket === null) {
            return false;
        }

        const dailyBucket = bucket as Record<string, unknown>;

        return typeof dailyBucket.date === "string" && typeof dailyBucket.clicks === "number";
    });
}

function normalizeDeviceClickBuckets(data: unknown): DeviceClickBucket[] {
    if (!Array.isArray(data)) {
        return [];
    }

    return data.filter((bucket): bucket is DeviceClickBucket => {
        if (typeof bucket !== "object" || bucket === null) {
            return false;
        }

        const deviceBucket = bucket as Record<string, unknown>;

        return (
            typeof deviceBucket.deviceType === "string" &&
            ["MOBILE", "TABLET", "DESKTOP", "UNKNOWN"].includes(deviceBucket.deviceType) &&
            typeof deviceBucket.clicks === "number"
        );
    });
}

function normalizeCountryClickBuckets(data: unknown): CountryClickBucket[] {
    if (!Array.isArray(data)) {
        return [];
    }

    return data.filter((bucket): bucket is CountryClickBucket => {
        if (typeof bucket !== "object" || bucket === null) {
            return false;
        }

        const countryBucket = bucket as Record<string, unknown>;

        return typeof countryBucket.countryCode === "string" && typeof countryBucket.clicks === "number";
    });
}

function normalizeTotalClicks(data: unknown): number {
    if (
        typeof data === "object" &&
        data !== null &&
        "totalClicks" in data &&
        typeof (data as {totalClicks: unknown}).totalClicks === "number"
    ) {
        return (data as {totalClicks: number}).totalClicks;
    }

    return 0;
}

export async function fetchDashboardLinks(): Promise<DashboardLink[]> {
    const response = await fetch("/v1/links", {
        credentials: "include",
    });

    if (!response.ok) {
        return [];
    }

    return normalizeDashboardLinks(await response.json());
}

export async function fetchDashboardDailyClicks(shortUrl: string, days = 30): Promise<DailyClickBucket[]> {
    if (!isValidShortUrl(shortUrl)) {
        return [];
    }

    const response = await fetch(
        `/v1/links/${encodeURIComponent(shortUrl)}/analytics?days=${encodeURIComponent(days)}`,
        {
            credentials: "include",
        },
    );

    if (!response.ok) {
        return [];
    }

    return normalizeDailyClickBuckets(await response.json());
}

export async function fetchDashboardLinkTotalClicks(shortUrl: string): Promise<number> {
    if (!isValidShortUrl(shortUrl)) {
        return 0;
    }

    const response = await fetch(`/v1/links/${encodeURIComponent(shortUrl)}/analytics/total`, {
        credentials: "include",
    });

    if (!response.ok) {
        return 0;
    }

    return normalizeTotalClicks(await response.json());
}

export async function fetchDashboardLinkDeviceAnalytics(shortUrl: string): Promise<DeviceClickBucket[]> {
    if (!isValidShortUrl(shortUrl)) {
        return [];
    }

    const response = await fetch(`/v1/links/${encodeURIComponent(shortUrl)}/analytics/devices`, {
        credentials: "include",
    });

    if (!response.ok) {
        return [];
    }

    return normalizeDeviceClickBuckets(await response.json());
}

export async function fetchDashboardLinkCountryAnalytics(shortUrl: string): Promise<CountryClickBucket[]> {
    if (!isValidShortUrl(shortUrl)) {
        return [];
    }

    const response = await fetch(`/v1/links/${encodeURIComponent(shortUrl)}/analytics/countries`, {
        credentials: "include",
    });

    if (!response.ok) {
        return [];
    }

    return normalizeCountryClickBuckets(await response.json());
}

export async function fetchDashboardLinkAnalytics(shortUrl: string, days = 30): Promise<DashboardLink | null> {
    if (!isValidShortUrl(shortUrl)) {
        return null;
    }

    const [links, dailyClicks, todayClickBuckets, totalClicks] = await Promise.all([
        fetchDashboardLinks(),
        fetchDashboardDailyClicks(shortUrl, days),
        fetchDashboardDailyClicks(shortUrl, 1),
        fetchDashboardLinkTotalClicks(shortUrl),
    ]);
    const selectedLink = links.find((link) => link.shortUrl === shortUrl);

    if (!selectedLink) {
        return null;
    }

    return {
        ...selectedLink,
        totalClicks,
        todayClicks: todayClickBuckets.reduce((sum, bucket) => sum + bucket.clicks, 0),
        dailyClicks,
    };
}

export async function fetchDashboardOverviewTotals(): Promise<DashboardOverviewTotals> {
    const links = await fetchDashboardLinks();

    return {
        totalClicks: links.reduce((sum, link) => sum + link.totalClicks, 0),
    };
}
