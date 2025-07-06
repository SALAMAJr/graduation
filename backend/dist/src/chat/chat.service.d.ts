import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Repository } from 'typeorm';
import { Chat } from 'entities/Chat';
import { User } from 'entities/User';
export declare class ChatService {
    private chatRepository;
    private userRepository;
    constructor(chatRepository: Repository<Chat>, userRepository: Repository<User>);
    create(createChatDto: CreateChatDto, requesterId: string): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            chatName: string;
            participants: User[];
            messages: import("../../entities/Message").Message[];
            createdAt: Date;
        };
    }>;
    findAll(): string;
    findOne(senderId: string, createChatDto: CreateChatDto, returnMessages?: boolean): Promise<false | {
        status: string;
        message: string;
        data: {
            id: string;
            chatName: string;
            participants: User[];
            messages: import("../../entities/Message").Message[];
            createdAt: Date;
        };
    }>;
    update(id: number, updateChatDto: UpdateChatDto): string;
    findManyByUserId(userId: string): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        message: string;
        data: {
            [n: number]: {
                chatId: string;
                receiverId: string;
            };
            length: number;
            toString(): string;
            toLocaleString(): string;
            toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions): string;
            pop(): {
                chatId: string;
                receiverId: string;
            };
            push(...items: {
                chatId: string;
                receiverId: string;
            }[]): number;
            concat(...items: ConcatArray<{
                chatId: string;
                receiverId: string;
            }>[]): {
                chatId: string;
                receiverId: string;
            }[];
            concat(...items: ({
                chatId: string;
                receiverId: string;
            } | ConcatArray<{
                chatId: string;
                receiverId: string;
            }>)[]): {
                chatId: string;
                receiverId: string;
            }[];
            join(separator?: string): string;
            reverse(): {
                chatId: string;
                receiverId: string;
            }[];
            shift(): {
                chatId: string;
                receiverId: string;
            };
            slice(start?: number, end?: number): {
                chatId: string;
                receiverId: string;
            }[];
            sort(compareFn?: (a: {
                chatId: string;
                receiverId: string;
            }, b: {
                chatId: string;
                receiverId: string;
            }) => number): {
                chatId: string;
                receiverId: string;
            }[];
            splice(start: number, deleteCount?: number): {
                chatId: string;
                receiverId: string;
            }[];
            splice(start: number, deleteCount: number, ...items: {
                chatId: string;
                receiverId: string;
            }[]): {
                chatId: string;
                receiverId: string;
            }[];
            unshift(...items: {
                chatId: string;
                receiverId: string;
            }[]): number;
            indexOf(searchElement: {
                chatId: string;
                receiverId: string;
            }, fromIndex?: number): number;
            lastIndexOf(searchElement: {
                chatId: string;
                receiverId: string;
            }, fromIndex?: number): number;
            every<S extends {
                chatId: string;
                receiverId: string;
            }>(predicate: (value: {
                chatId: string;
                receiverId: string;
            }, index: number, array: {
                chatId: string;
                receiverId: string;
            }[]) => value is S, thisArg?: any): this is S[];
            every(predicate: (value: {
                chatId: string;
                receiverId: string;
            }, index: number, array: {
                chatId: string;
                receiverId: string;
            }[]) => unknown, thisArg?: any): boolean;
            some(predicate: (value: {
                chatId: string;
                receiverId: string;
            }, index: number, array: {
                chatId: string;
                receiverId: string;
            }[]) => unknown, thisArg?: any): boolean;
            forEach(callbackfn: (value: {
                chatId: string;
                receiverId: string;
            }, index: number, array: {
                chatId: string;
                receiverId: string;
            }[]) => void, thisArg?: any): void;
            map<U>(callbackfn: (value: {
                chatId: string;
                receiverId: string;
            }, index: number, array: {
                chatId: string;
                receiverId: string;
            }[]) => U, thisArg?: any): U[];
            filter<S extends {
                chatId: string;
                receiverId: string;
            }>(predicate: (value: {
                chatId: string;
                receiverId: string;
            }, index: number, array: {
                chatId: string;
                receiverId: string;
            }[]) => value is S, thisArg?: any): S[];
            filter(predicate: (value: {
                chatId: string;
                receiverId: string;
            }, index: number, array: {
                chatId: string;
                receiverId: string;
            }[]) => unknown, thisArg?: any): {
                chatId: string;
                receiverId: string;
            }[];
            reduce(callbackfn: (previousValue: {
                chatId: string;
                receiverId: string;
            }, currentValue: {
                chatId: string;
                receiverId: string;
            }, currentIndex: number, array: {
                chatId: string;
                receiverId: string;
            }[]) => {
                chatId: string;
                receiverId: string;
            }): {
                chatId: string;
                receiverId: string;
            };
            reduce(callbackfn: (previousValue: {
                chatId: string;
                receiverId: string;
            }, currentValue: {
                chatId: string;
                receiverId: string;
            }, currentIndex: number, array: {
                chatId: string;
                receiverId: string;
            }[]) => {
                chatId: string;
                receiverId: string;
            }, initialValue: {
                chatId: string;
                receiverId: string;
            }): {
                chatId: string;
                receiverId: string;
            };
            reduce<U>(callbackfn: (previousValue: U, currentValue: {
                chatId: string;
                receiverId: string;
            }, currentIndex: number, array: {
                chatId: string;
                receiverId: string;
            }[]) => U, initialValue: U): U;
            reduceRight(callbackfn: (previousValue: {
                chatId: string;
                receiverId: string;
            }, currentValue: {
                chatId: string;
                receiverId: string;
            }, currentIndex: number, array: {
                chatId: string;
                receiverId: string;
            }[]) => {
                chatId: string;
                receiverId: string;
            }): {
                chatId: string;
                receiverId: string;
            };
            reduceRight(callbackfn: (previousValue: {
                chatId: string;
                receiverId: string;
            }, currentValue: {
                chatId: string;
                receiverId: string;
            }, currentIndex: number, array: {
                chatId: string;
                receiverId: string;
            }[]) => {
                chatId: string;
                receiverId: string;
            }, initialValue: {
                chatId: string;
                receiverId: string;
            }): {
                chatId: string;
                receiverId: string;
            };
            reduceRight<U>(callbackfn: (previousValue: U, currentValue: {
                chatId: string;
                receiverId: string;
            }, currentIndex: number, array: {
                chatId: string;
                receiverId: string;
            }[]) => U, initialValue: U): U;
            find<S extends {
                chatId: string;
                receiverId: string;
            }>(predicate: (value: {
                chatId: string;
                receiverId: string;
            }, index: number, obj: {
                chatId: string;
                receiverId: string;
            }[]) => value is S, thisArg?: any): S;
            find(predicate: (value: {
                chatId: string;
                receiverId: string;
            }, index: number, obj: {
                chatId: string;
                receiverId: string;
            }[]) => unknown, thisArg?: any): {
                chatId: string;
                receiverId: string;
            };
            findIndex(predicate: (value: {
                chatId: string;
                receiverId: string;
            }, index: number, obj: {
                chatId: string;
                receiverId: string;
            }[]) => unknown, thisArg?: any): number;
            fill(value: {
                chatId: string;
                receiverId: string;
            }, start?: number, end?: number): {
                chatId: string;
                receiverId: string;
            }[];
            copyWithin(target: number, start: number, end?: number): {
                chatId: string;
                receiverId: string;
            }[];
            entries(): ArrayIterator<[number, {
                chatId: string;
                receiverId: string;
            }]>;
            keys(): ArrayIterator<number>;
            values(): ArrayIterator<{
                chatId: string;
                receiverId: string;
            }>;
            includes(searchElement: {
                chatId: string;
                receiverId: string;
            }, fromIndex?: number): boolean;
            flatMap<U, This = undefined>(callback: (this: This, value: {
                chatId: string;
                receiverId: string;
            }, index: number, array: {
                chatId: string;
                receiverId: string;
            }[]) => U | readonly U[], thisArg?: This): U[];
            flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
            [Symbol.iterator](): ArrayIterator<{
                chatId: string;
                receiverId: string;
            }>;
            [Symbol.unscopables]: {
                [x: number]: boolean;
                length?: boolean;
                toString?: boolean;
                toLocaleString?: boolean;
                pop?: boolean;
                push?: boolean;
                concat?: boolean;
                join?: boolean;
                reverse?: boolean;
                shift?: boolean;
                slice?: boolean;
                sort?: boolean;
                splice?: boolean;
                unshift?: boolean;
                indexOf?: boolean;
                lastIndexOf?: boolean;
                every?: boolean;
                some?: boolean;
                forEach?: boolean;
                map?: boolean;
                filter?: boolean;
                reduce?: boolean;
                reduceRight?: boolean;
                find?: boolean;
                findIndex?: boolean;
                fill?: boolean;
                copyWithin?: boolean;
                entries?: boolean;
                keys?: boolean;
                values?: boolean;
                includes?: boolean;
                flatMap?: boolean;
                flat?: boolean;
                [Symbol.iterator]?: boolean;
                readonly [Symbol.unscopables]?: boolean;
                at?: boolean;
            };
            at(index: number): {
                chatId: string;
                receiverId: string;
            };
        };
    }>;
}
