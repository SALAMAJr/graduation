import { SearchHistory } from 'entities/SearchHistory';
import { Repository } from 'typeorm';
export declare class SearchHistoryService {
    private searchHistoryRepository;
    constructor(searchHistoryRepository: Repository<SearchHistory>);
    saveSearchHistory(keywords: string[], userId: string): Promise<{
        status: string;
        message: string;
    }>;
}
