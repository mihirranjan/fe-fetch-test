export interface Contribution {
    id: number;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    owner: string;
    status: string;
  }

export interface ContributionItem {
    item: Contribution
}

export interface ContributionsState {
    items: Contribution[];
    total: number;
    loading: boolean;
    error: string | null;
    searchTerm: string;
}